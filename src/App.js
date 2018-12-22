import React, {Component} from 'react';
import Card from './components/Card/Card';
//import CardDeck from './lib/CardDeck';
import PokerHand from './lib/PokerHand';

class App extends Component {
    state = {
        cards: [
            {rank: 'K', suit: 'S'},
            {rank: '10', suit: 'D'},
			{rank: 'K', suit: 'C'},
            {rank: '3', suit: 'D'},
			{rank: 'J', suit: 'H'}
        ],
    };

    // startNewGame = () => {
    //     this.CardDeck = new CardDeck();
    //     const cards = this.CardDeck.getCards(5);
    //
    //     this.setState({cards});
    // };

    checkPokerHand() {
		this.PokerHand = new PokerHand(this.state.cards);
		return this.PokerHand.getOutcome();

    }

    render() {
		return (
            <div className="container">
                {/*<button onClick={this.startNewGame}>Start new game</button>*/}
                {this.state.cards.map((card, index) => {
                    return (
                        <Card rank={card.rank}
                              suit={card.suit}
                              key={index}
                        />
                    )
                })}
                <span>{this.checkPokerHand()}</span>
            </div>
        );
    }
}

export default App;
