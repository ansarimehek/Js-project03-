const quizData = [
    {
        question: 'Which of the following is uesd to define the style of a web page?',
        options: ['HTML', 'CSS', 'JS', 'SQL'],
        answer: 'CSS',
    },
    {
        question: 'Which HTML tag is used to create a hyperlink?',
        options: ['<link>', '<href>', '<a>', '<button>'],
        answer: '<a>',
    },
    {
        question: 'Which of the following is JS framework?',
        options: ['Angular JS', 'Django', 'Flask', 'Laravel'],
        answer: 'Angular JS',
    },
    {
        question: 'What does the <canvas> element in HTML5 allow you to do?',
        options: ['Embed videos', 'Create tables', 'Draw graphicson a web page', 'Display images'],
        answer: 'Draw graphicson a web page',
    },
    {
        question: 'What does the box-shadow property in css do?',
        options: [
            'Creates a shadow around an elements content',
            'Creates a shadow around an elements border',
            'Creates a shadow behind an element',

        ],
        answer: 'Creates a shadow around an elements border',
    },
    {
        question: 'Which event occurs when the user clicks on a HTML element?',
        options: ['Onchange', 'Onclick', 'Onmouseclick', 'Onmouseover'],
        answer: 'Onclick',
    },
    {
        question: 'What will the foll code return: Boolean(10>9)?',
        options: [
            'TRUE',
            'FALSE',
            'NaN',
            'Undefine',
        ],
        answer: 'TRUE',
    },
    {
        question: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Venus', 'Mercury', 'Uranus'],
        answer: 'Mars',
    },
    {
        question: 'Which of the following is a ternary operator in JS?',
        options: [
            '?',
            '??',
            '?.',

        ],
        answer: '?',
    },
    {
        question: 'What will be the result of 2+"2" in JS?',
        options: ['4', '22', 'NaN', 'Undefine'],
        answer: '22',
    },
    {
        question: 'What is the purpose of the <meta charset="UTF-8"> tag in HTML?',
        options: ['To define the character encoding for the documents',
            'To include metadata such as author and description',
            'To set the viewport for mobile devices',
            'To link external CSS Or CSS JS'],
        answer: 'To define the character encoding for the documents',
    },
    {
        question: 'Which of the following HTML element is not supported in HTML5?',
        options: ['<video>', '<canva>', '<article>', '<marquee>',],
        answer: '<marquee>',
    },


];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestion].answer) {
            score++;
        } else {
            incorrectAnswers.push({
                question: quizData[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: quizData[currentQuestion].answer,
            });
        }
        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
}

function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          `;
    }

    resultContainer.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <p>You scored ${score} out of ${quizData.length}!</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <p>Incorrect Answers:</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ${incorrectAnswersHtml}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
