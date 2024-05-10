const bn10 = document.getElementById('bn10');
const bn20 = document.getElementById('bn20');
const bn30 = document.getElementById('bn30');

const forwardbtn = document.getElementById("forward");
const backwardbtn = document.getElementById("backward");

const verobtn = document.getElementById("vero");
const falsobtn = document.getElementById("falso");

const verifybtn = document.getElementById("verify");

bn10.addEventListener('click', () => updateButtons(1, 10));
bn20.addEventListener('click', () => updateButtons(11, 20));
bn30.addEventListener('click', () => updateButtons(21, 30));
forwardbtn.addEventListener('click', () => forward());
backwardbtn.addEventListener('click', () => backward());
verifybtn.addEventListener('click', () => verify(answers, userAnswersArray));

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
let userAnswersArray = new Array(30).fill(null);
fetch('assets/json/domande.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Check the JSON data here
    // Get a random sample of 30 questions from the data
    const { questions: randomQuestions, answers: randomAnswers } = getRandomQuestionsAndAnswers(data, 30);
    questions = randomQuestions;
    answers = randomAnswers;
    userAnswersArray = new Array(30).fill(null);
    // Do something with the random questions and answers
    console.log('Random Questions:', questions);

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
  const answers = selectedData.map(item => item.risposta === true);

  return { questions, answers };
}

let currentIndex;

function changeQuestion(N) {
  // Get the question at index N-1 from the questions array
  const question = questions[N - 1];

  currentIndex = N;

  // Display the question in an element with id "question"
  const questionElement = document.getElementById('question');
  questionElement.textContent = "" + currentIndex + ": " + question;
}

function changeTest(){
    fetch('assets/json/domande.json')
    .then(response => response.json())
    .then(data => {
      console.log(data); // Check the JSON data here
      // Get a random sample of 30 questions from the data
      const { questions: randomQuestions, answers: randomAnswers } = getRandomQuestionsAndAnswers(data, 30);
      questions = randomQuestions;
      answers = randomAnswers;
    
      userAnswersArray = new Array(30).fill(null);
      document.getElementById('errors').textContent = "";
      // Do something with the random questions and answers
      console.log('Random Questions:', questions);
  
      // Call the changeQuestion function to display the first question
      changeQuestion(1);
    })
    .catch(error => {
      console.error('Error fetching questions:', error);
    });
}

document.getElementById('generate').addEventListener('click', () => changeTest());

function forward(){
  if(currentIndex < 30){
    currentIndex++;
    changeQuestion(currentIndex);
  }
}

function backward(){
  if(currentIndex > 1){
    currentIndex--;
    changeQuestion(currentIndex);
  }
}
function vero(){
  userAnswersArray[currentIndex-1] = true;
  forward()
}
function falso(){
  userAnswersArray[currentIndex-1] = false;
  forward()
}

function verify(arr1, arr2) {
  let diffCount = 0;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      diffCount++;
    }
  }

  document.getElementById('errors').textContent = diffCount + "/30";
}