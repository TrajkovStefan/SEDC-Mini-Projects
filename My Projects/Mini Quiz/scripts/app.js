const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        a: "<script>",
        b: "<scripting>",
        c: "<js>",
        d: "<javascript>",
        correct: "a"
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a"
    },
    {
        question: "What does DOM stand for?",
        a: "Document Object Model",
        b: "Document Our Model",
        c: "Document Obese Model",
        d: "none of the above",
        correct: "a"
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        a: "msg('Hello World')",
        b: "alertBox('Hello World')",
        c: "msgBox('Hello World')",
        d: "alert('Hello World')",
        correct: "d"
    }
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const wrongQuestion = document.getElementById("wrongInput");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz(currentQuiz);

function loadQuiz(currentQuestion){
    
    deselectAnswers();

    const currentQuizData = quizData[currentQuestion];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function deselectAnswers(){
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected(){
    let answer;
    answerEls.forEach(answerEl => {
        if(answerEl.checked){
            answer = answerEl.id;
        }
    })
    return answer;
}

submitBtn.addEventListener("click", () => {
    const answer = getSelected();
    if(answer){
        wrongQuestion.innerHTML = "";
        if(answer === quizData[currentQuiz].correct){
            score++;
        }

        currentQuiz++;

        if(currentQuiz < quizData.length){
            loadQuiz(currentQuiz)
        } 
        else if(score > 3 || score == quizData.length){
            quiz.innerHTML = `
                <h2>Congratulations, passed the test with ${score}/${quizData.length} correct questions answered</h2>
                <button onclick="window.close()">Close the test</button>
            `;
        }
        else{
            quiz.innerHTML = `
                <h2>Unfortunately, he did not pass the test. You answered correctly ${score}/${quizData.length}. Try again!</h2>
                <button onclick="location.reload()">Test Again</button>
            `;
        }
    }
    else {
        wrongQuestion.innerText = "You must choose one answer";
    }
})