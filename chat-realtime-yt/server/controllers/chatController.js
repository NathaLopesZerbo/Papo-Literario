const ChatModel = require('../models/chatModel');
// funções para lidar com o chat
// define dois usuários pelo id
const createChat = async (req, res) => {
   const { firstId, secondId } = req.body;
  
  try {
    // faz a procura de um chat com os dois membros
    const chat = await ChatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    // se existir retorna o chat
    if (chat) return res.status(200).json(chat);
    
// se não cria um novo
    const newChat = new ChatModel({
      members: [firstId, secondId],
    });
// salva
    const response = await newChat.save();
// exibi o no chat
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUserChats = async (req, res) => {
  const userId = req.params.userId;
  
  try {
    const chats = await ChatModel.find({
      members: { $in: [userId] },
    });

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findChat = async (req, res) => {
   const { firstId, secondId } = req.params;
   try {
    const chat = await ChatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
      res.status(200).json(chat)
    }catch(error) {
        console.log(error)
        res.status(500).json(error)     
    }
}

module.exports = {createChat, findUserChats, findChat};