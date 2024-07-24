const express = require('express');
const router = express.Router();
const { getMessages, createMessage } = require('../controllers/messageController');

router.get('/:chatId', getMessages);
router.post('/', createMessage);

module.exports = router;