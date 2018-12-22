class PokerHand {
	constructor(cards) {
		this.cards = cards;
	}

	getOutcome() {
		let equalCards = 0;
		// let result = '';

		for (let i = 0; i < this.cards.length; i++) {
			let currentCard = this.cards.splice(i, 1);

			for (let j = 0; j < this.cards.length; j++) {
				if (currentCard.rank === this.cards[j].rank) {
					console.log(currentCard.rank);
					equalCards +=2;
				}
			}


		}

		return equalCards;





		// const ranks = [];
		// const suits = [];
		//
		// for (let i = 0; i < this.cards.length; i++) {
		// 	ranks.push(this.cards[i].rank);
		// 	suits.push(this.cards[i].suit);
		// }
		//
		// ranks.sort();
		// suits.sort();
		//
		// for (let j = 0; j < ranks.length - 1; j++) {
		// 	if (ranks[j] === ranks[j + 1]) {
		// 		result = 'One Pair';
		//
		// 		if (ranks[j + 2] === ranks[j + 3]) {
		// 			result = 'Two Pair';
		// 		}
		// 	}
		// }
		// return result;
	}
}

export default PokerHand;