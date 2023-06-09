import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostForm } from '../PostForm/PostForm';
import { PostsContext } from '../PostsContext/PostsContext';
import image from '../../assets/003-image.svg';
import smile from '../../assets/004-smiling.svg';
import gif from '../../assets/001-gif-file.svg';
import tag from '../../assets/005-tag.svg';
import geo from '../../assets/002-placeholder.svg';

export function EditPost() {
  let { id } = useParams();
  const { posts, fetchPosts } = useContext(PostsContext);
  const postText = posts.find(o => Number(o.id) === Number(id));
  const [text, setText] = useState(postText.content);
  let history = useNavigate();

  const onChange = (e) => {
    setText(e.target.value);
  }

  const onSaveChanges = (e) => {
    e.preventDefault();
    const post = {id: Number(id), content: text};
    fetch('http://localhost:7777/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    .then(response => {
      if (!response.ok) {
          throw new Error(response.statusText);
      }
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      fetchPosts();
      history('/ra-router-crud');
      console.log('back')
    })
  }

  const onClose = (e) => {
    e.preventDefault();
    history('/ra-router-crud');
  }

  return(
     <div className="edit-post">
       <button className="close close_edit" onClick={onClose}>
         <span className="material-icons">
          close
         </span>
       </button>
       <h4 className="edit-post__header">Редактировать публикацию</h4>
       <PostForm name="edit-text"
                 submitValue="Сохранить"
                 text={text}
                 onChange={onChange}
                 onSubmit={onSaveChanges}>
         <ul className="edit-post__options">
           <li><img className="icon" src={image} alt="#" /> Фото/видео</li>
           <li><img className="icon" src={smile}  alt="#"/> Чувства/действия</li>
           <li><img className="icon" src={gif}  alt="#"/> GIF</li>
           <li><img className="icon" src={tag}  alt="#"/> Отметить друзей</li>
           <li><img className="icon" src={geo}  alt="#" /> Отметить посещение</li>
         </ul>
       </PostForm>
     </div>
  );
}