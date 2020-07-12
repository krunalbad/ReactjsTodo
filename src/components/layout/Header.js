import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={headerStyle}>
      <h1>TodoList React.js</h1>
      <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/todos">ToDos</Link>
    </header>
  )
}

const headerStyle = {
  background: '#1a611c',
  color: '#fff',
  textAlign: 'center',
  padding: '10px'
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none'
}

export default Header;