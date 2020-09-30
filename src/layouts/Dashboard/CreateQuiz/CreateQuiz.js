import React, { useState, useEffect } from 'react';
import Piano from '../../../components/Piano/Piano';
import NoteCard from '../../../components/Quiz/NoteCard/NoteCard';
import loadDatabase from '../../../data/loadDatabase';
import loadRawDatabase from '../../../data/loadRawDatabase';
import classes from './CreateQuiz.module.css'

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
    // console.log('inputdata', inputData)


  })


  let oldNoteCards = null
  if (inputData.quizzes) {

    oldNoteCards = inputData.quizzes.map((quiz, setIndex) => {
      return quiz.map((selectedNote, i) => {
          return (
            <NoteCard
              key={i}
              colorCode={setIndex}
              note={selectedNote}
              click={() => removeNote(selectedNote)} />
          );
      })
    })
  }

  const noteCards = selectedSubquizNotes.map((selectedNote, i) => {
    return <NoteCard
              key={i}
              note={selectedNote.note}
              click={() => removeNote(selectedNote)} />
  })

  return (
    <div className={classes.CreateQuiz}>
      <h1>Create a new quiz</h1>

      <div className={classes.FlexLayout}>
        <form>
          <label htmlFor="quiz-name">Quiz name:</label>
          <input
            onChange={(e) => handleInputName(e.target.value)}
            type="text"
            id="quiz-name"
            name="Quiz Name"
            placeholder="Enter quiz name..."
            className={classes.Input} />
          <label htmlFor="lname">Difficulty:</label>
          <select
            name="Quiz Difficulty"
            id="quiz-difficulty"
            onChange={(e) => handleInputDifficulty(e.target.value)}
            className={classes.Input}>
            <option value="1">Easy</option>
            <option value="2">Medium</option>
            <option value="3">Difficult</option>
            <option value="4">Expert</option>
          </select>
          <p>Create sets of notes by playing on the piano below. After each set, press "Next Set". When you're done, press "Submit"!</p>
          <div className={classes.Buttons}>
            <input type="submit" value="Next set" className={classes.SubmitNotes} onClick={(event) => submitSet(event, selectedSubquizNotes)}/>
            <input type="submit" value="Submit" className={classes.SubmitQuiz} onClick={(event) => submitQuiz(event, inputData)}/>
          </div>
        </form>
        <div className={classes.SelectedNotes}>
          {
            oldNoteCards
          }
          {
            noteCards
          }
        </div>
      </div>

      <Piano form sendNoteToForm={addNote}/>

    </div>
  );
}

export default QuizCreate;
