const bn10 = document.getElementById('bn10');
const bn20 = document.getElementById('bn20');
const bn30 = document.getElementById('bn30');

bn10.addEventListener('click', () => updateButtons(1, 10));
bn20.addEventListener('click', () => updateButtons(11, 20));
bn30.addEventListener('click', () => updateButtons(21, 30));

// Function to update the buttons in the second row
function updateButtons(start, end) {
  const buttonRow = document.querySelector('.button-row');
  const buttons = buttonRow.querySelectorAll('button');

  buttons.forEach((button, index) => {
    const buttonNumber = start + index;
    button.textContent = buttonNumber;
    button.id = `q${buttonNumber}`;
    button.addEventListener("click", function() {
      const buttonNumber = parseInt(button.textContent);
      changeQuestion(buttonNumber);
    });
  });
}

let questions, answers;

fetch('assets/domande.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Check the JSON data here
    // Get a random sample of 30 questions from the data
    const { questions: randomQuestions, answers: randomAnswers } = getRandomQuestionsAndAnswers(data, 30);
    questions = randomQuestions;
    answers = randomAnswers;

    // Do something with the random questions and answers
    console.log('Random Questions:', questions);
    console.log('Corresponding Answers:', answers);

    // Call the changeQuestion function to display the first question
    changeQuestion(1);
  })
  .catch(error => {
    console.error('Error fetching questions:', error);
  });

function getRandomQuestionsAndAnswers(data, count) {
  // Shuffle the data array
  const shuffledData = data.sort(() => Math.random() - 0.5);

  // Get the first 'count' number of questions and answers
  const selectedData = shuffledData.slice(0, count);

  // Separate questions and answers into two arrays
  const questions = selectedData.map(item => item.domanda);
  const answers = selectedData.map(item => item.risposta === 'Vero');

  return { questions, answers };
}

function changeQuestion(N) {
  // Get the question at index N-1 from the questions array
  const question = questions[N - 1];

  // Display the question in an element with id "question"
  const questionElement = document.getElementById('question');
  questionElement.textContent = question;
}

function changeTest(){
    fetch('assets/domande.json')
    .then(response => response.json())
    .then(data => {
      console.log(data); // Check the JSON data here
      // Get a random sample of 30 questions from the data
      const { questions: randomQuestions, answers: randomAnswers } = getRandomQuestionsAndAnswers(data, 30);
      questions = randomQuestions;
      answers = randomAnswers;
  
      // Do something with the random questions and answers
      console.log('Random Questions:', questions);
      console.log('Corresponding Answers:', answers);
  
      // Call the changeQuestion function to display the first question
      changeQuestion(1);
    })
    .catch(error => {
      console.error('Error fetching questions:', error);
    });
}

document.getElementById('generate').addEventListener('click', () => changeTest());
