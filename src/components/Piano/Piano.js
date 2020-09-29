// Libraries
import React from 'react';
import { Howler } from 'howler';

// Components
import PianoNote from './PianoNote/PianoNote';


const Piano = (props) => {
  Howler.volume(0.9) // can make component to adjust volume

  const piano = Object.keys(props.notes).map((note, index) =>
    <PianoNote
      key={index}
      click={() => props.pressNote(note)}
      label={note}
    />
  );

  return (
    <div>
      <button onClick={props.clickStart}>Start game</button>
      <button onClick={props.clickPlay}>Play notes</button>
      <h2>Round {props.currentSubquizIndex + 1}/{props.quiz.quizzes.length}</h2>
      {piano}
      <h3>{props.gameFinished ? "Game finished" : null}</h3>
    </div>
  );
}

export default Piano;
