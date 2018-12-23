class PokerHand {
	constructor(cards) {
		this.cards = cards;
	}

	getOutcome() {
		const ranksObj = {};
		const suitsObj = {};
		const pairs = {count: 0, ranks: []};
		const three = {count: 0, ranks: ''};
		let straightCheck = 0;
		let result = '';

		const ranksArr = [];
		const ranksNumArr = [];

		for (let i = 0; i < this.cards.length; i++) {

			ranksArr.push(this.cards[i].rank);

			if (!ranksObj[this.cards[i].rank]) {
				ranksObj[this.cards[i].rank] = 1;
			} else {
				ranksObj[this.cards[i].rank] += 1;
			}

			if (!suitsObj[this.cards[i].suit]) {
				suitsObj[this.cards[i].suit] = 1;
			} else {
				suitsObj[this.cards[i].suit] += 1;
			}
		}

		for (let rank in ranksObj) {

			if (ranksObj[rank] === 2) {
				pairs.count++;
				pairs.ranks.push(rank);
			}

			if (ranksObj[rank] === 3) {
				three.count++;
				three.ranks = rank;
			}

			if (ranksObj[rank] === 4) {
				result = `Four of a kind (${rank})`;
			}
		}

		for (let i = 0; i < ranksArr.length; i++) {
			if (ranksArr[i] === 'J') {
				ranksArr[i] = '11';
			} else if (ranksArr[i] === 'Q') {
				ranksArr[i] = '12';
			} else if (ranksArr[i] === 'K') {
				ranksArr[i] = '13';
			}

			if (parseInt(ranksArr[i])) {
				ranksNumArr.push(parseInt(ranksArr[i]));
			}
		}

		const sortedRanksNumArr = ranksNumArr.sort((a, b) => a - b);

		for (let i = 0; i < sortedRanksNumArr.length - 1; i++) {
			if (sortedRanksNumArr[i] + 1 === sortedRanksNumArr[i + 1]) {
				straightCheck++;
			}
		}

		//High Card

		const highCard = sortedRanksNumArr[sortedRanksNumArr.length - 1];

		if (highCard) {
			result = `High Card (${highCard})`;
		}

		if (highCard === 13) {
			result = 'High Card (K)';
		} else if (highCard === 12) {
			result = 'High Card (Q)';
		} else if (highCard === 11) {
			result = 'High Card (J)';
		}

		for (let i = 0; i < ranksArr.length; i++) {
			if (ranksArr[i] === 'A') {
				result = 'High Card (A)';
			}
		}

		//One Pairs or Full House

		if (pairs.count === 1) {
			result = `One Pair (${pairs.ranks.join(', ')})`;

			if (three.count === 1) {
				result = `Full House (${pairs.ranks.join(', ')}, ${three.ranks})`;
			}
		}

		//Two pairs

		if (pairs.count === 2) {
			result = `Two Pairs (${pairs.ranks.join(', ')})`;
		}

		//Three

		if (three.count === 1) {
			result = `Three of a Kind (${three.ranks})`;
		}

		//Flush

		for (let suit in suitsObj) {
			if (suitsObj[suit] === 5) {
				result = 'Flush';
			}
		}

		//Straight or Straight Flush

		if (straightCheck === 4) {
			if (result === 'Flush') {
				result = 'Straight Flush';
			} else {
				result = 'Straight';
			}
		}

		//Straight or Royal Flush

		for (let i = 0; i < ranksArr.length; i++) {
			if (ranksArr[i] === 'A' && straightCheck === 3) {
				result = 'Straight';
				if (sortedRanksNumArr[0] === 10) {
					result = 'Royal Flush';
				}
			}
		}

		return result;
	}
}

export default PokerHand;