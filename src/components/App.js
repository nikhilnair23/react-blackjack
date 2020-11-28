import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useReducer} from 'react';
import {calculateScore, checkScores} from "../utils";

import CardDeck from './Deck';
import {Game, GameResults} from "../constants";
import {PlayingHand} from "./PlayingHand";
import {Controls} from "./Controls";
import {ResultModal} from "./ResultModal";


function App() {
    // Creating an instance of the deck
    const Deck = new CardDeck();
    // Initializing reducer with initial state
    const [state, dispatch] = useReducer(gameReducer, initialState);

    const {cardDeck, playerHand, dealerHand, playerScore, dealerScore, gameState, show, message} = state;
    // Function to close the modal
    const handleClose = () => dispatch({type: 'CLOSE_MODAL'});

    // Checking for a winner every time the player draws a card (i.e) playerScore changes
    useEffect(() => {
        let result = checkScores(playerScore, dealerScore);
        // If there is a winner
        if (result != GameResults.NO_WINNER && gameState != Game.END) {
            dispatch({type: 'END_GAME', payload: result});
        }
    }, [playerScore]);

    /**
     * Helper function to start the game. Involves drawing two cards for dealer and player and then dispatching
     * the updated data to the reducer
     */
    const startGame = () => {
        Deck.createDeck();
        Deck.shuffle();
        let deck = Deck.getDeck();
        let dealer = deck.splice(0, 2);
        let player = deck.splice(0, 2);
        let obj = {
            deck: deck,
            playerHand: player,
            dealerHand: dealer,
            dealerScore: calculateScore(dealer),
            playerScore: calculateScore(player),
        }
        dispatch({type: 'START_GAME', payload: obj})
    }

    // Function to reset the game by dispatching the 'RESET' action type
    const reset = () => {
        dispatch({type: 'RESET'});
    }

    // Function called when the user chooses to "Hit". A card is added to the players hand and the state is updated
    const hit = () => {
        let card = cardDeck.pop();
        playerHand.push(card);
        let obj = {
            deck: cardDeck,
            playerHand: playerHand,
            playerScore: calculateScore(playerHand)
        }
        dispatch({type: 'UPDATE_PLAYER', payload: obj});
    }

    // When user chooses to stay, dealer draws cards until their score is 17 and the state is then updated
    const stay = () => {
        let score = dealerScore;
        while (score <= 17) {
            dealerHand.push(cardDeck.pop());
            score = calculateScore(dealerHand);
        }

        let obj = {
            deck: cardDeck,
            dealerHand: dealerHand,
            dealerScore: score
        }
        dispatch({type: 'UPDATE_DEALER', payload: obj});
        if (gameState != Game.END) {
            let result = checkScores(playerScore, score, Game.END);
            dispatch({type: 'END_GAME', payload: result});
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
            <Controls
                gameState={gameState}
                hit={hit}
                stay={stay}
                startGame={startGame}
                reset={reset}
            />


            <div className="container playing-space mb-3">
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
                    <div className="btn btn-lg btn-primary gradient"
                         onClick={startGame}
                    >
                        Start Game
                    </div>
                    :
                    <div className="btn btn-lg btn-primary gradient"
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

function gameReducer(state, action) {
    switch (action.type) {
        // Setting data at the start of a new game
        case 'START_GAME': {
            return {
                ...state,
                cardDeck: action.payload.deck,
                playerHand: action.payload.playerHand,
                dealerHand: action.payload.dealerHand,
                playerScore: action.payload.playerScore,
                dealerScore: action.payload.dealerScore,
                gameState: Game.STARTED
            }
        }

        // Update game state and display modal
        case 'END_GAME': {
            return {
                ...state,
                gameState: Game.END,
                show: true,
                message: action.payload
            }
        }

        // Update Game state
        case 'UPDATE_STATE': {
            return {
                ...state,
                gameState: action.payload
            }
        }
        // Update state when a player "hits"
        case 'UPDATE_PLAYER': {
            return {
                ...state,
                cardDeck: action.payload.deck,
                playerHand: action.payload.playerHand,
                playerScore: action.payload.playerScore,
            }
        }
        // Update state when dealer is drawing cards
        case 'UPDATE_DEALER': {
            return {
                ...state,
                cardDeck: action.payload.deck,
                dealerHand: action.payload.dealerHand,
                dealerScore: action.payload.dealerScore,
            }
        }
        // Reset state to initial state
        case 'RESET': {
            return {
                ...state,
                cardDeck: [],
                playerHand: [],
                dealerHand: [],
                playerScore: 0,
                dealerScore: 0,
                gameState: Game.INIT
            }
        }

        case 'CLOSE_MODAL': {
            return {
                ...state,
                show: false,
                message: ''
            }
        }
    }
}

const initialState = {
    cardDeck: [],
    playerHand: [],
    dealerHand: [],
    playerScore: 0,
    dealerScore: 0,
    gameState: Game.INIT,
    message: '',
    show: false
}


