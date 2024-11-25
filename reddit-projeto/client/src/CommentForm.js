import { useContext, useState } from 'react';
import UserContext from './UserContext';
import Textarea from './Textarea';
import axios from 'axios';
import AuthModalContext from './AuthModalContext';

function CommentForm({ parentId, rootId, onCommentAdded, openAuthModal }) {
  const userInfo = useContext(UserContext);
  const [commentBody, setCommentBody] = useState('');
  const modalContext = useContext(AuthModalContext);

  function postComment(e) {
    e.preventDefault();
    const data = { body: commentBody, parentId, rootId };
    axios.post('http://localhost:4000/comments', data, { withCredentials: true })
      .then(response => {
        setCommentBody('');
        if (onCommentAdded) {
          onCommentAdded();
        }
      })
      .catch(error => {
        console.error('Erro ao postar comentário:', error);
      });
  }

  return (
    <div className="mt-4">
      {userInfo.username ? (
        <form onSubmit={postComment}>
          <div className="mb-2 font-bold text-lg">
            Comente como <b className='cor-clique'>{userInfo.username}</b>
          </div>
          <Textarea className="w-full mb-2 p-3 border border-gray-300 rounded-lg bg-white" onChange={e => setCommentBody(e.target.value)} value={commentBody} />
          <div className="text-right">
            <button className="font-bold font-pessoal bg-post-btn text-white w-1/3 py-2 mx-auto rounded-2xl mt-2 text-lg">Comente</button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <p className="mt-10 text-black border-post font-bold px-2 py-1">Pronto para escrever seu capítulo? Faça login e deixe sua marca na história</p>
          <button className=" mt-10 font-bold font-pessoal flex justify-center w-1/3 bg-post-btn text-white py-2 mx-auto rounded-2xl text-center" onClick={() => modalContext.setShow('login')}>
            FAZER LOGIN
          </button>
        </div>
      )}
    </div>
  );
}

export default CommentForm;
