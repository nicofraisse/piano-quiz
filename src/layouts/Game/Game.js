// Libraries
import React, { useState, useEffect } from 'react';

// Utility functions
import soundPlay from '../../util/soundPlay';
import sleepAsync from '../../util/sleepAsync';

// Components
import Piano from '../../components/Piano/Piano';
import FinalScore from '../../components/Quiz/FinalScore/FinalScore';

// Data
import audioClips from '../../data/audioClips';


const Game = (props) => {
  const [ gameFinished, setGameFinished ] = useState(false);
  const [ quizAttemptData, setQuizAttemptData ] = useState([])
  const [ subquizAttemptData, setSubquizAttemptData ] = useState([]);
  const [ currentSubquizIndex, setCurrentSubquizIndex ] = useState(0);
  const [ currentSubquizNoteIndex, setCurrentSubquizNoteIndex ] = useState(0);

  const noteAttempt = (note) => {
    console.log(props.quiz)

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
      setCurrentSubquizNoteIndex(currentSubquizNoteIndex + 1);
    }
    // console.log(currentSubquizIndex, props.quiz.quizzes.length);

    // Go to the next subquiz when the user finishes the subquiz
    if (note === props.quiz.quizzes[currentSubquizIndex][currentSubquizNoteIndex] &&
        currentSubquizNoteIndex === props.quiz.quizzes[currentSubquizIndex].length - 1 &&
        currentSubquizIndex !== props.quiz.quizzes.length - 1) {
      setCurrentSubquizIndex(currentSubquizIndex + 1);
      setQuizAttemptData(prev => [
        ...prev,
        [
          ...subquizAttemptData,
          {
            note: note,
            correct: note === props.quiz.quizzes[currentSubquizIndex][currentSubquizNoteIndex],
            timestamp: new Date()
          }
        ]
      ])
      setCurrentSubquizNoteIndex(0);
    }

    // Manage end of the game
    if (note === props.quiz.quizzes[currentSubquizIndex][currentSubquizNoteIndex] &&
        currentSubquizNoteIndex === props.quiz.quizzes[currentSubquizIndex].length - 1 &&
        currentSubquizIndex === props.quiz.quizzes.length - 1) {
      setQuizAttemptData(prev => [
        ...prev,
        [
          ...subquizAttemptData,
          {
            note: note,
            correct: note === props.quiz.quizzes[currentSubquizIndex][currentSubquizNoteIndex],
            timestamp: new Date()
          }
        ]
      ])
      endGame();
    }
  }

  const startGame = () => {
    setQuizAttemptData([])
    setGameFinished(false);
    setCurrentSubquizIndex(0);
    setCurrentSubquizNoteIndex(0);
    setSubquizAttemptData([0])
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
    startGame()
  }, [props.quiz]);

  useEffect(() => {
    setSubquizAttemptData([])
  }, [quizAttemptData])


  return (
    <div>
      <button onClick={startGame}>Restart game</button>
      <button onClick={playNotes}>Play notes</button>
      <h2>Round {currentSubquizIndex + 1}/{props.quiz.quizzes.length}</h2>
      <Piano
        notes={audioClips}
        sendNoteToGame={noteAttempt}
        quiz={props.quiz}
        />
      {
        gameFinished ? <FinalScore attemptData={quizAttemptData}/>
        :
        null
      }

    </div>
  );
}

export default Game;
