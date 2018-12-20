class CardDeck {
    constructor() {
        this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.suits = ['H', 'D', 'C', 'S'];
        this.allCards = [];

        for (let i = 0; i < this.ranks.length; i++) {
            for (let j = 0; j < this.suits.length; j++) {
                this.allCards.push({rank: this.ranks[i], suit: this.suits[j]})
            }
        }
    }

    showCards() {
        console.log(this.allCards);
    }

}

export default CardDeck;