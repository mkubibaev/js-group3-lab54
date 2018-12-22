import React, {Component} from 'react';
import Card from './components/Card/Card';
import CardDeck from './lib/CardDeck';

class App extends Component {
    state = {
        cards: []
    };

    CardDeck = new CardDeck();




    render() {

		return (
            <div className="container">
                {this.CardDeck.allCards.map((card, index) => {
                    return (
                        <Card rank={card.rank}
                              suit={card.suit}
                              key={index}
                        />
                    )
                })}
            </div>
        );
    }
}

export default App;
