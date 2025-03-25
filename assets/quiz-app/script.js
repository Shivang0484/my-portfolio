const allQuestions = [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
    { question: "Which language runs in a web browser?", options: ["Java", "C", "Python", "JavaScript"], answer: "JavaScript" },
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"], answer: "Hyper Text Markup Language" },
    { question: "Which symbol is used for comments in JavaScript?", options: ["//", "/* */", "#", "--"], answer: "//" },
    { question: "What is the full form of CSS?", options: ["Cascading Style Sheet", "Creative Style System", "Computer Style Sheet", "Colorful Style Sheet"], answer: "Cascading Style Sheet" },
    { question: "Which HTML tag is used for inserting a line break?", options: ["<br>", "<break>", "<lb>", "<hr>"], answer: "<br>" },
    { question: "What year was JavaScript created?", options: ["1995", "2000", "1989", "1998"], answer: "1995" },
    { question: "Which company developed JavaScript?", options: ["Google", "Microsoft", "Sun Microsystems", "Netscape"], answer: "Netscape" },
    { question: "Which of these is not a programming language?", options: ["Python", "Java", "HTML", "C++"], answer: "HTML" },
    { question: "What is the correct way to declare a variable in JavaScript?", options: ["var x = 10;", "variable x = 10;", "int x = 10;", "let x = 10;"], answer: "let x = 10;" },
    { question: "Which of the following is a JavaScript framework?", options: ["Django", "Flask", "React", "Laravel"], answer: "React" },
    { question: "What does SQL stand for?", options: ["Structured Query Language", "Sequential Query Language", "Standard Query Language", "Software Query Language"], answer: "Structured Query Language" },
    { question: "Which tag is used to create a hyperlink in HTML?", options: ["<a>", "<link>", "<href>", "<url>"], answer: "<a>" },
    { question: "Which property is used to change text color in CSS?", options: ["text-color", "fgcolor", "color", "font-color"], answer: "color" },
    { question: "What does 'DOM' stand for in JavaScript?", options: ["Document Object Model", "Data Object Management", "Document Order Model", "Dynamic Output Model"], answer: "Document Object Model" },
    { question: "Which of these is not a valid JavaScript data type?", options: ["String", "Boolean", "Float", "Object"], answer: "Float" },
    { question: "What is the default port for HTTP?", options: ["80", "443", "21", "22"], answer: "80" },
    { question: "Which method is used to remove the last element from an array in JavaScript?", options: ["pop()", "push()", "shift()", "slice()"], answer: "pop()" },
    { question: "Which JavaScript keyword is used to define a function?", options: ["def", "function", "fun", "define"], answer: "function" },
    { question: "Which tag is used to define a table in HTML?", options: ["<table>", "<tr>", "<td>", "<tbl>"], answer: "<table>" },
    { question: "Which operator is used for comparison in JavaScript?", options: ["=", "==", "===", "!="], answer: "===" },
    { question: "Which event is triggered when the user clicks an HTML element?", options: ["onmouseover", "onchange", "onclick", "onkeydown"], answer: "onclick" },
    { question: "Which CSS property controls the size of text?", options: ["text-size", "font-size", "size", "text-style"], answer: "font-size" },
    { question: "What does 'JSON' stand for?", options: ["JavaScript Object Notation", "Java Serialized Object Notation", "Java Standard Output Name", "JavaScript Online Notation"], answer: "JavaScript Object Notation" },
    { question: "Which function is used to print something in JavaScript?", options: ["print()", "console.log()", "echo()", "write()"], answer: "console.log()" },
    { question: "Which of these is a frontend framework?", options: ["Node.js", "Express.js", "Angular", "Django"], answer: "Angular" },
    { question: "Which keyword is used to declare constants in JavaScript?", options: ["var", "let", "const", "define"], answer: "const" },
    { question: "Which symbol is used to access an ID in CSS?", options: [".", "#", "*", "&"], answer: "#" }
];

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;
let answered = false;

function selectRandomQuestions() {
    selectedQuestions = allQuestions.sort(() => Math.random() - 0.5).slice(0, 3);
}

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    answered = false;
    document.getElementById("time").textContent = timeLeft;
    document.getElementById("next-btn").classList.add("hidden");

    const currentQuestion = selectedQuestions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(button, option);
        optionsContainer.appendChild(button);
    });

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            autoSelectAnswer();
        }
    }, 1000);
}

function checkAnswer(button, selectedOption) {
    if (answered) return;
    answered = true;
    clearInterval(timer);

    const correctAnswer = selectedQuestions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
        highlightCorrectAnswer();
    }

    document.getElementById("next-btn").classList.remove("hidden");
}

function highlightCorrectAnswer() {
    const buttons = document.querySelectorAll("#options button");
    buttons.forEach(btn => {
        if (btn.textContent === selectedQuestions[currentQuestionIndex].answer) {
            btn.classList.add("correct");
        }
    });
}

function autoSelectAnswer() {
    highlightCorrectAnswer();
    document.getElementById("next-btn").classList.remove("hidden");
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("score").textContent = `Your score: ${score} / 3`;
}

function restartQuiz() {
    selectRandomQuestions();
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("result").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    loadQuestion();
}

window.onload = () => {
    selectRandomQuestions();
    loadQuestion();
};
