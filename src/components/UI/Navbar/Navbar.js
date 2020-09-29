import React from 'react';
import classes from './navbar.module.css';

const Navbar = (props) => {
  return (
    <nav className={classes.Navbar}>
      This is navbar
      <button onClick={() => props.click('yeah')}>Quiz Dashboard</button>
    </nav>
  )

}

export default Navbar;
