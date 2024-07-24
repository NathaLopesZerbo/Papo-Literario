// resquisições dos nossos pacotes
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute')
const chatRoute = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoute');

const app = express()
require('dotenv').config()

// funções de middleware
app.use(express.json())
app.use(cors({
    credentials: true
}
))
// API's
app.use('/api/users', userRoute)
app.use("/api/chats", chatRoute)
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
    res.send('Bem vindo ao chat app!');
});

// definindo a porta do servidor
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
// criando um servido
app.listen(port, (req, res) =>{
    console.log(`Servidor rodando na porta:${port}`)
})

mongoose.set("strictQuery", false);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('A conexão com o MongoDB foi estabelecida!')).catch((error) => console.log("A conexão com o MongoDB falhou!: ", error.message))