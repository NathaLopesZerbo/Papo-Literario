import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import PostFormModalContext from './PostFormModalContext';


function PostForm () {

  const modalContext = useContext(PostFormModalContext);
    return (
      <div className='bg-post-list px-6 py-8 flex justify-center'>
      <div className='text-center border-4 border-black flex w-3/5 bg-post-form mx-auto'>
        <div className='overflow-hidden'>
          <FontAwesomeIcon icon={faUserCircle} className='w-6 h-10 ml-3 text-black font-extrabold' />
        </div>
        <form action='' className='flex-grow ml-2'>
          <input 
            type='text'
            onClick={e => {
              e.preventDefault();
              modalContext.setShow(true);
            }}
            className='bg-post-form p-2 px-3 w-full placeholder:text-black placeholder:font-extrabold placeholder:text-sm' 
            placeholder='Nova publicação'
          />
        </form>
      </div>
    </div>
    
    );
}
export default PostForm;