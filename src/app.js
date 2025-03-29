let cards = [];
let history = [];
const suits = ['♠️', '♥️', '♦️', '♣️']; 

function generateCards() {
    const cardCount = parseInt(document.getElementById("cardCount").value);
    cards = [];
    history = [];

    for (let i = 0; i < cardCount; i++) {
        const cardValue = Math.floor(Math.random() * 13) + 1; 
        const suit = suits[Math.floor(Math.random() * suits.length)]; 
        const cardSymbol = getCardSymbol(cardValue); 
        cards.push({ value: cardValue, suit, display: `${cardSymbol}${suit}` });
    }

    displayCards(cards);
    document.getElementById('history').innerHTML = '';
}

function getCardSymbol(value) {
    if (value === 1) return 'A';
    if (value === 11) return 'J';
    if (value === 12) return 'Q';
    if (value === 13) return 'K';
    return value;
}

function displayCards(cardsArray) {
    const cardsContainer = document.getElementById("cardsContainer");
    cardsContainer.innerHTML = '';
    cardsArray.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.className = `card ${card.suit === '♥️' || card.suit === '♦️' ? 'suit-red' : 'suit-black'}`;
        cardElement.innerText = card.display;
        cardsContainer.appendChild(cardElement);
    });
}

function sortCards() {
    let steps = [];
    let sortedCards = [...cards];
    let n = sortedCards.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (sortedCards[j].value > sortedCards[j + 1].value) {
                [sortedCards[j], sortedCards[j + 1]] = [sortedCards[j + 1], sortedCards[j]];
                swapped = true;
                steps.push([...sortedCards]);
            }
        }
        if (!swapped) break;
    }

    displayHistory(steps);
}

function displayHistory(steps) {
    const historyContainer = document.getElementById("history");
    const stepTexts = [
        "1", "2", "3", 
        "4", "5", "6", 
        "7", "8", "9", 
        "10","11","12"
    ];

    historyContainer.innerHTML = `
        <div class="log-title"><span>Bubble Log:</span></div>
        <div class="steps">
            ${steps.map((step, index) => `
                <div class="step">
                    <span class="number">${stepTexts[index] || `Intercambio ${index + 1}`}</span>
                    <div class="history-cards">
                        ${step.map(card => `<span class="history-card">${card.display}</span>`).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}



