import React, { useState } from 'react';
import classes from './Dashboard.module.css';
import CreateQuiz from './CreateQuiz/CreateQuiz';
import ChooseQuiz from './ChooseQuiz/ChooseQuiz';
import QuizCards from '../../components/Quiz/QuizCards/QuizCards';

const Dashboard = (props) => {
  return (
    <div className={classes.Dashboard}>
      {
        props.showCreateQuiz
        ?
        <div>
          <CreateQuiz
            click={props.submitQuiz}
            currentQuizzes={props.quizData}
            handleSubmit={props.switchTab}/>
          <div className={classes.Back} onClick={props.switchTab}><i class="far fa-times-circle"></i> cancel</div>
        </div>
        :
        <div>
          <h1>Which quiz would you like to play?</h1>
          <ChooseQuiz
            quizzes={props.quizData}
            clickOnQuiz={props.selectQuiz}
            createQuiz={props.switchTab} />
        </div>
      }
    </div>
  );
}

export default Dashboard;
