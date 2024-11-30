// API URLs
const factsApiUrl = 'https://uselessfacts.jsph.pl/api/v2/facts/random';
const triviaApiUrl = 'https://opentdb.com/api.php?amount=10';

// Button to trigger loading of facts and trivia
document.getElementById('load-button').addEventListener('click', loadData);

// Button to show the answer for trivia questions
document.getElementById('show-answer-btn').addEventListener('click', showAnswer);

let triviaData = [];
let currentTriviaIndex = 0;