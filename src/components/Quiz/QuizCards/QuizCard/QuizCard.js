import React, { useState } from 'react'

// Stylesheets
import classes from './QuizCard.module.css'

const QuizCard = (props) => {
  const [shareClicked, setShareClicked] = useState(false)
  const clickShare = () => {
    setShareClicked(true)
    props.shareQuiz()
  }
  return (
    <div className={classes.QuizCard}>
      <h3 className={classes.QuizName}>{props.quiz.name}</h3>
      <div
        onClick={props.selectQuiz}
        className={classes.InvisibleClickable}
      ></div>
      <div>
        <span className={classes.Difficulty}>
          {'👂'.repeat(props.quiz.difficulty)}
        </span>
        {shareClicked ? (
          <span className={classes.AddClipboardMsg}>
            Link copied to clipboard!
          </span>
        ) : (
          <span className={classes.Share} onClick={clickShare}>
            <i class='fas fa-share'></i>
          </span>
        )}
      </div>
    </div>
  )
}

export default QuizCard
