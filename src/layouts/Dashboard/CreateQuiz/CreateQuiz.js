import React, { useState, useEffect } from 'react';
import Piano from '../../../components/Piano/Piano';
import NoteCard from '../../../components/Quiz/NoteCard/NoteCard';
import loadDatabase from '../../../data/loadDatabase';
import loadRawDatabase from '../../../data/loadRawDatabase';

const QuizCreate = (props) => {
  const [value, setValue] = useState('');
  const [selectedSubquizNotes, setSelectedSubquizNotes] = useState([]);
  const [selectedQuizzes, setSelectedQuizzes] = useState([])
  const [inputData, setInputData] = useState({})
  const [submitClicked, setSubmitClicked] = useState(false)

  const addNote = (note) => {
    const id = selectedSubquizNotes.length;
    setSelectedSubquizNotes([
      ...selectedSubquizNotes,
      {
        id: id,
        note: note
      }
    ])
  }

  const removeNote = (note) => {
    setSelectedSubquizNotes(selectedSubquizNotes.filter((selectedNote) => {
      return selectedNote.id !== note.id
    }))
  }

  const handleInputName = (name) =>{
    setInputData({
      ...inputData,
      name: name
    })
  }

  const handleInputDifficulty = (difficulty) => {
    setInputData({
      ...inputData,
      difficulty: difficulty
    })
  }

  const notesArray = () => selectedSubquizNotes.map(ssn => ssn.note)

  const submitSet = (event, noteData) => {
    event.preventDefault();
    setSelectedQuizzes((prevState) => {
      return ([
        ...prevState,
        notesArray()
      ])
    })
  }

  const submitQuiz = (event, quizData) => {
    event.preventDefault();

    const finalQuizData = {
      name: inputData["name"],
      difficulty: inputData["difficulty"],
      quizzes: [...quizData["quizzes"], notesArray()]
    };

    (async () => {
      const RAW_DB = await loadRawDatabase()
      const tx = RAW_DB.transaction('store1', 'readwrite')
      const store = await tx.objectStore('store1')
      await store.put(finalQuizData, props.currentQuizzes.length)
      await tx.done
      await setTimeout(() => props.handleSubmit(), 300)
    })();

  }

  useEffect(() => {
    setSelectedSubquizNotes([]);
    console.log(selectedQuizzes);
  }, [selectedQuizzes])


  useEffect(() => {
    setInputData({
      ...inputData,
      quizzes: selectedQuizzes
    })
  }, [selectedSubquizNotes])

  useEffect(() => {
    console.log(props.currentQuizzes)
  })

  const noteCards = selectedSubquizNotes.map((selectedNote, i) => {
    return <NoteCard key={i} note={selectedNote.note} click={() => removeNote(selectedNote)} />
  })

  return (
    <div>
      <form>
        <label htmlFor="quiz-name">Quiz name:</label>
        <input
          onChange={(e) => handleInputName(e.target.value)}
          type="text"
          id="quiz-name"
          name="Quiz Name"
          placeholder="Enter quiz name..."/>
        <label htmlFor="lname">Difficulty:</label>
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
        <input type="submit" value="Next set" onClick={(event) => submitSet(event, selectedSubquizNotes)}/>
        <input type="submit" value="Submit" onClick={(event) => submitQuiz(event, inputData)}/>
      </form>

      {
        noteCards
      }

      <Piano form sendNoteToForm={addNote}/>

    </div>
  );
}

export default QuizCreate;
