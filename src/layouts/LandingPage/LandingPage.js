import React from 'react';
import classes from './LandingPage.module.css';

const LandingPage = (props) => {
  return (
    <div className={classes.LandingPage}>
      <div>
        <h1>How good is your capacity to recognize notes? </h1>
        <h2>Do you have perfect pitch, or relative pitch?</h2>
        <div onClick={props.click}>Let's find out!</div>
      </div>
    </div>
  )
}

export default LandingPage;
