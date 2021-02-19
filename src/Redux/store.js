import {combineReducers, compose, createStore} from "redux";
import {gameReducer} from "./gameReducer";

let reducers = combineReducers({
game: gameReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers())