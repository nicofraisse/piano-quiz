import React from 'react';
import QuizCard from './QuizCard/QuizCard'

const QuizCards = (props) => {
  return props.quizzes.map((quiz, index) => {
    return <QuizCard
            key={index}
            quiz={quiz}
            click={() => props.clickOnQuiz(quiz)}/>
  });
}

export default QuizCards;
