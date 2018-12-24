import React from 'react';

import './Card.css';

const Card = props => {
    const suits = {
        diams: '♦',
        hearts: '♥',
        spades: '♠',
        clubs: '♣'
    };
    let cardSuit = '';
    const cardClasses = ['Card'];

    if (props.rank) {
		cardClasses.push('Card-rank-' + props.rank.toLowerCase());
    }

    switch (props.suit) {
        case 'D':
            cardSuit = suits.diams;
            cardClasses.push('Card-diams');
            break;
        case 'H':
            cardSuit = suits.hearts;
            cardClasses.push('Card-hearts');
            break;
        case 'S':
            cardSuit = suits.spades;
            cardClasses.push('Card-spades');
            break;
        case 'C':
			cardSuit = suits.clubs;
			cardClasses.push('Card-clubs');
			break;
        default:
            cardSuit = '';
            cardClasses.push('Card-back');
    }

    if (props.forReplace) {
        cardClasses.push('Card-back');
    }


    return (
        <div className={cardClasses.join(' ')}
             onClick={props.onReplase}
        >
            <span className="Card-rank">{props.rank}</span>
            <span className="Card-suit">{cardSuit}</span>
        </div>
    );
};

export default Card;