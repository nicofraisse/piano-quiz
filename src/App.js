// Libraries
import React, { useState } from 'react';

// Data
import defaultQuiz from './data/defaultQuiz';

// Layouts
import Game from './layouts/Game/Game';
import Dashboard from './layouts/Dashboard/Dashboard';

// Components
import Navbar from './components/UI/Navbar/Navbar';

// Stylesheets
import './App.css';


const App = () => {
  const [ dashboardShowing, setDashboardShowing ] = useState(false);
  const [ createQuizShowing, setCreateQuizShowing ] = useState(false);
  const [ activeQuiz, setActiveQuiz ] = useState(null);

  const startQuiz = (quiz) => {
    setDashboardShowing(false);
    setActiveQuiz(quiz);
    console.log(quiz);
  }

  const handleQuizSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  }

  return (
    <div className="App">
      <Navbar click={() => setDashboardShowing(!dashboardShowing)}/>

      {
        dashboardShowing ?
        <Dashboard
        quizData={defaultQuiz}
        show={createQuizShowing}
        click={() => setCreateQuizShowing(!createQuizShowing)}
        selectQuiz={quiz => startQuiz(quiz)}
        submitQuiz={(event) => handleQuizSubmit(event)}/> : null
      }

      <h1>Welcome to piano quiz</h1>

      {
        activeQuiz ?
        <Game quiz={activeQuiz}/> : null
      }

    </div>
  );
}

export default App;
