import React from 'react';

// Função para formatar a data
function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString('pt-BR', options);
}

function Post(props) {

  function PostContent() {
    return (
      <div className=''>
        <h2 className='text-2xl mb-2 text-white font-extrabold text-center'>{props.title}</h2>
        <hr className='mb-8'/>
        <div className='text-lg font-bold leading-6 text-white mb-10'>
          {props.body}
        </div>
        <p className='cor-posted text-xs mb-1 font-bold text-center'>
          Publicado por <b className='cor-clique'>{props.author} em {formatDate(props.postedAt)} </b>
        </p>
      </div>
    );
  }

  const postClasses = `shadow-post block bg-post-form p-4 rounded-md shadow-md 
      ${props.open ? '' : 'hover:border-gray-700 cursor-pointer w-3/4 ml-auto mr-auto'}`;

  return (
    <div className='relative px-6 pb-8 pt-2'>
      <div
        className={postClasses}
        onClick={() => {
          if (!props.open) {
            props.setCommentId(props._id);
          }
        }}
        style={props.open ? { cursor: 'default' } : {}}
      >
        <PostContent />
      </div>
    </div>
  );
}

export default Post;
