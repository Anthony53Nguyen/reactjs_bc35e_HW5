import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { BurgerReducer } from './reducers/BurgerReducer'

const rootReducer = combineReducers({
   BurgerReducer,
})

export const store = configureStore({
    reducer: rootReducer
})

