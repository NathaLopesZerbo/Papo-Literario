  import express from 'express';
  import bodyParser from 'body-parser';
  import cookieParser from 'cookie-parser';
  import mongoose from 'mongoose';
  import cors from 'cors';
  import dotenv from 'dotenv';
  import bcrypt from 'bcrypt';
  import jwt from 'jsonwebtoken';

  // Modelos
  import User from './models/User.js';
  import Comment from './models/Comment.js';

  const secret = 'secret123';

  dotenv.config();

  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

  function getUserFromToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        User.findById(decoded.id)
          .then(user => resolve(user))
          .catch(reject);
      });
    });
  }

  // Conectar ao MongoDB Atlas
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MongoDB URI is not defined in the .env file");
    process.exit(1);
  }

  mongoose.connect(uri)
    .then(() => {
      console.log("Connected to MongoDB Atlas");
    })
    .catch(error => {
      console.error("Error connecting to MongoDB Atlas:", error);
    });

  // Middleware de autenticação
  app.use((req, res, next) => {
    const token = req.cookies.token;
    if (token) {
      getUserFromToken(token)
        .then(user => {
          req.user = user;
          next();
        })
        .catch(err => {
          console.log(err);
          res.status(401).json({ error: 'Token inválido' });
        });
    } else {
      next();
    }
  });

  // Rota para verificar a conexão
  app.get('/', (req, res) => {
    if (req.user) {
      res.json({ username: req.user.username });
    } else {
      res.status(401).json({ error: 'Token não fornecido' });
    }
  });

  // Rota para criar um novo usuário
  app.post('/users', async (req, res) => {
    const { email, username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    const user = new User({ email, username, password: hashedPassword });
    user.save()
      .then(user => {
        jwt.sign({ id: user._id }, secret, (err, token) => {
          if (err) {
            console.error(err);
            res.status(500).send();
          } else {
            res.status(201).cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }).send();
          }
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send();
      });
  });


  app.get('/users', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    getUserFromToken(token)
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Usuário não encontrado' });
        }
        res.json({ username: user.username });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Erro no servidor' });
      });
  });


  // Rota de login
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username })
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign({ id: user._id, username: user.username }, secret);
          res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }).json({ success: true });
        } else {
          res.status(401).json({ error: 'Invalid username or password' });
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });

  // Rota de logout
  app.post('/logout', (req, res) => {
    res.cookie('token', '', { maxAge: 0 }).send();
  });

  // Rota para obter comentários
  app.get('/comments', (req, res) => {
    const { rootId } = req.query;
    const query = rootId ? { rootId } : { rootId: null };
    Comment.find(query).sort({ postedAt: -1 })
      .then(comments => res.json(comments))
      .catch(error => res.status(500).json({ error: 'Failed to fetch comments' }));
  });

  app.get('/comments/:id', (req, res) => {
    Comment.findById(req.params.id)
      .then(comment => res.json(comment))
      .catch(error => res.status(500).json({ error: error.message }));
  });

  app.post('/comments', (req, res) => {
    const token = req.cookies.token;
      if (!token) {
          return res.status(401).json({ message: 'Token não fornecido' });
      }

      getUserFromToken(token)
          .then(userInfo => {
              const { title, body, parentId, rootId } = req.body;
              const comment = new Comment({ title, body, author: userInfo.username, postedAt: new Date(), parentId, rootId });
              return comment.save();
          })
          .then(savedComment => res.json(savedComment))
          .catch(err => {
              console.log(err);
              res.status(401).json({ message: 'Não autorizado' });
          });
  });
  app.listen(4000, () => {
      console.log('Server is running on port 4000');
  });
