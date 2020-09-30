import React from 'react';
import classes from './PianoNote.module.css';

const PianoNote = (props) => {
  const specialStyle = () => {
    if (props.lastAttemptData) {
      if (props.lastAttemptData.correct && props.label === props.lastAttemptData.note) {
        return "rgba(154, 233, 83, 1.00)";
      } else if (!props.lastAttemptData.correct && props.label === props.lastAttemptData.note) {
        return "#ff414d";
      }
    }
  }

  return (
    <div style={{display: 'inline', position: 'relative'}}>
      <button
      key={props.index}
      onClick={props.click}
      className={[classes.Note, props.label.includes('#') ? classes.BlackKey : classes.WhiteKey].join(' ')}
      style={{backgroundColor: specialStyle()}}>
        <span>{props.labelShow ? props.label : null}</span>
      </button>
    </div>
  );
}

export default PianoNote;
