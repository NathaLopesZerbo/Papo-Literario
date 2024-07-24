import { createContext, useCallback, useEffect, useState } from 'react';
import { getRequest, baseUrl, postRequest } from '../utils/services';
import { io } from 'socket.io-client';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  // todas os useState
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null)
  const [isMessagesLoading, setIsMessagesLoading] = useState(false)
  const [messagesError, setMessagesError] = useState(null)
  const [sendTextMessageError, setSendTextMessageError] = useState(null)
  const [newMessage, setNewMessage] = useState(null)
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  console.log('onlineUsers', onlineUsers)

  // useEffect do socket.io

  useEffect(() => {
    const newSocket = io('http://localhost:3000') 
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [user]);
// add online users
  useEffect(() => {
    if(socket === null) return
    socket.emit('addNewUser', user?._id)
    socket.on('getOnlineUsers', (res)=>{
      setOnlineUsers(res)
    })
    return () => {
      socket.off('getOnlineUsers');
    };
  },[socket])

  // enviar mensagem em real time
  useEffect(() => {
    if(socket === null) return;

    const recipientId = currentChat?.members?.find((id) => id !== user?._id);

      socket.emit('SendMessage', {...newMessage, recipientId})
  },[newMessage])

  // receber as mensagens

  useEffect(() => {
    if(socket === null) return;

    socket.on('getMessage', res => {
      if(currentChat?._id !== res.chatId) return 

      setMessages((prev) => [...prev,  res])
    })

    return () =>{
      socket.off('getMessage')
    }

  },[socket, currentChat])


  // para ter os usuários criados

  useEffect(() => {

    const getUsers = async () => {

      const response = await getRequest(`${baseUrl}/users`);

      if (response.error) {
        return console.log("Erro ao buscar usuários", response)
      };
      const pchats = response.filter((u) => {
        let isChatCreated = false;
        if (user?._id === u?._id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id
          });
        }
        return !isChatCreated;
      });
      setPotentialChats(pchats);
    };

    getUsers()

  }, [userChats])

  //carregar o chat

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);
        const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

        setIsUserChatsLoading(false)

        if (response.error) {
          return setUserChatsError(response);
        }
        setUserChats(response);
      }
    };

    getUserChats();
  }, [user]);

  // carregar as mensagens

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);
      const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);

      setIsMessagesLoading(false)

      if (response.error) {
        return setMessagesError(response);
      }
      setMessages(response);
    };

    getMessages();
  }, [currentChat]);

  // função de enviar mensagem

  const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
    if (!textMessage) return console.log("Não há conteúdo na caixa de texto...")

    const response = await postRequest(
      `${baseUrl}/messages`,
      JSON.stringify({
        chatId: currentChatId,
        senderId: sender._id,
        text: textMessage
      })
      );
      if (response.error) {
        return setSendTextMessageError(response);
      }

      setNewMessage(response)
      setMessages((prev)=>[...prev, response]);
      setTextMessage("")
  }, [])

  // atualizar o chat
  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat)
  }, [])

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(`${baseUrl}/chats`, JSON.stringify({
      firstId,
      secondId,
    })
    );
    if (response.error) {
      return console.log("Erro ao criar o chat", response)
    }
    setUserChats((prev) => [...prev, response])
  }, [])
// todas as variáveis exportadas
  return (
    <ChatContext.Provider value={{
      userChats,
      isUserChatsLoading,
      userChatsError,
      potentialChats,
      createChat,
      updateCurrentChat,
      currentChat,
      messages,
      isMessagesLoading,
      messagesError,
      sendTextMessage,
      onlineUsers,
    }}>
      {children}
    </ChatContext.Provider>
  );
};