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
		let result = {priority: '0', text: ''};

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
				result.text = `Four of a kind (${rank})`;
				result.priority = '3';
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
			result.text = `High Card (${highCard})`;
		}

		if (highCard === 13) {
			result.text = 'High Card (K)';
		} else if (highCard === 12) {
			result.text = 'High Card (Q)';
		} else if (highCard === 11) {
			result.text = 'High Card (J)';
		}

		for (let i = 0; i < ranksArr.length; i++) {
			if (ranksArr[i] === 'A') {
				result.text = 'High Card (A)';
			}
		}

		//One Pairs or Full House

		if (pairs.count === 1) {
			result.text = `One Pair (${pairs.ranks.join(', ')})`;
			result.priority = '9';

			if (three.count === 1) {
				result.text = `Full House (${pairs.ranks.join(', ')}, ${three.ranks})`;
				result.priority = '4';
			}
		}

		//Two pairs

		if (pairs.count === 2) {
			result.text = `Two Pairs (${pairs.ranks.join(', ')})`;
			result.priority = '8';
		}

		//Three

		if (three.count === 1) {
			result.text = `Three of a Kind (${three.ranks})`;
			result.priority  = '7';
		}

		//Flush

		for (let suit in suitsObj) {
			if (suitsObj[suit] === 5) {
				result.text = 'Flush';
				result.priority = '5';
			}
		}

		//Straight or Straight Flush

		if (straightCheck === 4) {
			if (result.text === 'Flush') {
				result.text = 'Straight Flush';
				result.priority = '2';

			} else {
				result.text = 'Straight';
				result.text = '6';
			}
		}

		//Straight or Royal Flush

		for (let i = 0; i < ranksArr.length; i++) {
			if (ranksArr[i] === 'A' && straightCheck === 3) {
				result.text = 'Straight';
				result.priority = '6';
				if (sortedRanksNumArr[0] === 10) {
					result.text = 'Royal Flush';
					result.priority = '1';
				}
			}
		}

		return result;
	}
}

export default PokerHand;