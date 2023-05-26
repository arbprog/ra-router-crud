import React, {useContext} from 'react';
import {Post} from '../Post/Post';
import {Comment} from '../Comment/Comment';
import {PostsContext} from '../PostsContext/PostsContext';
import {Link, useNavigate} from 'react-router-dom';
import shortid from 'shortid';

export function PostsMainView() {
    let history = useNavigate();
    const { posts } = useContext(PostsContext);

    const openPost = (id) => {
        history(`/posts/${id}`);
    }

    return(
       <>
        <div className="background">
          <div className="add-panel">
            <Link to="/posts/new" className="button">Создать пост</Link>
          </div>
          <ul>
            {posts.map((post) =>
            <li key={shortid.generate()}>
                <Post {...post} onClick={() => openPost(post.id)}>
                 <Comment />
                </Post>
            </li>
            )}
          </ul>
        </div>
       </>
    );
}