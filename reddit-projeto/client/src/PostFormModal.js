// Importações de componentes e bibliotecas
import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {useNavigate}  from 'react-router-dom';

// Importação de componentes personalizados
import Input from "./Input";
import Textarea from "./Textarea";

// Importação de contextos
import PostFormModalContext from "./PostFormModalContext";
import AuthModalContext from './AuthModalContext';

function PostFormModal() {
    // Contextos
    const modalContext = useContext(PostFormModalContext);
    const authModalContext = useContext(AuthModalContext);
    const visibleClass = modalContext.show ? 'block' : 'hidden';
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    // Função para criar a postagem
    function createPost() {
        const data = { title, body };
        axios.post('http://localhost:4000/comments', data, { withCredentials: true })
            .then(response => {
                modalContext.setShow(false);
                setTitle('');
                setBody('');
               navigate('/comments/'+response.data._id);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    // Exibir o modal de login se o status for 401
                    alert('É necessário estar logado em uma conta para fazer uma publicação');
                    authModalContext.setShow('login');
                } else {
                    // Tratar outros erros, se necessário
                    alert('Erro ao publicar a postagem. Por favor, tente novamente.');
                }
            });
    }

    return (
        <div
            className={`w-screen h-screen fixed top-0 left-0 z-20 flex items-center justify-center ${visibleClass}`}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.72)' }}
>
    <div className="relative border-2 border-black w-full max-w-3xl h-2/4 bg-white p-8 text-gray-800 mx-auto rounded-3xl">
        <button
            className="absolute top-3 left-3 text-black hover:text-gray-600"
            onClick={() => { modalContext.setShow(false) }}
        >
            <FontAwesomeIcon icon={faTimes} className="px-1 h-5" />
        </button>
        <h1 className="text-3xl mb-8 mycss-title text-center ">
            Vamos lá, solte a criatividade e <br /> crie uma postagem espetacular!
        </h1>
        <Input
            type="text"
            className="w-full mb-4 p-4 placeholder:text-place placeholder:font-extrabold bg-post_input placeholder:text-lg text-xl"
            placeholder="Escreva seu título:"
            onChange={e => setTitle(e.target.value)}
            value={title}
        />
        <Textarea
            className="w-full h-1/4 mb-4 p-3 bg-post_input placeholder:text-place placeholder:font-extrabold placeholder:text-lg text-lg"
            placeholder="Escreva seu texto:"
            onChange={e => setBody(e.target.value)}
            value={body}
        />
        <div className="text-right mt-20 mr-8">
            <button onClick={() => { modalContext.setShow(false) }}  className=" font-pessoal font-bold px-7 mr-4 text-lg bg-transparent border-2 border-black rounded-full ">CANCELAR</button>
            <button onClick={() => { createPost() }} className="font-pessoal font-bold px-7 text-lg border-2 border-black rounded-full bg-post-com text-white">PUBLICAR</button>
        </div>
    </div>
</div>

    )
}

export default PostFormModal;
