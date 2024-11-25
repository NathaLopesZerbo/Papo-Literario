import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faPaperPlane, faComment, faBookmark } from '@fortawesome/free-regular-svg-icons';
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import { useEffect, useState } from 'react';
import axios from 'axios';

function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString('pt-BR', options);
}

function CommentModal({ comment, closeModal, openAuthModal }) {
  const [comments, setComments] = useState([]);

  const fetchComments = () => {
    if (comment && comment._id) {
      axios.get(`http://localhost:4000/comments?rootId=${comment._id}`)
        .then(response => {
          const fetchedComments = response.data;
          const processedComments = fetchedComments.map(c => {
            c.hasReplies = fetchedComments.some(reply => reply.parentId === c._id);
            return c;
          });
          setComments(processedComments);
        })
        .catch(error => {
          console.error('Erro ao buscar os comentários:', error);
        });
    }
  };

  const handleCommentAdded = () => {
    fetchComments();
  };

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  useEffect(() => {
    fetchComments();
  }, [comment]);

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="relative rounded-lg shadow-lg w-11/12 max-w-5xl p-6 overflow-auto h-5/6" style={{ background: 'linear-gradient(to right, #BDC3C7 51.5%, #34628F 48.5%)' }}>
        <button className="absolute top-3 left-3 text-black hover:text-gray-600" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} className="h-5" />
        </button>

        {/* Estrutura do conteúdo dividido em duas colunas */}
        <div className="flex w-full h-full">
          {/* Coluna da esquerda: Post com cor de fundo azul claro */}
          <div className="custom-scroll overflow-y-auto max-h-[80vh] border-r pr-4 bg-post-pub flex-1 ml-3">
            <h2 className="text-4xl mb-3 mt-14 text-black font-tit-post">{comment.title}</h2>
            <p className="text-lg leading-6 text-black font-bold mt-8">{comment.body}</p>
            <h5 className="text-black mb-10 mt-5 font-bold">Publicado por <b className='text-name-data'>{comment.author} em {formatDate(comment.postedAt)}</b></h5>
            {!!comment && !!comment._id && (
              <CommentForm
                rootId={comment._id}
                parentId={comment._id}
                onCommentAdded={handleCommentAdded}
                openAuthModal={openAuthModal}
              />
            )}

            <div className="flex text-gray-800 text-2xl mt-32 justify-evenly">
              <FontAwesomeIcon icon={faHeart} className="cursor-pointer text-icon" />
              <FontAwesomeIcon icon={faComment} className="cursor-pointer text-icon" />
              <FontAwesomeIcon icon={faPaperPlane} className="cursor-pointer text-icon" />
              <FontAwesomeIcon icon={faBookmark} className="cursor-pointer text-icon" />
            </div>
          </div>

        

          {/* Coluna da direita: Comentários com cor de fundo cinza claro */}
          <div className="custom-scroll overflow-y-auto max-h-[80vh] bg-post-com flex-1 ml-4">
            <Comments parentId={comment._id} comments={comments} className="" />
          </div>
        </div>
      </div>
    </div>
  );  
}

export default CommentModal;
