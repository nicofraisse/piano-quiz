import React from 'react';
import QuizCard from './QuizCard/QuizCard';
import copyToClipboard from '../../../util/copyToClipboard';

const QuizCards = (props) => {
  const shareQuiz = (quiz) => {
    const encodedURL = encodeURIComponent(JSON.stringify(quiz));
    const encodedQuizURL = window.location.href + "S" + encodedURL;
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
