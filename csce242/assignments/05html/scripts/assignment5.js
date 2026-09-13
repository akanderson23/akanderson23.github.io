/* Speech Bubble */
const speechCard = document.getElementById("speech-card");
const speechBubble = document.getElementById("speech-bubble");

const toggleSpeechBubble = () => {
    speechBubble.classList.toggle("show");
};

speechCard.addEventListener("click", toggleSpeechBubble);

/* Beverage Select */
const beverageSelect = document.getElementById("beverage-select");
const beverageResult = document.getElementById("beverage-result");

const showBeverageChoice = () => {
    const chosenOption = beverageSelect.options[beverageSelect.selectedIndex];
    beverageResult.textContent = `${chosenOption.text}: Nice Choice!`;
};

beverageSelect.addEventListener("change", showBeverageChoice);

/* Sticker */
const stickerCard = document.getElementById("sticker-card");

const addSticker = (event) => {
    const cardRect = stickerCard.getBoundingClientRect();
    const clickX = event.clientX - cardRect.left;
    const clickY = event.clientY - cardRect.top;

    const sticker = document.createElement("span");
    sticker.classList.add("sticker");
    sticker.textContent = "\u2728";
    sticker.style.left = `${clickX}px`;
    sticker.style.top = `${clickY}px`;

    stickerCard.appendChild(sticker);
};

stickerCard.addEventListener("click", addSticker);