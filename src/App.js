// Libraries
import React, { useState, useEffect } from 'react';

// Data
import loadDatabase from './data/loadDatabase';

// Layouts
import Game from './layouts/Game/Game';
import Dashboard from './layouts/Dashboard/Dashboard';
import LandingPage from './layouts/LandingPage/LandingPage';
import Freeplay from './layouts/Freeplay/Freeplay';

// Components
import Navbar from './components/UI/Navbar/Navbar';

// Stylesheets
import './App.css';

const App = () => {
  const [ dashboardShowing, setDashboardShowing ] = useState(false);
  const [ freeplayShowing, setFreeplayShowing ] = useState(false);
  const [ createQuizShowing, setCreateQuizShowing ] = useState(false);
  const [ activeQuiz, setActiveQuiz ] = useState(null);
  const [ database, setDatabase ] = useState(null);

  useEffect(() => {
    (async () => {
      setDatabase(await loadDatabase());
    })()
  }, [createQuizShowing]);

  useEffect(() => {
    if (window.location.pathname[1] === "S") {
      setActiveQuiz(JSON.parse(decodeURIComponent(window.location.pathname.slice(2))));
    }
  }, []);

  const startQuiz = (quiz) => {
    setDashboardShowing(false);
    setActiveQuiz(quiz);
  }

  const handleQuizSubmit = (event) => {
    event.preventDefault();
  }

  const switchTab = () => {
    setCreateQuizShowing(!createQuizShowing);
  }

  const showDashboard = () => {
    setDashboardShowing(true)
    setFreeplayShowing(false)
    setActiveQuiz(null)
  }

  const showFreeplay = () => {
    setDashboardShowing(false)
    setFreeplayShowing(true)
    setActiveQuiz(null)
  }

  const showLandingPage = () => {
    setDashboardShowing(false)
    setFreeplayShowing(false)
    setActiveQuiz(null)
  }

  return (
    <div className="App">
      <Navbar
      toggleDashboard={showDashboard}
      toggleFreeplay={showFreeplay}
      logoClick={showLandingPage}
      />

      {
        (!freeplayShowing) && (!dashboardShowing) && (!activeQuiz) ?
        <LandingPage click={showDashboard} /> : null
      }

      {
        freeplayShowing ? <Freeplay /> : null
      }

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




















