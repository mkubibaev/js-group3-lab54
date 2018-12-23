import React from 'react';


const BetTable = props => {
	return  (
		<div className="bet-table">
			<ul>
				{props.bets.map((bet) => (
					<li key={bet.id}>
						<span>{bet.pokerHand}</span>
						<span className={props.currentBet === 1 ? "current": ""}>{bet['1']}</span>
						<span className={props.currentBet === 2 ? "current": ""}>{bet['2']}</span>
						<span className={props.currentBet === 3 ? "current": ""}>{bet['3']}</span>
						<span className={props.currentBet === 4 ? "current": ""}>{bet['4']}</span>
						<span className={props.currentBet === 5 ? "current": ""}>{bet['5']}</span>
					</li>
					))}
			</ul>
		</div>
	)
};

export default BetTable;