// Libraries
import React, { useState, useEffect } from 'react';

// Utility functions
import soundPlay from '../../util/soundPlay'
import sleepAsync from '../../util/sleepAsync'

// Components
import Piano from '../../components/Piano/Piano';

// Assets
import C1 from '../../assets/sounds/C1.wav';
import C1_sharp from '../../assets/sounds/C1_sharp.wav';
import D1 from '../../assets/sounds/D1.wav';
import D1_sharp from '../../assets/sounds/D1_sharp.wav'
import E1 from '../../assets/sounds/E1.wav'
import F1 from '../../assets/sounds/F1.wav'
import F1_sharp from '../../assets/sounds/F1_sharp.wav'
import G1 from '../../assets/sounds/G1.wav'
import G1_sharp from '../../assets/sounds/G1_sharp.wav'
import A1 from '../../assets/sounds/A1.wav'
import A1_sharp from '../../assets/sounds/A1_sharp.wav'
import B1 from '../../assets/sounds/B1.wav'
import C2 from '../../assets/sounds/C2.wav'
import C2_sharp from '../../assets/sounds/C2_sharp.wav'
import D2 from '../../assets/sounds/D2.wav'
import D2_sharp from '../../assets/sounds/D2_sharp.wav'
import E2 from '../../assets/sounds/E2.wav'
import F2 from '../../assets/sounds/F2.wav'
import F2_sharp from '../../assets/sounds/F2_sharp.wav'
import G2 from '../../assets/sounds/G2.wav'
import G2_sharp from '../../assets/sounds/G2_sharp.wav'
import A2 from '../../assets/sounds/A2.wav'
import A2_sharp from '../../assets/sounds/A2_sharp.wav'
import B2 from '../../assets/sounds/B2.wav'
import C3 from '../../assets/sounds/C3.wav'

const audioClips = {
  "C1": C1,
  'C#1': C1_sharp,
  'D1': D1,
  'D#1': D1_sharp,
  'E1': E1,
  'F1': F1,
  'F#1': F1_sharp,
  'G1': G1,
  'G#1': G1_sharp,
  'A1': A1,
  'A#1': A1_sharp,
  'B1': B1,
  'C2': C2,
  'C#2': C2_sharp,
  'D2': D2,
  'D#2': D2_sharp,
  'E2': E2,
  'F2': F2,
  'F#2': F2_sharp,
  'G2': G2,
  'G#2': G2_sharp,
  'A2': A2,
  'A#2': A2_sharp,
  'B2': B2,
  'C3': C3,
}

const Game = (props) => {
  const [ gameStarted, setGameStarted ] = useState(false)
  const [ gameFinished, setGameFinished ] = useState(false)

  // const [ quizAttemptData, setQuizAttemptData ] = useState([]) // can be useful later
  const [ subquizAttemptData, setSubquizAttemptData ] = useState([])
  const [ currentSubquizIndex, setCurrentSubquizIndex ] = useState(0)
  const [ currentSubquizNoteIndex, setCurrentSubquizNoteIndex ] = useState(0)

  const handleNoteClick = (note) => {
    soundPlay(audioClips[note]);
    // visualFeedback(note);
    setSubquizAttemptData([
      ...subquizAttemptData,
      {
        note: note,
        correct: note === props.quiz.quizzes[currentSubquizIndex][currentSubquizNoteIndex],
        timestamp: new Date()
      }
    ])

    // Go to next note when user clicks the right note
    if (note === props.quiz.quizzes[currentSubquizIndex][currentSubquizNoteIndex]) {
      console.log('right note!!')
      setCurrentSubquizNoteIndex(currentSubquizNoteIndex + 1)
    }
    console.log(currentSubquizIndex, props.quiz.quizzes.length)

    // Go to the next subquiz when the user finishes the subquiz
    if (note === props.quiz.quizzes[currentSubquizIndex][currentSubquizNoteIndex] &&
        currentSubquizNoteIndex === props.quiz.quizzes[currentSubquizIndex].length - 1 &&
        currentSubquizIndex !== props.quiz.quizzes.length - 1) {
      console.log('finished quiz number', currentSubquizIndex)
      setCurrentSubquizIndex(currentSubquizIndex + 1)
      setCurrentSubquizNoteIndex(0)
    }

    // Manage end of the game
    if (note === props.quiz.quizzes[currentSubquizIndex][currentSubquizNoteIndex] &&
        currentSubquizNoteIndex === props.quiz.quizzes[currentSubquizIndex].length - 1 &&
        currentSubquizIndex === props.quiz.quizzes.length - 1) {
      endGame()
      console.log('finished quiz number', currentSubquizIndex)
      console.log('YOU FINISHED THANKS FOR PLAYING')

      // setCurrentSubquizIndex(currentSubquizIndex + 1)
      // setCurrentSubquizNoteIndex(0)
    }
  }

  const startGame = () => {
    setGameStarted(true)
    setGameFinished(false)
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
    console.log(subquizAttemptData)
  })


  return (
    <div>
      <Piano
      notes={audioClips}
      clickStart={startGame}
      clickPlay={playNotes}
      pressNote={handleNoteClick}
      quiz={props.quiz}
      currentSubquizIndex={currentSubquizIndex}
      gameFinished={gameFinished}
      />
    </div>
  )
}


export default Game;
