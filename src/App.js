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
                <button onClick={this.startNewGame}>Start new game</button>
                {this.state.cards.map(card => {
                    return (
                        <Card key={card.id}
							  rank={card.rank}
							  suit={card.suit}
                        />
                    )
                })}
                <span>{this.checkPokerHand()}</span>
            </div>
        );
    }
}

export default App;
