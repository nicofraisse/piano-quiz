// Libraries
import React, { useState, useEffect } from 'react';

// Utility functions
import soundPlay from '../../util/soundPlay';
import sleepAsync from '../../util/sleepAsync';

// Components
import Piano from '../../components/Piano/Piano';

// Data
import audioClips from '../../data/audioClips'


const Game = (props) => {
  const [ gameStarted, setGameStarted ] = useState(false);
  const [ gameFinished, setGameFinished ] = useState(false);

  // const [ quizAttemptData, setQuizAttemptData ] = useState([]) // can be useful later
  const [ subquizAttemptData, setSubquizAttemptData ] = useState([]);
  const [ currentSubquizIndex, setCurrentSubquizIndex ] = useState(0);
  const [ currentSubquizNoteIndex, setCurrentSubquizNoteIndex ] = useState(0);

  const noteAttempt = (note) => {
    // visualFeedback(note);
    setSubquizAttemptData([
      ...subquizAttemptData,
      {
        note: note,
        correct: note === props.quiz.quizzes[currentSubquizIndex][currentSubquizNoteIndex],
        timestamp: new Date()
      }
    ]);

    // Go to next note when user clicks the right note
    if (note === props.quiz.quizzes[currentSubquizIndex][currentSubquizNoteIndex]) {
      console.log('right note!!');
      setCurrentSubquizNoteIndex(currentSubquizNoteIndex + 1);
    }
    // console.log(currentSubquizIndex, props.quiz.quizzes.length);

    // Go to the next subquiz when the user finishes the subquiz
    if (note === props.quiz.quizzes[currentSubquizIndex][currentSubquizNoteIndex] &&
        currentSubquizNoteIndex === props.quiz.quizzes[currentSubquizIndex].length - 1 &&
        currentSubquizIndex !== props.quiz.quizzes.length - 1) {
      console.log('finished quiz number', currentSubquizIndex);
      setCurrentSubquizIndex(currentSubquizIndex + 1);
      setCurrentSubquizNoteIndex(0);
    }

    // Manage end of the game
    if (note === props.quiz.quizzes[currentSubquizIndex][currentSubquizNoteIndex] &&
        currentSubquizNoteIndex === props.quiz.quizzes[currentSubquizIndex].length - 1 &&
        currentSubquizIndex === props.quiz.quizzes.length - 1) {
      endGame();
      console.log('finished quiz number', currentSubquizIndex);
      console.log('YOU FINISHED THANKS FOR PLAYING');

      // setCurrentSubquizIndex(currentSubquizIndex + 1)
      // setCurrentSubquizNoteIndex(0)
    }
  }

  const startGame = () => {
    setGameStarted(true);
    setGameFinished(false);
  }

  const endGame = () => {
    setGameFinished(true);
  }

  const playNotes = async () => {
    for (const note of props.quiz.quizzes[currentSubquizIndex]) {
      soundPlay(audioClips[note]);
      await sleepAsync(600);
    }
  }

  useEffect(() => {
    // console.log(subquizAttemptData);
  });

  return (
    <div>
      <button onClick={startGame}>Start game</button>
      <button onClick={playNotes}>Play notes</button>
      <h2>Round {currentSubquizIndex + 1}/{props.quiz.quizzes.length}</h2>
      <Piano
        notes={audioClips}
        sendNoteToGame={noteAttempt}
        quiz={props.quiz}
        />
      <h3>{gameFinished ? "Game finished" : null}</h3>
    </div>
  );
}


export default Game;
