import React from 'react';
import classes from './FinalScore.module.css';

const FinalScore = (props) => {
  const trueAnswers = props.attemptData.flat().filter(data => data.correct === true)
  const percentAccuracy = Math.round((trueAnswers.length / props.attemptData.flat().length) * 100, 1)
  const scoreDataDetails = props.attemptData.map((round, index) => {
    return (
      <div key={index} style={{margin: '0 24px'}}>
        <h3>Round {index + 1}</h3>
        {
          round.map((attempt, index) => {
            return (
              <p
                key={index}
                style={{textAlign: 'right', fontSize: 20}}
                >
                {attempt.note} : {attempt.correct ? "Success ✅" : "Failed 🚫"}
              </p>
            )
          })
        }
      </div>
    )
  })

  return (
    <div className={classes.FinalScore} onClick={props.click}>
      <div>
        <h2>Well done! You finished this quiz with <span>{percentAccuracy}%</span> accuracy.</h2>
        <div>
          {scoreDataDetails}
        </div>
        <p style={{fontSize: 16, color: 'rgba(160, 160, 160)'}}>Click anywhere to close this modal.</p>
      </div>
    </div>
  )
}

export default FinalScore;
