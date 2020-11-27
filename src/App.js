import './App.css';
import Deck from './Deck';
import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Card} from "./Card";
import 'bootstrap/dist/css/bootstrap.css';
import {calculateScore, checkScores} from "./utils";
import {Game, GameResults} from "./constants";


function App() {

    const [cardDeck, setDeck] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [dealerScore, setDealerScore] = useState(0);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [gameState, setGameState] = useState(Game.INIT);

    useEffect(() => {
        let result = checkScores(playerScore,dealerScore, setGameState);
        // In case there is a winner
        if(result != GameResults.NO_WINNER && gameState != Game.END){
            alert(result);
            setGameState(Game.END);
        }
    },[playerScore,dealerScore]);


    const startGame = () => {
        let deck = Deck.createDeck();
        deck = Deck.shuffle(deck);
        setGameState(Game.STARTED);
        let dealer = deck.splice(0, 2);
        let player = deck.splice(0, 2);
        setDealerHand(dealer);
        setPlayerHand(player);
        setDealerScore(calculateScore(dealer));
        setPlayerScore(calculateScore(player));
        setDeck(deck);
    }

    const reset = () => {
        setDeck([]);
        setGameState(Game.INIT);
        setPlayerHand([]);
        setDealerHand([]);
        setPlayerScore(0);
        setDealerScore(0);
    }

    const dealCard = () => {
        let hand = playerHand;
        let card = cardDeck.pop();
        hand.push(card);
        setPlayerHand([...hand]);
        setDeck(cardDeck);
        setPlayerScore(calculateScore(playerHand));
    }

    const stay = () => {
        let score = dealerScore;
        let hand = dealerHand;
        while(score <=17){
            hand.push(cardDeck.pop());
            score = calculateScore(hand);
        }
        setDealerScore(score);
        setDealerHand([...hand]);
        setDeck(cardDeck);
        if(gameState != Game.END){
            setGameState(Game.END);
            let result = checkScores(playerScore,dealerScore, Game.END);
            setTimeout(function () {
                alert(result);
            }, 100);
            // In case there is a winner
        }
    }


    return (
        <div className="App">
            <h1 className="text-danger font-weight-bold p-2">BlackJack</h1>
            <div className="col p-2">
                <div className="playing-space">
                    <h2 className="text-white">Dealer</h2>
                    <h3>Dealer Score: <span>{dealerScore}</span></h3>
                    <div className="playing-hand">
                        {dealerHand.map((card, index) =>
                            <Card key={index}
                                  card={card}/>
                        )}
                    </div>
                </div>
                <div className="playing-space">
                    <h2 className="text-white">Player</h2>
                    <h3>Player Score: <span>{playerScore}</span></h3>
                    <div className="playing-hand">
                        {playerHand.map((card, index) =>
                            <Card key={index}
                                  card={card}/>
                        )}
                    </div>
                </div>

                {gameState === Game.STARTED &&
                <div className="flex-row mb-2">
                    <div className="btn btn-success mr-2"
                         onClick={dealCard}
                    >
                        HIT
                    </div>
                    <div className="btn btn-danger"
                         onClick={stay}
                    >
                        STAY
                    </div>
                </div>
                }

                {gameState === Game.INIT ?
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
