const defaultQuiz = [
  {
    name: "Warmup quiz with just 1 note per round",
    difficulty: 1,
    quizzes: [
      ["C2"],
      ["A1"],
      ["E2"]
    ]
  },
  {
    name: "Beginner quiz, white keys only",
    difficulty: 1,
    quizzes: [
      ["C1", "D1", "E1"],
      ["C2", "D2", "E2"]
    ]
  },
  {
    name: "Quite bizarre melodies",
    difficulty: 2,
    quizzes: [
      ["F#2", "F#1", "A2"],
      ["A1", "D2", "C3"],
      ["A#2", "C#1", "C2", "E1"]
    ]
  },
  {
    name: "Your ears will likely suffer",
    difficulty: 4,
    quizzes: [
      ["F#2", "F#1", "A2"],
      ["D1", "C2", "E1", "F#1"],
      ["D1", "C#1", "E1", "F#1", "F#1"],
    ]
  }
];

export default defaultQuiz;
