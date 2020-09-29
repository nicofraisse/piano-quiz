import React, { useState } from 'react';


// WIP
const QuizCreate = (props) => {
  const [value, setValue] = useState('');

  const handleInputName = (v) =>{
    setValue(v)
  }

  const handleInputDifficulty = () => {

  }

  console.log(value);

  return (
    <form>
      <label htmlFor="quiz-name">Quiz name:</label>
      <input
        onChange={(e) => handleInputName(e.target.value)}
        type="text"
        id="quiz-name"
        name="Quiz Name"
        placeholder="Enter quiz name..."/>
      <label htmlFor="lname">Last name:</label>
      <select
        name="Quiz Difficulty"
        id="quiz-difficulty"
        onChange={(e) => handleInputDifficulty(e.target.value)}>
        <option value="1">Easy</option>
        <option value="2">Medium</option>
        <option value="3">Difficult</option>
        <option value="4">Expert</option>
      </select>
      <div>notes</div>
      <input type="submit" value="Submit" onClick={(value) => props.click(value)}/>
    </form>
  );
}


export default QuizCreate;
