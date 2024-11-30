// API URLs
const factsApiUrl = 'https://uselessfacts.jsph.pl/api/v2/facts/random';
const triviaApiUrl = 'https://opentdb.com/api.php?amount=50';  // 50 trivia questions

// Button to trigger loading of facts and trivia
document.getElementById('load-button').addEventListener('click', loadData);

// Button to show the answer for trivia questions
document.getElementById('show-answer-btn').addEventListener('click', showAnswer);

let triviaData = [];
let currentTriviaIndex = 0;

// Function to load both Random Facts and Trivia Questions
async function loadData() {
    // Call both fetch functions in parallel using Promise.all
    await Promise.all([fetchFacts(), fetchTrivia()]);
}

// Function to fetch Random Facts
async function fetchFacts() {
    try {
        const response = await fetch(factsApiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch random fact');
        }
        const data = await response.json();
        console.log('Random Fact:', data);
        displayFacts(data);
    } catch (error) {
        console.error('Error fetching Random Fact:', error);
        document.getElementById('facts-list').innerHTML = '<li>Error loading. Please wait for a while and then press the load button.</li>';
    }
}

// Function to display Random Facts
function displayFacts(fact) {
    const factsList = document.getElementById('facts-list');
    factsList.innerHTML = '';  // Clear the existing facts

    // Add a new fact to the list
    const factItem = document.createElement('li');
    factItem.textContent = fact.text;
    factsList.appendChild(factItem);
}

// Function to fetch Trivia Questions
async function fetchTrivia() {
    try {
        const response = await fetch(triviaApiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch trivia questions');
        }
        const data = await response.json();
        console.log('Trivia Questions:', data);
        triviaData = data.results; // Store trivia questions in a global variable
        currentTriviaIndex = 0; // Reset trivia index to 0 for a fresh start
        displayNextTriviaQuestion(); // Display the first trivia question
    } catch (error) {
        console.error('Error fetching Trivia Questions:', error);
        document.getElementById('trivia-question').innerHTML = '<p>Error loading. Please wait for a while and then press the load button.</p>';

        // Hide the "Show Answer" button in case of an error
        document.getElementById('show-answer-btn').style.display = 'none';
    }
}

// Function to display the next trivia question
function displayNextTriviaQuestion() {
    if (triviaData.length === 0) {
        console.log('No trivia questions available');
        return;
    }

    if (currentTriviaIndex < triviaData.length) {
        const triviaQuestionElement = document.getElementById('trivia-question');
        const currentQuestion = triviaData[currentTriviaIndex];

        triviaQuestionElement.innerHTML = `
            <strong>Question:</strong> ${currentQuestion.question}
        `;

        // Show the "Show Answer" button
        document.getElementById('show-answer-btn').style.display = 'inline-block';
        document.getElementById('show-answer-btn').dataset.answer = currentQuestion.correct_answer;

        // Hide the answer initially
        document.getElementById('show-answer-btn').style.display = 'inline-block';
    } else {
        document.getElementById('trivia-question').innerHTML = 'No more trivia questions available.';
    }
}

// Function to show the answer for the trivia question
function showAnswer() {
    const answer = document.getElementById('show-answer-btn').dataset.answer;
    const triviaQuestionElement = document.getElementById('trivia-question');

    triviaQuestionElement.innerHTML += `
        <br><strong>Answer:</strong> ${answer}
    `;

    // Hide the button after showing the answer
    document.getElementById('show-answer-btn').style.display = 'none';

    // Increment the trivia index to show the next question on next button click
    currentTriviaIndex++;
}