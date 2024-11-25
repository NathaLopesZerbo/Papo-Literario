import PostsListing from "./PostsListing";
import PostForm from './PostForm';
import BoardHeader from './BoardHeader';

function Board(){
    return(
        <div>
            <BoardHeader />
            <PostForm />
            <PostsListing/>
        </div>
    )
}

export default Board;

