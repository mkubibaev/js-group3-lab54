import React, {Component} from 'react';
import Card from './components/Card/Card';
import CardDeck from './lib/CardDeck';
import PokerHand from './lib/PokerHand';

class App extends Component {
    state = {
        cards: [],
    };

    startNewGame = () => {
        this.CardDeck = new CardDeck();
		const cards = this.CardDeck.getCards(5);

        this.setState({cards});
    };

    checkPokerHand() {
		this.PokerHand = new PokerHand(this.state.cards);
		return this.PokerHand.getOutcome();

    }

    render() {
		return (
            <div className="container">
				<h3 className="poker-hand">{this.checkPokerHand()}</h3>
				<div className="cards">
					{this.state.cards.map(card => (
							<Card key={card.id}
								  rank={card.rank}
								  suit={card.suit}
							/>
						)
					)}
				</div>
				<div className="actions">
					<button >Bet One</button>
					<button >Max Bet</button>
					<button onClick={this.startNewGame} className="deal-draw">Deal Draw</button>
				</div>



            </div>
        );
    }
}

export default App;
