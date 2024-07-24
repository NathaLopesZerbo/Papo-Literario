const userModel = require('../models/userModels');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

// processo de criação de um token
const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY

    return jwt.sign({_id}, jwtkey, {expiresIn: "3d"})
}
// função de registrar um usuário
const registerUser =  async (req, res) => {
    try {
        const {name, email, password} = req.body

        // verificar se o email é único
        let user = await userModel.findOne({email});

        // verificações
        if (user) 
        return res.status(400).json('Já existe um usuário com este email!...');

        if(!name || !email || !password) 
        return res.status(400).json('Todos os campos são obrigatótios!...');

        if(!validator.isEmail(email)) 
        return res.status(400).json('O email deve ser um email válido!...')

        if(!validator.isStrongPassword(password)) 
        return res.status(400).json('A senha deve ser forte!...')

        // criação do usuário
        user = new userModel({name, email, password});
            // hash da senha
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
            //salvar
        await user.save();
        // criação do token
        const token = createToken(user._id)

            //enviar dados ao cliente
        res.status(200).json({_id: user._id, name, email, token})

    } catch (error) {
            console.log(error)
            res.status(500).json(error)     
    }
        
}

const loginUser = async(req, res) =>{
    const {email, password} = req.body;

    try{
        let user = await userModel.findOne({email});

        if(!user) return res.status(400).json('Email e/ou senha inválida!')

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) return res.status(400).json('Email e/ou senha inválida!')
            // criação do token
            const token = createToken(user._id)
            //enviar dados ao cliente
        res.status(200).json({_id: user._id, name: user.name, email, token})
    }catch(error){
        console.log(error)
        res.status(500).json(error)   
    }
}

const findUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await userModel.findById(userId);

        res.status(200).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)   
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();

        res.status(200).json(users);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)   
    }
}

module.exports = {registerUser, loginUser, findUser, getUsers};