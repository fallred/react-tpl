import { routerReducer } from '../history';
import home from './home';
import cart from './cart';
import profile from './profile';
import { combineReducers } from 'redux-immer';
import {produce} from 'immer';
console.log(produce);
const rootReducer = combineReducers(produce,{
    router:routerReducer,
    home,
    cart,
    profile
});
export default rootReducer;