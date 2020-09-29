import React, { useState } from 'react';
import Piano from '../../components/Piano/Piano';

// const quizAnswerData = [
//   {
//     attempts: 2, // 0 if passed
//     hints: ["show notes"]
//   }
// ]



const PianoQuiz = (props) => {
  return (
    <div><Piano quiz={props.quiz} /></div>
  )
}


export default PianoQuiz;
