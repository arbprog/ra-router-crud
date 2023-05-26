import React, {useContext} from 'react';
import {Post} from '../Post/Post';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {PostsContext} from '../PostsContext/PostsContext';

export function Buttons(props){
  let history = useNavigate();
  let { id }  = useParams();
  const { fetchPosts } = useContext(PostsContext);

  const onDelete = () => {
    fetch(`http://localhost:7777/posts/${id}`, {
        method: 'DELETE',
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
    })
  }

  return(
     <div className="buttons">
       <Link to={`/posts/${id}/edit`} className="button">Изменить</Link>
       <button className="button button_delete" onClick={onDelete}>Удалить</button>
     </div>
  );
};

export const withButtons = (Component) => (props) => {
  return(
    <Component {...props}>
      <Buttons />
    </Component>
  );
}
export const PostWithButtons = withButtons(Post);