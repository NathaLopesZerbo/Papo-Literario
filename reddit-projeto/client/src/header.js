//CSS
import './style.css';
//bibliotecas
import { React, useState, useEffect, useRef, useContext } from 'react';
import {Link} from 'react-router-dom';
//logo
import logo from './logo-teste.png';
//componentes
import Button from './Button';
//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown, faArrowRightToBracket, faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
//context
import AuthModalContext from './AuthModalContext';
import UserContext from './UserContext';

function Header() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const authModal = useContext(AuthModalContext);
  const user = useContext(UserContext);

  return (
    <header className="flex w-full bg-reddit_light p-1">
      <div className="flex w-full justify-between items-center mx-6">
        <Link to='/'>
          <img src={logo} alt='' className='w-32 ml-6' />
        </Link>
  
        <div className='flex items-center' ref={dropdownRef}>
          {!user.username && (
            <div className='mx-2 hidden md:flex'>
              <Button outline className="mr-1" onClick={() => authModal.setShow('login')}>
                Entrar
              </Button>
              <Button onClick={() => authModal.setShow("register")}>
                Cadastre-se
              </Button>
            </div>
          )}
  
          <button onClick={toggleDropdown} className='flex items-center ml-4'>
            {!user.username ? (
              <FontAwesomeIcon icon={faUserCircle} className='w-7 h-7 m-1' />
            ) : (
              <FontAwesomeIcon icon={faBookOpenReader} className='text-gray-700 w-7 h-7 m-1' />
            )}
            <FontAwesomeIcon icon={faChevronDown} className='text-gray-700 w-4 h-4 m-1' />
          </button>
  
          {isDropdownVisible && (
            <div className='absolute right-0 top-11 bg-reddit_light border border-gray-700 rounded-md text-gray-800 overflow-hidden'>
              {user.username && (
                <span className='block w-60 py-3 px-4'>
                  Olá, {user.username}!
                </span>
              )}
  
              {!user.username ? (
                <button
                  onClick={() => authModal.setShow("login")}
                  className='block flex w-60 py-2 px-2 hover:bg-gray-700 hover:text-white'>
                  <FontAwesomeIcon icon={faArrowRightToBracket} className='w-5 h-5 mr-3 mt-1' />
                  Entrar / Cadastrar
                </button>
              ) : (
                <button
                  onClick={() => user.logout()}
                  className='block flex w-60 py-3 px-4 hover:bg-gray-700 hover:text-white'>
                  <FontAwesomeIcon icon={faArrowRightToBracket} className='w-5 h-5 mr-3 mt-1' />
                  Sair da conta
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
  
}

export default Header;