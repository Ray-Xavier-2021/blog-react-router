import { Link } from 'react-router-dom'
const Nav = ({ search, setSearch }) => {
  return (
    <nav className="Nav">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search Posts</label>
        <input 
          id="search"
          type='text'
          placeholder='Search Posts'
          // Make input a controlled component
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul>
        {/* Create links for nav li */}
        <li><Link to='/'>Home</Link></li>
        <li><Link to='post'>Post</Link></li>
        <li><Link to='about'>About</Link></li>
      </ul>
    </nav>
  )
}

export default Nav
