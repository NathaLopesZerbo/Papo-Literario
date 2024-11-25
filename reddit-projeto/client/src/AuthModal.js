import logo from './logo-white.png';
import livro from './livro-auth.png';
//bibliotecas
import React, { useState, useContext, useRef, useEffect, useCallback } from "react";
import axios from 'axios';
// context
import AuthModalContext from "./AuthModalContext";
import UserContext from "./UserContext";

function AuthModal() {
    const [modalType, setModalType] = useState('login');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const modalContext = useContext(AuthModalContext);
    const modalRef = useRef(null);
    const user = useContext(UserContext);

    const visibleClass = modalContext.show ? 'block' : 'hidden';
    if(modalContext.show && modalContext.show !== modalType) {
        setModalType(modalContext.show);
    }

    const register = useCallback((e) => {
        e.preventDefault();
        const data = { email, username, password };

        axios.post('http://localhost:4000/users', data, { withCredentials: true })
            .then(response => {
                console.log(response.data);
                // Atualize o estado do usuário após o registro ser bem-sucedido
                user.setUser({username});
                modalContext.setShow(false);
                setEmail('');
                setPassword('');
                setUsername('');
            })
            .catch(error => {
                console.error('Error during registration:', error);
            });
    }, [email, username, password, user, modalContext]);

    const login = useCallback((e) => {
      e.preventDefault(); // Evita a atualização da página
      const data = { username, password };

      axios.post('http://localhost:4000/login', data, { withCredentials: true })
          .then((response) => {
              setEmail('');
              setPassword('');
              setUsername('');
              user.setUser({ username });
              modalContext.setShow(false);
          })
          .catch((error) => {
              console.error('Error during login:', error);
          });
  }, [username, password, user, modalContext]);

    const handleClickOutside = useCallback((event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            modalContext.setShow(false); // Assumindo que você tem uma função `setShow` para atualizar o estado
        }
    }, [modalContext]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);



    console.log(user);
    return (
      <div className={`w-screen h-screen fixed top-0 left-0 z-30 flex items-center justify-center ${visibleClass}`} style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <div
          ref={modalRef}
          className="flex max-w-4xl w-full h-pessoal bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Coluna Esquerda: Formulário */}
          <div className="w-1/2 p-6">
            {modalType === 'login' && (
              <h1 className="text-2xl font-bold text-center mb-6 font-pessoal cor-tit-auth">ENTRAR AO CHAT!</h1>
            )}
            {modalType === 'register' && (
              <h1 className="text-2xl font-bold text-center mb-6 font-pessoal cor-tit-auth">JUNTE-SE AO CHAT!</h1>
            )}
  
            <form>
              {modalType === 'register' && (
                <label>
                  <input
                    type='email'
                    className='w-5/6 p-2 mb-3 ml-5 bg-input border rounded-lg placeholder:text-place placeholder:font-extrabold placeholder:text-xs'
                    placeholder='Email:'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </label>
              )}
              <label>
                <input
                  type='text'
                  className='w-5/6  p-2 mb-3 ml-5 bg-input border rounded-lg placeholder:text-place placeholder:font-extrabold placeholder:text-xs mt-5'
                  placeholder='Nome:'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </label>
              
              {modalType === 'register' && (
                    <p className="text-auth-size pb-2 ml-5 font-bold cor-txt-auth">
                        É por esse nome que as pessoas vão te conhecer no Papo-Literário. Você pode sempre muda-lo depois
                    </p>
                )}
                  <label>
                  <span className="block text-sm mb-2"></span>
                  <input
                    type='password'
                    className='w-5/6 p-2 mt-2 ml-5 bg-input border rounded-lg placeholder:text-place placeholder:font-extrabold placeholder:text-xs'
                    placeholder='Senha:'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  </label>

              {modalType === 'register' && (
                <p className='text-auth-size mb-5 mt-3 ml-6 font-bold cor-txt-auth'>
                  Ao clicar em Cadastrar-se, você concorda com os <button className='cor-clique'> <u>Termos de serviço do Papo-Literário </u></button> e reconhece que nosso <button className='cor-clique '><u>Aviso de privacidade</u></button> está em efeito.
                </p>
              )}

              {modalType === 'login' && (
                <p className='text-auth-size mt-4 ml-6 font-bold cor-txt-auth'>
                Problemas para efetuar o login? <button className='cor-clique'><u>Clique aqui</u></button>
              </p>
              )}
  
              {modalType === 'login' && (
                <button
                  className="font-bold font-pessoal flex justify-center w-2/3 bg-auth text-white py-2 mx-auto rounded-2xl text-center mt-20"
                  onClick={login}
                  onKeyDown={(e) => e.key === 'Enter' && login()}
                >
                  ENTRAR
                </button>
              )}
              {modalType === 'register' && (
                <button
                  className="font-bold font-pessoal flex justify-center w-2/3 bg-auth text-white py-2 mx-auto rounded-2xl text-center"
                  onClick={register}
                  onKeyDown={(e) => e.key === 'Enter' && register()}
                >
                  CADASTRAR-SE
                </button>
              )}

            </form>
  
            <div className="mt-8 ml-20">
              {modalType === 'login' && (
                <p className="text-xs cor-txt-auth font-bold">
                  Ainda não possui uma conta? <button onClick={() => modalContext.setShow('register')} className="cor-clique font-bold"><u>Clique aqui</u></button>
                </p>
              )}
            </div>

            <div className="mt-8 text-center">
              {modalType === 'register' && (
                <p className="text-xs cor-txt-auth font-bold">
                  Já possui uma conta? <button onClick={() => modalContext.setShow('login')} className="cor-clique font-bold"><u>Clique aqui</u></button>
                </p>
              )}
            </div>
          </div>
  {/* Coluna Direita: Mensagem de boas-vindas */}
  <div className="w-1/2 text-white p-6 flex flex-col justify-center items-center auth">
          <h2 className="text-2xl font-bold mb-10"><img src={logo} className=''/>
          <hr className='text-hr border w-70 mx-auto'/>
           </h2>
          <p className="text-center mb-3 font-pessoal font-bold">
            SEU BILHETE PARA O PAPO-LITERÁRIO</p>
            
            {modalType === 'register' && (
              <>
                <p className='text-center  text-sm font-pessoal mb-4'>Se você está sempre pronto para um papo divertido, você encontrou o lugar certo!</p>

                <img src={livro} className='w-50'/> 

                <p className="mt-4 text-center text-sm font-pessoal">
                Crie uma conta para participar da conversa!
                </p>
               </>
            )}

              {modalType === 'login' && (
              <>
                <p className='text-center  text-sm font-pessoal mb-4'>Você sabe o que costumam dizer... <br/>
                  Amigos que leem juntos, ficam sempre juntos.
                </p>

                <img src={livro} className='w-50'/> 

                <p className="mt-4 text-center text-sm font-pessoal">
                Entre na sua conta para participar da conversa!
                </p>
               </>
            )}
        </div>
      </div>
    </div>
  );
}
  
  export default AuthModal;
  