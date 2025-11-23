// ===============================
// PART 1 — LOGIN SYSTEM
// ===============================

// Predefined correct credentials
const correctEmail = "zahra@gmail.com";
const correctPassword = "123";

let attempts = 0;
let locked = false;

// Function to start Login
async function startLogin() {
    while (true) {
        if (locked) {
            console.log("Login is locked. Please wait...");
            await startCountdown(30);
            locked = false;
            attempts = 0;
            console.log("You can try again now.");
        }

        let email = prompt("Enter your email:");
        let password = prompt("Enter your password:");

        if (email.trim().toLowerCase() === correctEmail.toLowerCase() &&
            password.trim() === correctPassword) {
            console.log("Login successful!");
            startQuiz();
            break;
        } else {
            attempts++;
            console.log("Incorrect email or password. Try again.");

            if (attempts >= 3) {
                console.log("Too many attempts! Login locked for 30 seconds.");
                locked = true;
            }
        }
    }
}

// Countdown function
function startCountdown(seconds) {
    return new Promise(resolve => {
        let counter = seconds;

        let timer = setInterval(() => {
            console.log(`Try again in: ${counter}s`);
            counter--;

            if (counter < 0) {
                clearInterval(timer);
                resolve();
            }
        }, 1000);
    });
}



// ===============================
// PART 2 — QUIZ SYSTEM
// ===============================

function startQuiz() {
    let totalQ = parseInt(prompt("How many questions do you want in the exam?"));

    const operators = ["+", "-", "*", "/", "%", "**"];

    let userAnswers = [];
    let correctAnswers = [];

    for (let i = 1; i <= totalQ; i++) {
        let num1 = Math.floor(Math.random() * 10) + 1;
        let num2 = Math.floor(Math.random() * 10) + 1;
        let op = operators[Math.floor(Math.random() * operators.length)];

        // Build the question text
        let question = `${num1} ${op} ${num2} = ?`;

        // Calculate correct answer using JS eval
        let correct = eval(`${num1} ${op} ${num2}`);

        // Show the question
        let userAns = prompt(`Question ${i}: ${question}`);

        userAnswers.push(Number(userAns));
        correctAnswers.push(correct);
    }

    // Calculate score
    let score = 0;
    for (let i = 0; i < totalQ; i++) {
        if (userAnswers[i] === correctAnswers[i]) {
            score++;
        }
    }

    console.log(`Your score is ${score} out of ${totalQ}.`);
}



















// ===============================
// START PROGRAM
// ===============================

startLogin();