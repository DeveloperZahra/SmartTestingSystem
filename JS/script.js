// ===============================
// PART 1 — LOGIN SYSTEM
// ===============================

// Predefined correct credentials
const correctEmail = "test@example.com";
const correctPassword = "12345";

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

        if (email === correctEmail && password === correctPassword) {
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