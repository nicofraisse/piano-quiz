// Libraries
import React from 'react';

// Components
import QuizCard from './QuizCard/QuizCard';

// Helper functions
import copyToClipboard from '../../../util/copyToClipboard';

// Stylesheets
import classes from './QuizCards.module.css';

const QuizCards = (props) => {
  const shareQuiz = (quiz) => {
    const encodedURL = encodeURIComponent(JSON.stringify(quiz));
    const encodedQuizURL = window.location.origin + "/S" + encodedURL;
    copyToClipboard(encodedQuizURL);
  }
  return props.quizzes.map((quiz, index) => {
    return <QuizCard
            key={index}
            quiz={quiz}
            selectQuiz={() => props.clickOnQuiz(quiz)}
            shareQuiz={() => shareQuiz(quiz)} />
  });
}

export default QuizCards;
