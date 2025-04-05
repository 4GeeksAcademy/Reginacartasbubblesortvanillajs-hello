document.addEventListener("DOMContentLoaded", () => {
   
    function generateRandomCards(num) {
        const suits = ['♠', '♣', '♦', '♥'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const cards = [];

        for (let i = 0; i < num; i++) {
            const suit = suits[Math.floor(Math.random() * suits.length)];
            const value = values[Math.floor(Math.random() * values.length)];
            cards.push(`${value}${suit}`);
        }

        console.log("Cartas generadas: ", cards); 
        return cards;
    }

    
    function createCardHTML(card) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.textContent = card;
        return cardElement;
    }

   
    function displayCards(cards) {
        const container = document.getElementById('cards-container');
        container.innerHTML = ''; 

        cards.forEach(card => {
            const cardHTML = createCardHTML(card); 
            container.appendChild(cardHTML); 
        });
    }

   
    function selectionSort(cards) {
        const sortedCards = [...cards]; 
        const logList = document.getElementById('log-list');

        for (let i = 0; i < sortedCards.length - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < sortedCards.length; j++) {
                if (sortedCards[j] < sortedCards[minIndex]) {
                    minIndex = j;
                }
            }
            
            [sortedCards[i], sortedCards[minIndex]] = [sortedCards[minIndex], sortedCards[i]];

            
            const logItem = document.createElement('li');
            logItem.textContent = `Cambio: ${sortedCards.join(', ')}`;
            logList.appendChild(logItem);
        }

        return sortedCards;
    }

    
    document.getElementById('draw-button').addEventListener('click', () => {
        const numCards = parseInt(document.getElementById('num-cards').value);
        console.log(`Generando ${numCards} cartas...`);
        const cards = generateRandomCards(numCards);
        displayCards(cards); 
    });

   
    document.getElementById('sort-button').addEventListener('click', () => {
        const cardsContainer = document.getElementById('cards-container');
        const currentCards = Array.from(cardsContainer.children).map(card => card.textContent);
        console.log("Cartas antes de clasificar: ", currentCards); 

        if (currentCards.length > 0) {
            const sortedCards = selectionSort(currentCards);
            console.log("Cartas ordenadas: ", sortedCards); 
            displayCards(sortedCards); 
            console.log("No hay cartas para ordenar.");
        }
    });
});
