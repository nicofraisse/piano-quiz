// Libraries
import React, { useState, useEffect } from 'react';

// Data
import loadDatabase from './data/loadDatabase';

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
  const [ database, setDatabase ] = useState(null);

  useEffect(() => {
    (async () => {
      setDatabase(await loadDatabase())
    })()
  }, [createQuizShowing])

  useEffect(() => {
    if (window.location.pathname[1] === "S") {
      setActiveQuiz(JSON.parse(decodeURIComponent(window.location.pathname.slice(2))))
    }
  }, [])

  const startQuiz = (quiz) => {
    setDashboardShowing(false);
    setActiveQuiz(quiz);
  }

  const handleQuizSubmit = (event) => {
    event.preventDefault();
  }

  const switchTab = () => {
    setCreateQuizShowing(!createQuizShowing)
  }

  return (
    <div className="App">
      <Navbar click={() => setDashboardShowing(!dashboardShowing)}/>
      <h1>Welcome to piano quiz</h1>

      {
        dashboardShowing ?
        <Dashboard
          quizData={database}
          showCreateQuiz={createQuizShowing}
          switchTab={switchTab}
          selectQuiz={quiz => startQuiz(quiz)}
          submitQuiz={(event) => handleQuizSubmit(event)} /> : null
      }

      {
        activeQuiz ?
        <Game quiz={activeQuiz} /> : null
      }

    </div>
  );
}

export default App;
