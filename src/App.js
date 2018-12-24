import React, {Component} from 'react';
import Card from './components/Card/Card';
import CardDeck from './lib/CardDeck';
import PokerHand from './lib/PokerHand';
import BetTable from './components/BetTable/BetTable';

class App extends Component {
    state = {
        currentCards: [
			// {id: '10H', rank: '10', suit: 'H', forReplace: false},
			// {id: '9D', rank: '9', suit: 'D', forReplace: false},
			// {id: '5S', rank: '5', suit: 'S', forReplace: false},
			// {id: '7H', rank: '7', suit: 'H', forReplace: false},
			// {id: '8C', rank: '8', suit: 'C', forReplace: false}
		],
		bets: [
			{id: '1', pokerHand: 'Royal Flush', '1':250, '2':500, '3':750, '4':1000, '5':5000},
			{id: '2', pokerHand: 'Straight Flush', '1':50, '2':100, '3':150, '4':200, '5':250},
			{id: '3', pokerHand: 'Four of a Kind', '1':25, '2':50, '3':75, '4':100, '5':125},
			{id: '4', pokerHand: 'Full House', '1':9, '2':18, '3':27, '4':36, '5':45},
			{id: '5', pokerHand: 'Flush', '1':6, '2':12, '3':18, '4':24, '5':30},
			{id: '6', pokerHand: 'Straight', '1':4, '2':8, '3':12, '4':16, '5':20},
			{id: '7', pokerHand: 'Three of a Kind', '1':3, '2':6, '3':9, '4':12, '5':15},
			{id: '8', pokerHand: 'Two Pairs', '1':2, '2':4, '3':6, '4':8, '5':10},
			{id: '9', pokerHand: 'One Pair', '1':1, '2':2, '3':3, '4':4, '5':5}
		],
		pokerHand: {},
		currentBet: 0,
		currentWin: 0,
		credits: 100,
		gameStage: 'start',
        cardsForReplace: {count: 0, indexes: []},
    };

    async shuffleCards () {
        this.CardDeck = new CardDeck();
		const currentCards = this.CardDeck.getCards(5);

        await this.setState({currentCards});
        this.checkPokerHand();
    };

    checkPokerHand = () => {
		this.PokerHand = new PokerHand(this.state.currentCards);
		const pokerHand = this.PokerHand.getOutcome();

        this.setState({pokerHand})
    };

    markForReplaceCard = id => {
        if (this.state.gameStage === 'replace') {
            let currentCards = this.state.currentCards;

            for (let i = 0; i < currentCards.length; i++) {
                if (currentCards[i].id === id) {
                    currentCards[i].forReplace = !currentCards[i].forReplace;
                }
            }

            this.setState({currentCards});
            this.setForReplaceCardsCount();
        }
    };

    setForReplaceCardsCount = () => {
        let currentCards = this.state.currentCards;
        let cardsForReplace = {
            count: 0,
            indexes: []
        };

        for (let i = 0; i < currentCards.length; i++) {
            if(currentCards[i].forReplace) {
                cardsForReplace.count++;
                cardsForReplace.indexes.push(i);
            }
        }
        this.setState({cardsForReplace});
    };

    replaceCards = () => {
        let currentCards = this.state.currentCards;
        let cardsForReplace = this.state.cardsForReplace;
        const newCards = this.CardDeck.getCards(this.state.cardsForReplace.count); //берем новые карты с остатка в колоде

        for (let i = 0; i < cardsForReplace.indexes.length; i++) {
            currentCards.splice(cardsForReplace.indexes[i], 1, newCards.pop());
        }

        this.setState({currentCards});
        this.checkPokerHand();
    };

    checkWin = () => {
        let priority = this.state.pokerHand.priority;
        let bets = this.state.bets;
        let currentWin = this.state.currentWin;
        let credits = this.state.credits;
        let currentBet = this.state.currentBet;
        let strCurrentBet = currentBet.toString();

        currentWin = 0;

        for (let i = 0; i < bets.length; i++) {
            if (priority === bets[i].id) {
                let win = bets[i];
                currentWin = win[strCurrentBet];
            }
        }

        credits += currentWin;

        this.setState({credits, currentWin});
    };

    handleOneBet = () => {
        let currentBet = this.state.currentBet;
        let credits = this.state.credits;
    	currentBet++;
    	credits--;

    	this.setState({currentBet, credits});
	};

    handleMaxBet = () => {
        let credits = this.state.credits;
        credits -= 5;

		this.setState({currentBet: 5, credits});
	};

    handleDealDraw = () => {
    	switch (this.state.gameStage) {
			case 'start':
			    this.shuffleCards();
				this.setState({gameStage: 'replace'});
				break;
			case 'replace':
                this.replaceCards();
                this.checkWin();
				this.setState({gameStage: 'end'});
				break;
			case 'end':



				// this.setState({
				// 	gameStage: 'start',
				// 	currentBet: 0,
				// 	pokerHand: ''
				// });
				break;
			default:
				console.log('qwe')
		}
	};

    render() {
        console.log(this.state);

        let cards = null;

    	if (this.state.currentCards.length > 0) {
			cards = (
				<div className="cards">
					{this.state.currentCards.map(card => (
							<Card key={card.id}
								  rank={card.rank}
								  suit={card.suit}
                                  forReplace={card.forReplace}
                                  onReplase={() => this.markForReplaceCard(card.id)}
							/>
						)
					)}
				</div>
			)
		} else {
			cards = (
				<div className="cards">
					<div className="Card Card-back"></div>
					<div className="Card Card-back"></div>
					<div className="Card Card-back"></div>
					<div className="Card Card-back"></div>
					<div className="Card Card-back"></div>
				</div>
			)
		}

		return (
            <div className="container">
				<BetTable bets={this.state.bets} currentBet={this.state.currentBet}/>
				<div className="gameResult">
					<span>Bet: {this.state.currentBet}</span>
					<span>Win: {this.state.currentWin}</span>
					<span>Credits: {this.state.credits}</span>
				</div>

				<h3 className="poker-hand">{this.state.pokerHand.text}</h3>

				{cards}

				<div className="actions">
					<button onClick={this.handleOneBet}
							disabled={this.state.currentBet === 5 || this.state.gameStage !== "start" ? "disabled" : ""}
					>Bet One</button>
					<button onClick={this.handleMaxBet}
							disabled={this.state.currentBet === 5 || this.state.gameStage !== "start" ? "disabled" : ""}
					>Max Bet</button>
					<button onClick={this.handleDealDraw}
							disabled={this.state.currentBet > 0 && this.state.gameStage !== "end" ? "" : "disabled"}
							className="deal-draw"
					>Deal Draw</button>
				</div>
            </div>
        );
    }
}

export default App;
