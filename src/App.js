// Header, Nav and Footer are refactored in Layout forReact Router v6
import Home from './pages/Home'
import NewPost from './pages/NewPost'
import PostPage from './pages/PostPage'
import About from './pages/About'
import MissingPage from './pages/MissingPage'
/*
In react-router-dom v6+ 'Switch' is replaced w/ 'Routes'
In react-router-dom v6+ 'useHistory' is replaced w/ 'useNavigate'
*/
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
// Import date format function from date-fns
import { format } from 'date-fns'
import Layout from './components/Layout'

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

  // Create use effect that runs when state of posts, and search are changed
  useEffect(() => {
    const filteredResults = posts.filter(post => ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()))

    setSearchResults(filteredResults.reverse())
  }, [posts, search])

  // Create a function to handle delete of post
  const handleDelete = (id) => {
    const postList = posts.filter(post => post.id !== id)
    setPosts(postList)
    navigate('/')
  }
  // Create a function to handle submit of post
  const handleSubmit = (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = { id, title: postTitle, datetime, body: postBody }
    const allPosts = [...posts, newPost]
    setPosts(allPosts)
    setPostTitle('')
    setPostBody('')
    navigate('/')
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
          <Route path="about" element={<About />} />
          <Route path="*" element={<MissingPage />} />
        </Route>
      </Routes>
  );
}

export default App;
