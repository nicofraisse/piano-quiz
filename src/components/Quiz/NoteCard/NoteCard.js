import React from 'react';
import classes from './NoteCard.module.css';

const NoteCard = (props) => {
  const colors = {
    1: "#008891",
    3: "#0278ae",
    0: "#6a2c70",
    2: "#b83b5e",
    4: "#fca652",
  }
  const color = props.colorCode
  return (
    <span
      onClick={props.click}
      className={classes.NoteCard}
      style={{backgroundColor: colors[props.colorCode], color: props.colorCode !== undefined ? "white" : "white"}}>
      {props.note}
    </span>
  )
}

export default NoteCard;
