import React from 'react';
import classes from './Dashboard.module.css';
import CreateQuiz from './CreateQuiz/CreateQuiz';
import ChooseQuiz from './ChooseQuiz/ChooseQuiz';
import QuizCards from '../../components/Quiz/QuizCards/QuizCards';

const Dashboard = (props) => {
  return (
    <div className={classes.Dashboard}>
      { props.showCreateQuiz
        ?
        <CreateQuiz click={props.submitQuiz} />
        :
        <ChooseQuiz
          quizzes={props.quizData}
          clickOnQuiz={props.selectQuiz}
          createQuiz={props.click} />
      }
      <div onClick={props.click}>Back</div>
    </div>
  );
}

export default Dashboard;
