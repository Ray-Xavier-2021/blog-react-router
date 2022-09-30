// Import useParams hook for use setting id parameter
import { useParams, Link } from "react-router-dom"

const PostPage = ({ posts, handleDelete }) => {
  // Set deconstructed id to useParams hook
  const { id } = useParams()
  /*
  Find post by id an save data to a variable
    convert to string for strict comparison
  */
  const post = posts.find(post => (post.id).toString() === id)
  return (
    <main className="PostPage">
      <article className="post">
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            {/* Set link to edit page */}

            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>

            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
          </>
        }
        {/* Set a message if no posts */}
        {!post &&
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing</p>
            <p><Link to='/'>Visit Our Homepage</Link></p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage