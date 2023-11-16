// Question Types
// 1. MCQs | Multiple Choice | single
// 2. boolean | true/false | single
// 3. MAQs | Multiple Answers | multiple

import { Topic } from '.'

export const javascript: Topic = {
  topic: 'Javascript',
  level: 'Beginner',
  totalQuestions: 14,
  totalScore: 125,
  totalTime: 240,
  questions: [
    {
      question:
        'Which of the following are JavaScript data types? (Select all that apply)',
      choices: ['String', 'Number', 'Function', 'Array'],
      isMulti: true,
      correctAnswers: ['String', 'Number', 'Array'],
      score: 10,
    },
    {
      question: 'The "this" keyword in JavaScript refers to the current function.',
      choices: ['True', 'False'],
      isMulti: false,
      correctAnswers: ['False'],
      score: 5,
    },
    {
      question: 'Which operator is used for strict equality comparison in JavaScript?',
      choices: ['==', '===', '=', '!='],
      isMulti: false,
      correctAnswers: ['==='],
      score: 10,
    },
    {
      question:
        'Which of the following methods is used to add an element to the end of an array in JavaScript?',
      choices: ['push()', 'pop()', 'shift()', 'unshift()'],
      isMulti: false,
      correctAnswers: ['push()'],
      score: 10,
    },
    {
      question: 'What is the value of x after executing the following code snippet?',
      code: `let x = 5;
x += 2;
x *= 3;`,
      choices: ['21', '25', '33', '35'],
      isMulti: false,
      correctAnswers: ['25'],
      score: 10,
    },
    {
      question: 'What is the output of the following code snippet?',
      code: `console.log(typeof null);`,
      choices: ['Object', 'Null', 'Undefined', 'NullObject'],
      isMulti: false,
      correctAnswers: ['Object'],
      score: 10,
    },
    {
      question: 'Which of the following is NOT a valid JavaScript variable name?',
      choices: ['myVariable', '_variable', '123variable', '$variable'],
      isMulti: false,
      correctAnswers: ['123variable'],
      score: 10,
    },
    {
      question:
        'Which of the following methods is used to remove the last element from an array in JavaScript?',
      choices: ['push()', 'pop()', 'shift()', 'unshift()'],
      isMulti: false,
      correctAnswers: ['pop()'],
      score: 10,
    },
    {
      question: 'JavaScript is a case-sensitive language.',
      choices: ['True', 'False'],
      isMulti: false,
      correctAnswers: ['True'],
      score: 5,
    },
    {
      question: 'What is the output of the following code snippet?',
      code: `console.log(2 + '2');`,
      choices: ['4', '22', '24', "'22'"],
      isMulti: false,
      correctAnswers: ['22'],
      score: 10,
    },
    {
      question: 'Which of the following is NOT a JavaScript data type?',
      choices: ['String', 'Boolean', 'Integer', 'Object'],
      isMulti: false,
      correctAnswers: ['Integer'],
      score: 10,
    },
    {
      question:
        'Which of the following are valid JavaScript loop statements? (Select all that apply)',
      choices: ['for', 'while', 'loop', 'do...while'],
      isMulti: true,
      correctAnswers: ['for', 'while', 'do...while'],
      score: 10,
    },
    {
      question: 'JavaScript is a statically typed language.',
      choices: ['True', 'False'],
      isMulti: false,
      correctAnswers: ['False'],
      score: 5,
    },
    {
      question:
        'Which of the following is a valid way to comment a single line in JavaScript?',
      choices: [
        '// This is a comment',
        '/* This is a comment */',
        '<!-- This is a comment -->',
        '# This is a comment',
      ],
      isMulti: false,
      correctAnswers: ['// This is a comment'],
      score: 10,
    },
  ],
}
