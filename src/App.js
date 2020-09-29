import React, { useState } from 'react';
import './App.css';
import Navbar from './components/UI/Navbar/Navbar';
import QuizCard from './components/QuizCard';
import CreateQuiz from './components/CreateQuiz';
import PianoQuiz from './layouts/PianoQuiz';
import classes from './App.module.css';
import defaultQuiz from './data/defaultQuiz';


// import Dashboard from './layouts/Dashboard.js'

// const quiz_data = [
//   {
//     name: "Easy quiz",
//     quizzes: [
//       ["C1", "D1", "E1"],
//       ["C2", "D2", "E2"]
//     ],
//   }
// ]

const App = () => {
  const [ dashboardShowing, setDashboardShowing ] = useState(true)
  const [ createQuizShowing, setCreateQuizShowing ] = useState(false)
  const [ activeQuiz, setActiveQuiz ] = useState(null)

  const startQuiz = (quiz) => {
    setDashboardShowing(false)
    setActiveQuiz(quiz)
    console.log(quiz)
  }

  const handleQuizSubmit = (event) => {
    event.preventDefault()
    console.log(event)
  }

  const quizCards = defaultQuiz.map((quiz, index) => {
    return <QuizCard
            key={index}
            quiz={quiz}
            click={e => startQuiz(quiz)}/>
  })

  const dashboard = (
    <div className={classes.Dashboard}>
      { createQuizShowing ?
        <CreateQuiz click={handleQuizSubmit} />
        :
        <div>
          { quizCards }
          <div onClick={() => setCreateQuizShowing(!createQuizShowing)}>Create quiz</div>
        </div>
      }
      <div onClick={() => setCreateQuizShowing(!createQuizShowing)}>Back</div>

    </div>
  )

  return (
    <div className="App">
      <Navbar click={() => setDashboardShowing(!dashboardShowing)}/>
      { dashboardShowing ? dashboard : null }


      <h1>Welcome to piano quiz</h1>
      { activeQuiz ? <PianoQuiz quiz={activeQuiz}/> : null }
    </div>
  );
}

export default App;
