import React, { useState } from 'react';
import Piano from '../components/Piano';

// const quizAnswerData = [
//   {
//     attempts: 2, // 0 if passed
//     hints: ["show notes"]
//   }
// ]



const PianoQuiz = (props) => {
  return (
    <Piano quiz={props.quiz} />
  )
}


export default PianoQuiz;
