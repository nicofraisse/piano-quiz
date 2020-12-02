import React from 'react'
import classes from './navbar.module.css'
import Button from '../Button/Button'

const Navbar = (props) => {
  return (
    <nav className={classes.Navbar}>
      <div className={classes.Logo} onClick={props.logoClick}>
        🎹
      </div>
      <div>
        <Button
          click={props.toggleDashboard}
          text='Choose a quiz'
          btnType='Primary'
        />
        <Button
          click={props.toggleFreeplay}
          text='Freeplay'
          btnType='Primary'
        />
      </div>
    </nav>
  )
}

export default Navbar
