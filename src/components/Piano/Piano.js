// Libraries
import React from 'react';
import { Howler } from 'howler';

// Utility functions
import soundPlay from '../../util/soundPlay';

// Components
import PianoNote from './PianoNote/PianoNote';

// Data
import audioClips from '../../data/audioClips'


const Piano = (props) => {
  const pressNote = (note) => {
    soundPlay(audioClips[note]);
    if (props.quiz) {
      props.sendNoteToGame(note);
    } else if (props.form) {
      props.sendNoteToForm(note)
    }
  }

  Howler.volume(0.9) // can make component to adjust volume

  return (
    <div>
      {
        Object.keys(audioClips).map((note, index) =>
          <PianoNote
            key={index}
            click={() => pressNote(note)}
            label={note}
          />
        )
      }
    </div>
  );
}

export default Piano;
