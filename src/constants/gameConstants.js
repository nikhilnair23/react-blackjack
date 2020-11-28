export const suits = ['S', 'H', 'D', 'C'];
export const values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

// Different Game States
export const Game = {
    INIT: 'init',
    STARTED: 'started',
    END: 'end',
}

// Values that are returned when checking for a winner
export const GameResults = {
    NO_WINNER: "No winner yet",
    PLAYER_WINS: "Congrats you won!",
    DEALER_WINS: "Dealer wins! Better luck next time!",
    TIE: "Game ends as a tie"
}

export const initialState = {
    playerHand: [],
    dealerHand: [],
    playerScore: 0,
    dealerScore: 0,
    gameState: Game.INIT,
    message: '',
    show: false
}
