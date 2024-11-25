import React, { useState } from 'react';
import CommentForm from './CommentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

// Função para formatar a data
function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString('pt-BR', options);
}

function Comments({ comments, parentId, commentId, currentUser }) {
  const [showReplies, setShowReplies] = useState({});
  const [replyOpen, setReplyOpen] = useState({});

  // Função para alternar a visibilidade das respostas
  const toggleReplies = (commentId) => {
    setShowReplies(prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId]
    }));
  };

  // Função para abrir/fechar a textarea de resposta
  const toggleReplyOpen = (commentId) => {
    setReplyOpen(prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId]
    }));
  };

  // Verifica se o comentário tem respostas
  const hasReplies = (commentId) => {
    return comments.some(c => c.parentId === commentId);
  };
    // Enviar a atualização para o servidor
    axios.post(`http://localhost:4000/comments/${commentId}/like`)
      .catch(error => {
        console.error('Erro ao salvar a curtida no comentário:', error);
      });

  return (
    <div>
      {comments.filter(c => c.parentId === parentId).map((comment) => (
        <div key={comment._id} className=" mt-10 bg-com p-3 ml-6 mr-2 border-2 border-black">
          <div className="flex items-center font-com-user text-sm">
            <FontAwesomeIcon icon={faUserCircle} className="text-2xl mr-2" />
            {comment.author}
          </div>
          <div className="mt-2 text-lg font-bold text-black">{comment.body}</div>
          <div className="text-sm text-name-data font-bold">{formatDate(comment.postedAt)}</div>
            
          {parentId === comment.rootId && (
            <div className="mt-2 flex justify-end space-x-2">
              <div onClick={() => toggleReplyOpen(comment._id)}>
                <span className="bg-fundo_link text-link_color text-link cursor-pointer px-3 py-1 font-bold">
                  {replyOpen[comment._id] ? 'Cancelar' : 'Responder'}
                </span>
              </div>
              {hasReplies(comment._id) && !showReplies[comment._id] && (
                <div onClick={() => toggleReplies(comment._id)}>
                  <span className="bg-fundo_link text-link_color text-link cursor-pointer px-3 py-1 font-bold">
                    Ver respostas
                  </span>
                </div>
              )}
            </div>
          )}


          {replyOpen[comment._id] && (
            <CommentForm
              parentId={comment._id}
              rootId={comment.rootId}
              onCommentAdded={() => {
              toggleReplyOpen(comment._id);
              setShowReplies(prevState => ({ ...prevState, [comment._id]: true }));
              }}
            />
          )}
          {showReplies[comment._id] && (
            <div className="mt-2">
              <Comments comments={comments} parentId={comment._id} currentUser={currentUser} />
            </div>
            )}
          </div>
        ))}
      </div>
    );
}

export default Comments;
