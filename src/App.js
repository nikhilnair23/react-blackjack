import './App.css';
import Deck from './Deck';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Card} from "./Card";
import 'bootstrap/dist/css/bootstrap.css';

const game = {
    INIT: 'init',
    STARTED: 'started',
    END: 'end'
}


function App() {


    const [currDeck, setDeck] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [dealerScore, setDealerScore] = useState(0);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [gameState, setGameState] = useState(game.INIT);

    const startGame = () => {
        let deck = Deck.createDeck();
        setDeck(deck);
        setGameState(game.STARTED);
        let dealer = deck.splice(0,2);
        let player = deck.splice(0,2);
        setDealerHand(dealer);
        setPlayerHand(player);
        setDeck(deck);
    }

    return (
        <div className="App">
            <div className="col p-4">
                {gameState === game.INIT &&
                <div className="btn btn-primary"
                    onClick={startGame}
                >
                    Start Game
                </div>
                }
                <div className="card-space">
                    <h3>Dealer</h3>
                    {dealerHand.map((card) =>
                    <Card card={card}/>
                    )}
                </div>
                <div className="card-space">
                    <h3>Player</h3>
                    {playerHand.map((card) =>
                    <Card card = {card}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
