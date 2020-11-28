import {Game} from "../constants/gameConstants";

export const gameReducer = (state, action) => {
    switch (action.type) {
        // Setting data at the start of a new game
        case 'startGame': {
            return {
                ...state,
                playerHand: action.payload.playerHand,
                dealerHand: action.payload.dealerHand,
                playerScore: action.payload.playerScore,
                dealerScore: action.payload.dealerScore,
                gameState: Game.STARTED
            }
        }

        // Update game state and display modal
        case 'endGame': {
            return {
                ...state,
                gameState: Game.END,
                show: true,
                message: action.payload
            }
        }

        // Update state when a player "hits"
        case 'updatePlayer': {
            return {
                ...state,
                playerHand: action.payload.playerHand,
                playerScore: action.payload.playerScore,
            }
        }
        // Update state when dealer is drawing cards
        case 'updateDealer': {
            return {
                ...state,
                dealerHand: action.payload.dealerHand,
                dealerScore: action.payload.dealerScore,
            }
        }
        // Reset state to initial state
        case 'reset': {
            return {
                ...state,
                playerHand: [],
                dealerHand: [],
                playerScore: 0,
                dealerScore: 0,
                gameState: Game.INIT
            }
        }

        // Close the modal
        case 'closeModal': {
            return {
                ...state,
                show: false,
                message: ''
            }
        }
    }
}
