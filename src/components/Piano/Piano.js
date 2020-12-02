// Libraries
import React, { useState, useEffect } from 'react'
import { Howler } from 'howler'

// Utility functions
import { soundPlay, loadSounds } from '../../util/soundPlay'

// Components
import PianoNote from './PianoNote/PianoNote'

// Data
import audioClips from '../../data/audioClips'
import classes from './Piano.module.css'

const Piano = (props) => {
  const [controlsShowing, setControlsShowing] = useState(true)
  const [volume, setVolume] = useState(0)
  const [loading, setLoading] = useState(true)
  const [labelShowing, setLabelShowing] = useState(false)

  Howler.volume(volume)

  useEffect(() => {
    loadSounds(audioClips).then(
      () => {
        setVolume(0.9)
        setLoading(false)
      } // can make component to adjust user volume
    )
  }, [])

  useEffect(() => {
    setControlsShowing(!controlsShowing)
  }, [props.showControls])

  const pressNote = (note) => {
    soundPlay(audioClips[note])
    if (props.quiz) {
      props.sendNoteToGame(note)
    } else if (props.form) {
      props.sendNoteToForm(note)
    }
  }

  const adjustVolume = (e) => {
    setVolume(Number.parseInt(e.target.value) / 100)
    console.log('adjusnting')
  }

  let controlGear = null
  if (!props.quiz) {
    controlGear = (
      <span
        className={classes.SettingsBtn}
        style={{ marginTop: 24, display: 'inline-block' }}
        onClick={() => setControlsShowing(!controlsShowing)}
      >
        <i class='fas fa-cog'></i>
        {controlsShowing ? (
          <div className={classes.Controls}>
            <h3>Controls</h3>
            <div>
              <p>Volume: {Math.round(volume * 100)}</p>
              <input
                type='range'
                min='0'
                max='100'
                value={volume * 100}
                className={classes.Slider}
                onChange={(e) => adjustVolume(e)}
              />
            </div>
            <button
              onClick={() => {
                setLabelShowing(!labelShowing)
              }}
            >
              Toggle note labels
            </button>
          </div>
        ) : null}
      </span>
    )
  }

  let quizControls = null
  if (props.quiz) {
    quizControls = controlsShowing ? (
      <div className={classes.QuizControls}>
        <h3>Controls</h3>
        <div>
          <p>Volume: {Math.round(volume * 100)}</p>
          <input
            type='range'
            min='0'
            max='100'
            value={volume * 100}
            className={classes.Slider}
            onChange={(e) => adjustVolume(e)}
          />
        </div>
        <button
          onClick={() => {
            setLabelShowing(!labelShowing)
          }}
        >
          Toggle note labels
        </button>
      </div>
    ) : null
  }

  return (
    <>
      {' '}
      {loading ? (
        <div className={classes.Loading}>
          <div>
            <h3>Loading...</h3>
          </div>
        </div>
      ) : null}
      <div style={{ position: 'relative' }}>
        <div
          className={[
            classes.Piano,
            props.quiz ? '' : classes.FreePlayPiano,
          ].join(' ')}
        >
          <div className={classes.GrandPiano}>
            {Object.keys(audioClips).map((note, index) => (
              <PianoNote
                key={index}
                click={() => pressNote(note)}
                labelShow={labelShowing}
                label={note}
                lastAttemptData={
                  props.attemptData
                    ? props.attemptData[props.attemptData.length - 1]
                    : null
                }
              />
            ))}
          </div>
        </div>
        <p
          style={{ fontSize: '14', color: '#999' }}
          className={classes.MobileOnly}
        >
          Swipe the keyboard to view more notes
        </p>
        {controlGear}
        {quizControls}
      </div>
    </>
  )
}

export default Piano
