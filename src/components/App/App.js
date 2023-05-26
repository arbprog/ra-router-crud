import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PostsMainView } from '../PostsMainView/PostsMainView';
import { NewPost } from '../NewPost/NewPost';
import { EditPost } from '../EditPost/EditPost';
import { PostWithButtons } from '../Buttons/Buttons';
import { PostsProvider } from '../PostsContext/PostsContext';
import './App.css';


function App() {

  return(
    <PostsProvider>
      <BrowserRouter>
      <Routes>
       <Route exact='true' path="/ra-router-crud"  element={<PostsMainView />} />
      </Routes>
       <Routes>
         <Route path="/posts/new" element={<NewPost />} />
         <Route path="/posts/:id" element={<PostWithButtons />} />
       </Routes>
       <Routes>
         <Route path="/posts/:id/edit" element={<EditPost />} />
       </Routes>
      </BrowserRouter>
    </PostsProvider>
  )
};

export default App;