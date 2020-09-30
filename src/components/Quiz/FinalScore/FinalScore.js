import React from 'react';

const FinalScore = (props) => {
  const trueAnswers = props.attemptData.flat().filter(data => data.correct === true)
  const percentAccuracy = Math.round((trueAnswers.length / props.attemptData.flat().length) * 100, 1)

  const scoreDataDetails = props.attemptData.map((round, index) => {
    return (
      <div key={index}>
        <h3>Round {index}</h3>
        {
          round.map((attempt, index) => {
            return (
              <p key={index}>{attempt.note} : {attempt.correct ? "Success" : "Failed"}</p>
            )
          })
        }
      </div>
    )
  })

  console.log(props.attemptData)
  console.log(trueAnswers)
  return (
    <div>
      Well done! You finished this quiz with {percentAccuracy}% accuracy.
      {scoreDataDetails}
    </div>
  )
}

export default FinalScore;
