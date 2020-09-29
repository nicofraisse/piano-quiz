import React from 'react';

const PianoNote = (props) => {
  return (
    <button
    key={props.index}
    onClick={props.click}
    style={{
      height: 100,
      backgroundColor: props.label.includes('#') ? 'black' : 'white',
      width: props.label.includes('#') ? '28px' : '36px',
      color: props.label.includes('#') ? 'white' : 'black',
      transform: props.label.includes('#') ? 'translateY(-12px)' : '',
    }}
    >
      {props.label}
    </button>
  )
}

export default PianoNote;
