import React from 'react';

const NoteCard = (props) => {
  return (
    <span onClick={props.click}>
      {props.note}
    </span>
  )
}

export default NoteCard;
