// API URLs
const factsApiUrl = 'https://uselessfacts.jsph.pl/api/v2/facts/random';
const triviaApiUrl = 'https://opentdb.com/api.php?amount=50';

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

