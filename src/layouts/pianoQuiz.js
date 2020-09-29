import React, { useState } from 'react';
import Piano from '../components/piano';

const quizAnswerData = [
  {
    attempts: 2, // 0 if passed
    hints: ["show notes"]
  }
]

const quiz_data = [
  {
    name: "Easy quiz",
    quizzes: [
      ["C1", "D1", "E1"],
      ["C2", "D2", "E2"]
    ]
  }
]

const PianoQuiz = (quiz) => {
  return (
    <Piano quiz={quiz_data[0]} />
  )
}


export default PianoQuiz;
