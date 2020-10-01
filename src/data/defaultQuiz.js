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
      ["F#2", "F#1"],
      ["D1", "D#1", "E1"],
      ["G2", "E2", "C#2"]
    ]
  },
  {
    name: "Your ears will likely suffer",
    difficulty: 4,
    quizzes: [
      ["F#2", "A1", "A#2"],
      ["D1", "C2", "E1", "F#1"],
      ["C#1", "E2", "F#2", "G#1"],
    ]
  }
];

export default defaultQuiz;
