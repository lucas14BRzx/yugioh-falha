document.getElementById('searchCard').addEventListener('click', searchCard);

function searchCard() {
    const searchInput = document.getElementById('searchInput').value;
    const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent('.searchInput')}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayCards(data.data))
        .catch(error => console.error('Erro ao buscar as cartas:', error));
}

function displayCards(cards) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ''; // Limpa o conteúdo anterior
    console.log(cards)

    if (!cards || cards.length === 0) {
        cardContainer.innerHTML = '<p>Nenhuma carta encontrada.</p>';
        return;
    }

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';

        const cardImage = document.createElement('img');
        cardImage.src = card.card_images[0].image_url;
        cardImage.alt = card.name;

        const cardName = document.createElement('h3');
        cardName.textContent = card.name;

        const cardDesc = document.createElement('p');
        cardDesc.textContent = card.desc;

        const cardAtkDef = document.createElement('p');
        cardAtkDef.textContent = `ATK: ${card.atk || '-'} / DEF: ${card.def || '-'}`;

        // Adicionando os elementos ao cardElement
        cardElement.appendChild(cardImage);
        cardElement.appendChild(cardName);
        cardElement.appendChild(cardDesc);
        cardElement.appendChild(cardAtkDef);

        // Adicionando o cardElement ao cardContainer
        cardContainer.appendChild(cardElement);
    });
}