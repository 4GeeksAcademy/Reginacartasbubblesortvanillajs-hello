document.addEventListener("DOMContentLoaded", () => {

    const cardValueMap = {
        'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
        '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13
    };

    let originalCards = [];

    function generateRandomCards(num) {
        const suits = ['♠', '♣', '♦', '♥'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const cards = [];

        for (let i = 0; i < num; i++) {
            const suit = suits[Math.floor(Math.random() * suits.length)];
            const value = values[Math.floor(Math.random() * values.length)];
            cards.push(`${value}${suit}`);
        }

        return cards;
    }

    function createCardHTML(card) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.textContent = card;
        return cardElement;
    }

    function displayCards(cards, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        cards.forEach(card => {
            const cardHTML = createCardHTML(card);
            container.appendChild(cardHTML);
        });
    }

    function getCardValue(card) {
        const value = card.slice(0, -1);
        return cardValueMap[value];
    }

    function selectionSort(cards) {
        const sortedCards = [...cards];
        const logList = document.getElementById('log-list');
        logList.innerHTML = '';

        for (let i = 0; i < sortedCards.length - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < sortedCards.length; j++) {
                if (getCardValue(sortedCards[j]) < getCardValue(sortedCards[minIndex])) {
                    minIndex = j;
                }
            }
            [sortedCards[i], sortedCards[minIndex]] = [sortedCards[minIndex], sortedCards[i]];

            const logItem = document.createElement('li');
            logItem.textContent = `Paso ${i + 1}: ${sortedCards.join(', ')}`;
            logList.appendChild(logItem);
        }

        return sortedCards;
    }

    document.getElementById('draw-button').addEventListener('click', () => {
        const numCards = parseInt(document.getElementById('num-cards').value);
        if (!numCards || numCards <= 0) {
            alert('Por favor, ingresa un número válido de cartas.');
            return;
        }

        originalCards = generateRandomCards(numCards);
        displayCards(originalCards, 'cards-container');
        document.getElementById('sorted-cards-container').innerHTML = '';
        document.getElementById('log-list').innerHTML = '';
    });

    document.getElementById('sort-button').addEventListener('click', () => {
        if (originalCards.length === 0) return;

        const sortedCards = selectionSort(originalCards);
        displayCards(sortedCards, 'sorted-cards-container');
    });
});
