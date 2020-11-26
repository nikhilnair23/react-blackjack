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
        deck = Deck.shuffle(deck);
        setDeck(deck);
        setGameState(game.STARTED);
        let dealer = deck.splice(0, 2);
        let player = deck.splice(0, 2);
        setDealerHand(dealer);
        setPlayerHand(player);
        setDeck(deck);
    }

    const reset = () => {
        setDeck([]);
        setGameState(game.INIT);
        setPlayerHand([]);
        setDealerHand([]);
        setPlayerScore(0);
        setDealerScore(0);
    }

    const dealCard = () => {
        let hand = playerHand;
        let card = currDeck.pop();
        hand.push(card);
        setPlayerHand([...hand]);
        setDeck(currDeck);
    }


    return (
        <div className="App">
            <div className="col p-4">
                <div className="playing-space">
                    <h3>Dealer</h3>
                    <div className="float-right">
                    <h3>Dealer Score: <span>{dealerScore}</span></h3>
                    </div>
                    <div className="playing-hand">
                        {dealerHand.map((card) =>
                            <Card card={card}/>
                        )}
                    </div>
                </div>
                <div className="playing-space">
                    <h3>Player</h3>
                    <div className="row">
                        <div className="playing-hand">
                            {playerHand.map((card) =>
                                <Card card={card}/>
                            )}
                        </div>
                    </div>
                </div>

                {gameState === game.STARTED &&
                <div className="flex-row mb-2">
                    <div className="btn btn-success mr-2"
                         onClick={dealCard}
                    >
                        HIT
                    </div>
                    <div className="btn btn-danger">
                        STAY
                    </div>
                </div>
                }

                {gameState === game.INIT ?
                    <div className="btn btn-primary"
                         onClick={startGame}
                    >
                        Start Game
                    </div>
                    :
                    <div className="btn btn-primary"
                         onClick={reset}
                    >
                        Restart
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
