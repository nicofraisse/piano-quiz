import React from 'react';

const QuizCard = (props) => {
  return (
    <div>
      <span onClick={props.selectQuiz}>{props.quiz.name} </span>|
       <span onClick={props.shareQuiz}> share</span>
    </div>
  );
}

export default QuizCard;
