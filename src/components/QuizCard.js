import React from 'react';

const QuizCard = (props) => {
  return (
    <div onClick={props.click}>
      {props.quiz.name}
    </div>
  )
}

export default QuizCard;
