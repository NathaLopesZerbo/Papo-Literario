import Post from "./Post";
import CommentModal from "./CommentModal";
import { useState, useEffect } from "react";
import axios from "axios";

function PostsListing() {
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState(null); // Gerencia o estado do ID do comentário selecionado

  useEffect(() => {
    axios.get('http://localhost:4000/comments', { withCredentials: true })
      .then(response => setComments(response.data));
  }, []); // O array vazio [] evita chamadas infinitas ao useEffect

  return (
    <div className='bg-post-list post'>
      {comments.map(comment => (
        <Post
          key={comment._id}
          {...comment}
          open={commentId === comment._id}
          setCommentId={setCommentId}
        />
      ))}

      {commentId && (
        <CommentModal
          comment={comments.find(comment => comment._id === commentId)}
          closeModal={() => setCommentId(null)}
        />
      )}
    </div>
  );
}

export default PostsListing;
