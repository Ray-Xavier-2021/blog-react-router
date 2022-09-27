import React from 'react'
import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'

// Import Outlet to act as a container for pages components
import { Outlet } from 'react-router-dom'

const Layout = ({ search, setSearch }) => {
  return (
    <div className='App'>
        <Header 
            title='ReactJs Blog'
        />
        <Nav
            search={search}
            setSearch={setSearch}
        />
        <Outlet />
        <Footer />
      
    </div>
  )
}

export default Layout
