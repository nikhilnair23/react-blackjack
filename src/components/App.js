import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useReducer} from 'react';
import {calculateScore, checkScores} from "../utils";

import CardDeck from './Deck';
import {Game, GameResults, initialState} from "../constants";
import {PlayingHand} from "./PlayingHand";
import {Controls} from "./Controls";
import {ResultModal} from "./ResultModal";
import {gameActions} from "../actions/gameActions";
import {gameReducer} from "../reducers/gameReducer";

// Creating an instance of the Deck object
const Deck = new CardDeck();

function App() {
    // Initializing reducer with initial state
    const [state, dispatch] = useReducer(gameReducer, initialState);

    // Getting all the actions and storing them in the actions const
    const actions = gameActions(dispatch);

    // State variables
    const {playerHand, dealerHand, playerScore, dealerScore, gameState, show, message} = state;

    // Function to close the modal
    const handleClose = () => actions.closeModal();

    // Checking for a winner every time the player draws a card (i.e) playerScore changes
    // eslint-disable-next-line
    useEffect(() => {
        let result = checkScores(playerScore, dealerScore);
        // If there is a winner/tie dispatch 'END_GAME' action and display modal
        if (result !== GameResults.NO_WINNER && gameState !== Game.END) {
            actions.endGame(result);
        }
    }, [playerScore]);

    // Helper function to start the game. Involves drawing two cards for the dealer and player and then updating state
    const startGame = () => {
        Deck.createDeck();
        Deck.shuffle();
        let dealerTurn = true;
        let dealerHand =[];
        let playerHand = [];
        // Alternate dealing cards between dealer and player
        for(let i=0 ;i<4 ;i++){
            if (dealerTurn){
                dealerHand.push(Deck.drawCard());
                dealerTurn = false;
            }else{
                playerHand.push(Deck.drawCard());
                dealerTurn = true;
            }
        }
        let obj = {
            playerHand: playerHand,
            dealerHand: dealerHand,
            dealerScore: calculateScore(dealerHand),
            playerScore: calculateScore(playerHand),
        }
        actions.startGame(obj);
    }

    // Function to reset the game by dispatching the 'reset' action
    const reset = () => {
        actions.reset();
    }

    // Function called when the user chooses to "Hit". A card is added to the players hand and the state is updated
    const hit = () => {
        playerHand.push(Deck.drawCard());
        let obj = {
            playerHand: playerHand,
            playerScore: calculateScore(playerHand)
        }
        // dispatching the update player action
        actions.updatePlayer(obj);
    }

    // When user chooses to stay, dealer draws cards until their score is 17 and the state is then updated
    const stay = () => {
        let score = dealerScore;
        while (score <= 17) {
            dealerHand.push(Deck.drawCard());
            score = calculateScore(dealerHand);
        }

        let obj = {
            dealerHand: dealerHand,
            dealerScore: score
        }
        actions.updateDealer(obj);
        // If the game hasn't ended
        if (gameState !== Game.END) {
            let result = checkScores(playerScore, score, Game.END);
            actions.endGame(result);
        }
    }


    return (
        <div className="App">
            <h1 className="text-danger font-weight-bold p-2">BlackJack</h1>

            <div className="col p-2">
                <div className="playing-space">
                    <h2 className="text-white mb-4">Dealer</h2>
                    <PlayingHand
                        gameState={gameState}
                        hand={dealerHand}
                        score={dealerScore}
                    />
                </div>
            </div>


            <div className="control-space mb-2">
                <Controls
                    gameState={gameState}
                    hit={hit}
                    stay={stay}
                    startGame={startGame}
                    reset={reset}
                />
            </div>


            <div className="container playing-space ">
                <h2 className="text-white mb-4">Player</h2>
                <PlayingHand
                    gameState={gameState}
                    hand={playerHand}
                    score={playerScore}
                />
            </div>

            <ResultModal
                show={show}
                handleClose={handleClose}
                message={message}
            />

            <div className="">
                {gameState === Game.INIT ?
                    <div className="btn btn-lg btn-primary"
                         onClick={startGame}
                    >
                        Start Game
                    </div>
                    :
                    <div className="btn btn-lg btn-primary"
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


