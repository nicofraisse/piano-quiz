import React from 'react';
import logo from './logo.svg';
import './App.css';
import Piano from './components/piano.js';
import PianoQuiz from './layouts/pianoQuiz.js'

const QUIZZES = [
  {
    name: "Single notes - easy",
    notes: ["C1", "D3", "F#2"],
    speed: "1"
  },
]


function App() {
  return (
    <div className="App">
      <h1>Welcome to piano quiz</h1>
      <PianoQuiz quiz={QUIZZES[0]} />
    </div>
  );
}

export default App;
