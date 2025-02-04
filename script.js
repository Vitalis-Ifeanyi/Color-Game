let targetColor = "";
let correctGuesses = 0;
let totalRounds = 0;

const colorBox = document.getElementById("colorBox");
const colorOptionsContainer = document.getElementById("colorOptions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");


// This is to generate 40 different colors
const colors = Array.from({ length: 40 }, () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
});

// This is to generate 6 different colors as color option
function generateShades(baseColor) {
    const [r, g, b] = baseColor.match(/\d+/g).map(Number);
    let shades = new Set([baseColor]); // preventing duplicates

    while (shades.size < 6) {
        let shade = `rgb(${Math.min(255, Math.max(0, r + (Math.random() * 80 - 40)))},
                         ${Math.min(255, Math.max(0, g + (Math.random() * 80 - 40)))},
                         ${Math.min(255, Math.max(0, b + (Math.random() * 80 - 40)))})`;
        shades.add(shade);
    }

    let shadesArray = Array.from(shades);
    return shadesArray.sort(() => Math.random() - 0.5); // Shuffle shades
}

function normalizeColor(color) {
    return color.replace(/\s+/g, "").replace("rgb(", "").replace(")", "");
}

// Updating score
function updateScore() {
    scoreDisplay.textContent = `${correctGuesses} / ${totalRounds}`;
}

// The game function
function startGame() {
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = targetColor;
    console.log(" Target Color:", targetColor);

    colorOptionsContainer.innerHTML = "";
    const shades = generateShades(targetColor);

    shades.forEach(shade => {
        const btn = document.createElement("button");
        btn.style.backgroundColor = shade;
        btn.classList.add("colorOptionButton");
        btn.setAttribute("data-testid", "colorOption");
        btn.addEventListener("click", () => checkGuess(btn, shade));
        colorOptionsContainer.appendChild(btn);
    });

    gameStatus.textContent = "GUESS";
}

// Checking Correct or wrong answer.
function checkGuess(button, selectedColor) {
    let targetRGB = normalizeColor(getComputedStyle(colorBox).backgroundColor);
    let selectedRGB = normalizeColor(selectedColor);

    console.log("Selected:", selectedRGB, "| Target:", targetRGB);

    totalRounds++;
    colorOptionsContainer.querySelectorAll("button").forEach(btn => btn.disabled = true);

    if (selectedRGB === targetRGB) {
        gameStatus.textContent = "Correct!";
        gameStatus.style.color = "green";
        correctGuesses++;
        button.classList.add("correct-guess");
    } else {
        gameStatus.textContent = "Wrong!";
        gameStatus.style.color = "red";
        button.classList.add("wrong-guess");
    }

    updateScore();
    setTimeout(startGame, 1000);
}

// Restart Button function
newGameButton.addEventListener("click", () => {
    correctGuesses = 0;
    totalRounds = 0;
    updateScore();
    startGame();
});

// Starting game on load of page
startGame();
