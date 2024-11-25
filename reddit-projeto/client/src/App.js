// CSS
import './style.css';
// componentes
//import AuthModal from './AuthModal';
//import PostFormModal from './PostFormModal';
// Context
import AuthModalContext from './AuthModalContext';
import UserContext from './UserContext';
import PostFormModalContext from './PostFormModalContext';
// bibliotecas
import axios from 'axios';
import { useState, useEffect } from 'react';
import Routing from './Routing';




function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPostFormModal, setShowPostFormModal] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get('http://localhost:4000/users', { withCredentials: true })
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);
  

  function logout() {
    axios.post('http://localhost:4000/logout', {}, { withCredentials: true })
      .then(() => {
        setUser({}); // Limpa o estado do usuário após o logout
      })
      .catch(error => console.error('Error logging out:', error));
  }
  return (
    <AuthModalContext.Provider value={{ show: showAuthModal, setShow: setShowAuthModal }}>
      <PostFormModalContext.Provider value={{show:showPostFormModal, setShow:setShowPostFormModal}}>
      <UserContext.Provider value={{ ...user, logout, setUser }}>
        <Routing />

      </UserContext.Provider>
      </PostFormModalContext.Provider>
    </AuthModalContext.Provider>
  );
}

export default App;
