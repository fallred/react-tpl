import * as actionTypes from '../action-types';
const initialState = {
    number:0
}
export default function(state=initialState,action){
    switch(action.type){
        case actionTypes.ADD:
           state.number+=1;
           return state;
        default:
            return state;    
    }
}