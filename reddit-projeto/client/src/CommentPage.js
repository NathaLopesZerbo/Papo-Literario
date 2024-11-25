import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from './Post';

function CommentPage() {
    const { id: commentId } = useParams();
    const [comment, setComment] = useState(null);  // Inicialize como null para verificar a existência

    useEffect(() => {
        axios.get(`http://localhost:4000/comments/${commentId}`)  // Corrija o URL
            .then(response => setComment(response.data))
            .catch(error => console.error('Error fetching comment:', error));  // Adicione tratamento de erro
    }, [commentId]);  // Adicione commentId às dependências do useEffect

    return (
        <div className='bg-gray-200 py-5'>
            {comment ? (
                <Post {...comment} open={true}/>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default CommentPage;
