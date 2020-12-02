// Libraries
import React, { useState, useEffect } from 'react'

// Utility functions
import { soundPlay } from '../../util/soundPlay'
import sleepAsync from '../../util/sleepAsync'

// Components
import Piano from '../../components/Piano/Piano'
import FinalScore from '../../components/Quiz/FinalScore/FinalScore'
import Button from '../../components/UI/Button/Button'

// Data
import audioClips from '../../data/audioClips'

// Stylesheets
import classes from './Game.module.css'

const Game = (props) => {
  const [controlsShowing, setControlsShowing] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [quizAttemptData, setQuizAttemptData] = useState([])
  const [subquizAttemptData, setSubquizAttemptData] = useState([])
  const [currentSubquizIndex, setCurrentSubquizIndex] = useState(0)
  const [currentSubquizNoteIndex, setCurrentSubquizNoteIndex] = useState(0)

  const noteAttempt = (note) => {
    // visualFeedback(note);
    setSubquizAttemptData([
      ...subquizAttemptData,
      {
        note: note,
        correct:
          note ===
          props.quiz.quizzes[currentSubquizIndex][currentSubquizNoteIndex],
        timestamp: new Date(),
      },
    ])

    // Go to next note when user clicks the right note
    if (
      note === props.quiz.quizzes[currentSubquizIndex][currentSubquizNoteIndex]
    ) {
      setCurrentSubquizNoteIndex(currentSubquizNoteIndex + 1)
    }

    // Go to the next subquiz when the user finishes the subquiz
    if (
      note ===
        props.quiz.quizzes[currentSubquizIndex][currentSubquizNoteIndex] &&
      currentSubquizNoteIndex ===
        props.quiz.quizzes[currentSubquizIndex].length - 1 &&
      currentSubquizIndex !== props.quiz.quizzes.length - 1
    ) {
      setTimeout(() => {
        setCurrentSubquizIndex(currentSubquizIndex + 1)
        setQuizAttemptData((prev) => [
          ...prev,
          [
            ...subquizAttemptData,
            {
              note: note,
              correct:
                note ===
                props.quiz.quizzes[currentSubquizIndex][
                  currentSubquizNoteIndex
                ],
              timestamp: new Date(),
            },
          ],
        ])
        setCurrentSubquizNoteIndex(0)
      }, 1000)
    }

    // Manage end of the game
    if (
      note ===
        props.quiz.quizzes[currentSubquizIndex][currentSubquizNoteIndex] &&
      currentSubquizNoteIndex ===
        props.quiz.quizzes[currentSubquizIndex].length - 1 &&
      currentSubquizIndex === props.quiz.quizzes.length - 1
    ) {
      setTimeout(() => {
        setQuizAttemptData((prev) => [
          ...prev,
          [
            ...subquizAttemptData,
            {
              note: note,
              correct:
                note ===
                props.quiz.quizzes[currentSubquizIndex][
                  currentSubquizNoteIndex
                ],
              timestamp: new Date(),
            },
          ],
        ])
        endGame()
      }, 1000)
    }
  }

  const startGame = () => {
    setQuizAttemptData([])
    setGameFinished(false)
    setCurrentSubquizIndex(0)
    setCurrentSubquizNoteIndex(0)
    setSubquizAttemptData([0])
  }

  const endGame = () => {
    setGameFinished(true)
  }

  const playNotes = async () => {
    for (const note of props.quiz.quizzes[currentSubquizIndex]) {
      soundPlay(audioClips[note])
      await sleepAsync(600)
    }
  }

  useEffect(() => {
    startGame()
  }, [props.quiz])

  useEffect(() => {
    setSubquizAttemptData([])
  }, [quizAttemptData])

  return (
    <div className={classes.Game}>
      <h1>{props.quiz.name}</h1>
      <h2 className={classes.SubtleText}>
        Round <strong>{currentSubquizIndex + 1}</strong> of{' '}
        {props.quiz.quizzes.length}
      </h2>
      <p>
        Instructions: press "Play" and listen to the notes being played. Then,
        try to reproduce them in the right order by clicking on the piano notes.
        When the note flashes green, it is correct! The final score will be
        shown once you've finished all of the rounds.
      </p>
      <div className={classes.Buttons}>
        <Button
          click={playNotes}
          text={[<i class='fas fa-play'></i>, 'Play']}
          btnType='PlayNotes'
        />
        <Button
          click={startGame}
          text={[<i class='fas fa-redo-alt'></i>, 'Restart game']}
          btnType='Subtle'
        />
        <span
          className={classes.SettingsBtn}
          onClick={() => setControlsShowing(!controlsShowing)}
        >
          <i class='fas fa-cog'></i>
        </span>
      </div>
      <Piano
        showControls={controlsShowing}
        notes={audioClips}
        sendNoteToGame={noteAttempt}
        quiz={props.quiz}
        attemptData={subquizAttemptData}
        noteIndex={currentSubquizNoteIndex}
      />
      {gameFinished ? (
        <FinalScore
          attemptData={quizAttemptData}
          click={() => setGameFinished(false)}
        />
      ) : null}
    </div>
  )
}

export default Game
