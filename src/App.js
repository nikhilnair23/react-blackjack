import './App.css';
import Deck from './Deck';
import {useState, useEffect, useReducer} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Card} from "./Card";
import 'bootstrap/dist/css/bootstrap.css';
import {calculateScore, checkScores} from "./utils";
import {Game, GameResults} from "./constants";


function App() {

    const [state, dispatch] = useReducer(gameReducer, initialState);
    const {cardDeck, playerHand, dealerHand, playerScore, dealerScore, gameState} = state;

    // Checking for a winner every time the player or dealer draws a card
    useEffect(() => {
        let result = checkScores(playerScore,dealerScore);
        // If there is a winner
        if(result != GameResults.NO_WINNER && gameState != Game.END){
            alert(result);
            dispatch({type: 'UPDATE_STATE', payload: Game.END})
        }
    },[playerScore,dealerScore]);


    const startGame = () => {
        let deck = Deck.createDeck();
        deck = Deck.shuffle(deck);
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

    const reset = () => {
        dispatch({type: 'RESET'});
    }

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

    const stay = () => {
        let score = dealerScore;
        while(score <=17){
            dealerHand.push(cardDeck.pop());
            score = calculateScore(dealerHand);
        }

        let obj = {
            deck: cardDeck,
            dealerHand: dealerHand,
            dealerScore: score
        }
        dispatch({type: 'UPDATE_DEALER', payload:obj});
        if(gameState != Game.END){
            dispatch({type: 'UPDATE_STATE', payload: Game.END})
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
                         onClick={hit}
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

function gameReducer(state,action){
    switch(action.type){
        // Setting data at the start of a new game
        case 'START_GAME':
        {
            return {
                ...state,
                cardDeck : action.payload.deck,
                playerHand: action.payload.playerHand,
                dealerHand: action.payload.dealerHand,
                playerScore: action.payload.playerScore,
                dealerScore: action.payload.dealerScore,
                gameState: Game.STARTED
            }
        }

        case 'UPDATE_STATE':
        {
            return {
                ...state,
                gameState: action.payload
            }
        }
        // Update state when a player "hits"
        case 'UPDATE_PLAYER':
        {
            return{
                ...state,
                cardDeck : action.payload.deck,
                playerHand: action.payload.playerHand,
                playerScore: action.payload.playerScore,
            }
        }
        // Update state when dealer is drawing cards
        case 'UPDATE_DEALER':
        {
            return{
                ...state,
                cardDeck : action.payload.deck,
                dealerHand: action.payload.dealerHand,
                dealerScore: action.payload.dealerScore,
            }
        }
        // Reset state to initial state
        case 'RESET':
        {
            return {
                ...state,
                cardDeck : [],
                playerHand: [],
                dealerHand: [],
                playerScore: 0,
                dealerScore: 0,
                gameState: Game.INIT
            }
        }
    }
}

const initialState = {
    cardDeck : [],
    playerHand: [],
    dealerHand: [],
    playerScore: 0,
    dealerScore: 0,
    gameState: Game.INIT
}
