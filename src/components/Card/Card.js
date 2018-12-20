import React from 'react';

import './Card.css';

const Card = props => {
    const suits = {
        diams: '♦',
        hearts: '♥',
        spades: '♠',
        clubs: '♣'
    };
    let st = '';
    const cardClasses = ['Card'];
    cardClasses.push('Card-rank-' + props.rank.toLowerCase());

    switch (props.suit) {
        case 'D':
            st = suits.diams;
            cardClasses.push('Card-diams');
            break;
        case 'H':
            st = suits.hearts;
            cardClasses.push('Card-hearts');
            break;
        case 'S':
            st = suits.spades;
            cardClasses.push('Card-spades');
            break;
        default:
            st = suits.clubs;
            cardClasses.push('Card-clubs');
    }

    return (
        <div className={cardClasses.join(' ')}>
            <span className="Card-rank">{props.rank}</span>
            <span className="Card-suit">{st}</span>
        </div>
    );
};

export default Card;