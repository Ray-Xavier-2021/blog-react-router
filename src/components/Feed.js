// This file is used to show the post feed

import Post from "./Post"

const Feed = ({ posts }) => {
  return (
    <>
        {posts.map(post => (
            <Post 
                key={post.id}
                post={post}
            />
        ))}    
    </>
  )
}

export default Feed