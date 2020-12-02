import React from 'react'
import Piano from '../../components/Piano/Piano'
import classes from './Freeplay.module.css'

const Freeplay = () => {
  return (
    <div className={classes.Freeplay}>
      <h1>Freeplay</h1>
      <Piano />
    </div>
  )
}

export default Freeplay
