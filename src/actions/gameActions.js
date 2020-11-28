export const gameActions = (dispatch) => ({
    startGame: (payload) => dispatch({type: 'startGame', payload: payload}),
    endGame: (payload) => dispatch({type: 'endGame', payload: payload}),
    updatePlayer: (payload) => dispatch({type: 'updatePlayer', payload: payload}),
    updateDealer: (payload) => dispatch({type: 'updateDealer', payload: payload}),
    reset : () => dispatch({type: 'reset'}),
    closeModal: () => dispatch({type: 'closeModal'})
})
