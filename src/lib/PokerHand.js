class PokerHand {
	constructor(cards) {
		this.cards = cards;
	}

	getOutcome() {
		let ranksObj = {};
		let suitsObj = {};
		let pairs = {count: 0, ranks: []};
		let result = '';

		for (let card of this.cards) {
			if (!ranksObj[card.rank]) {
				ranksObj[card.rank] = 1;
			} else {
				ranksObj[card.rank] += 1;
			}

			if (!suitsObj[card.suit]) {
				suitsObj[card.suit] = 1;
			} else {
				suitsObj[card.suit] += 1;
			}
		}

		for (let rank in ranksObj) {
			if (ranksObj[rank] === 2) {
				pairs.count++;
				pairs.ranks.push(rank);
			} else if (ranksObj[rank] === 3) {
				result = `Three of a kind (${rank})`;
			}
		}

		if (pairs.count === 1) {
			result = `One pair (${pairs.ranks.join(', ')})`;
		} else if (pairs.count === 2) {
			result = `Two pairs (${pairs.ranks.join(', ')})`;
		}

		for (let suit in suitsObj) {
			if (suitsObj[suit] === 5) {
				pairs++;
				result = 'Flush';
			}
		}

		return result;

	}
}

export default PokerHand;