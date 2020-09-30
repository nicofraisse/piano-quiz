// Libraries
import React, { useState } from 'react';
import { Howler } from 'howler';

// Utility functions
import soundPlay from '../../util/soundPlay';

// Components
import PianoNote from './PianoNote/PianoNote';

// Data
import audioClips from '../../data/audioClips';
import classes from './Piano.module.css';


const Piano = (props) => {
  const [controlsShowing, setControlsShowing] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const [labelShowing, setLabelShowing] = useState(false);
  const pressNote = (note) => {
    soundPlay(audioClips[note]);
    if (props.quiz) {
      props.sendNoteToGame(note);
    } else if (props.form) {
      props.sendNoteToForm(note);
    }
  }

  const adjustVolume = (e) => {
    setVolume(Number.parseInt(e.target.value) / 100)

  }

  Howler.volume(volume) // can make component to adjust volume

  return (
    <div className={classes.Piano}>
      <div className={classes.GrandPiano}>
        {
          Object.keys(audioClips).map((note, index) =>
            <PianoNote
              key={index}
              click={() => pressNote(note)}
              labelShow={labelShowing}
              label={note}
              lastAttemptData={props.attemptData ? props.attemptData[props.attemptData.length - 1] : null}
            />
          )
        }
        <span className={classes.SettingsBtn} onClick={() => setControlsShowing(!controlsShowing)}>
          <i class="fas fa-cog"></i>
        </span>
      {
        controlsShowing ?
        <div className={classes.Controls}>
          <h3>Controls</h3>
          <div>
            <p>Volume: {Math.round(volume * 100)}</p>
            <input type="range" min="0" max="100" value={volume * 100} className={classes.Slider} onChange={e => adjustVolume(e)} />
          </div>
          <button onClick={() => {setLabelShowing(!labelShowing)}}>Toggle note labels</button>
        </div>
        :
        null
      }
      </div>
    </div>
  );
}

export default Piano;
