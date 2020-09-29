import React from 'react';
import classes from './Dashboard.module.css';
import QuizCreate from '../../components/Quiz/QuizCreate/QuizCreate';
import QuizCard from '../../components/Quiz/QuizCards/QuizCard/QuizCard';

const Dashboard = (props) => {
  console.log(props.quizData)
  const quizCards = props.quizData.map((quiz, index) => {
    return <QuizCard
            key={index}
            quiz={quiz}
            click={() => props.selectQuiz(quiz)}/>
  });

  return (
    <div className={classes.Dashboard}>
      { props.show ?
        <QuizCreate click={props.submitQuiz} />
        :
        <div>
          { quizCards }
          <div onClick={props.click}>Create quiz</div>
        </div>
      }
      <div onClick={props.click}>Back</div>
    </div>
  );
}

export default Dashboard;
