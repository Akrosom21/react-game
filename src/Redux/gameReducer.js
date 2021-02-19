const SET_PLAYER_ITEM = 'game/SET_PLAYER_ITEM'
const SET_AUTO_ITEM = 'game/SET_AUTO_ITEM'
const RESET_AUTO_ITEM = 'game/RESET_AUTO_ITEM'
const SET_SCORE = 'game/SET_SCORE'

export const setPlayerItem = (item) => ({type: SET_PLAYER_ITEM, item})
export const setAutoItem = (item) => ({type: SET_AUTO_ITEM, item})
export const resetAutoItem = () => ({type: RESET_AUTO_ITEM})
export const setScore = (score, scoreText) => ({type: SET_SCORE, score, scoreText})

const initialState = {
    playItems: ['rock', 'paper', 'scissors']
}
export const gameReducer = (state = initialState, action) => {
    const stateCopy = {...state}
    switch (action.type) {
        case SET_PLAYER_ITEM:
            return {
                ...state,
                playerItem: action.item
            }
        case SET_AUTO_ITEM:
            debugger
            return {
                ...state,
                autoPickedItem:
                    action.item === 1 ? 'rock' :
                        action.item === 2 ? 'paper' :
                            action.item === 3 ? 'scissors' : '',
            }
        case RESET_AUTO_ITEM:
            return {
                ...state,
                autoPickedItem: '',
                scoreText: ''
            }
        case SET_SCORE:
            return {
                ...state,
                score: state.score + action.score,
                scoreText: action.scoreText
            }
        default:
            return stateCopy
    }
}