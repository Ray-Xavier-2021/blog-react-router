// Header, Nav and Footer are refactored in Layout forReact Router v6
import Home from './pages/Home'
import NewPost from './pages/NewPost'
import PostPage from './pages/PostPage'
import About from './pages/About'
import MissingPage from './pages/MissingPage'
import EditPost from './pages/EditPost'
/*
In react-router-dom v6+ 'Switch' is replaced w/ 'Routes'
In react-router-dom v6+ 'useHistory' is replaced w/ 'useNavigate'
*/
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
// Import date format function from date-fns
import { format } from 'date-fns'
import Layout from './components/Layout'
import api from './api/posts'
function App() {
  // Create post state using array of objects
  const [posts, setPosts] = useState([])
  // Create search state
  const [search, setSearch] = useState('')
  // Create search results state to an empty array
  const [searchResults, setSearchResults] = useState([])
  // Create a history state
  const navigate = useNavigate()
  // Create post title state
  const [postTitle, setPostTitle] = useState('')
  // Create post body state
  const [postBody, setPostBody] = useState('')
  // Create edit title state
  const [editTitle, setEditTitle] = useState('')
  // Create edit body state
  const [editBody, setEditBody] = useState('')

  // Create use effect that fetches the post when the app first renders
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPosts();
  }, [])

  // Create use effect that runs when state of posts, and search are changed
  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  // Create a function to handle submission of post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  // Create a function to handle update of post
  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  // Create a function to handle delete of post
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <Routes>
      <Route path='/' element={<Layout
        search={search}
        setSearch={setSearch}
      />}>
        <Route index path="/" element={
          <Home
            posts={searchResults}
          />} />
        {/* Nested Route allowed in react router v6 */}
        <Route path="post">
          <Route index element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />} />
          <Route path="/post/:id" element={
            <PostPage
            posts={posts}
            handleDelete={handleDelete}
            />} />
        </Route>
        <Route path='edit/:id' element={
          <EditPost
            posts={posts}
            handleEdit={handleEdit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
        />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<MissingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
