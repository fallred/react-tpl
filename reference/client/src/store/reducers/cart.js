import * as actionTypes from "@/store/action-types";
let initialState = [];
export default function (state = initialState,action) {
  switch (action.type) {
    case actionTypes.ADD_CART_ITEM:
      let oldIndex = state.findIndex(
        (item) => item.lesson.id === action.payload.id
      );
      if (oldIndex == -1) {
        state.push({
          checked: false,
          count: 1,
          lesson: action.payload,
        });
      } else {
        state[oldIndex].count +=1;
      }
      break;
    case actionTypes.REMOVE_CART_ITEM:
      let removeIndex = state.findIndex(
        (item) => item.lesson.id === action.payload
      );
      state.splice(removeIndex,1);
      break;
    case actionTypes.CLEAR_CART_ITEMS:
      state.length = 0;
      break;
    case actionTypes.CHANGE_CART_ITEM_COUNT:
      let index = state.findIndex(
        (item) => item.lesson.id === action.payload.id
      );
      state[index].count=action.payload.count;
      break;
    case actionTypes.CHANGE_CHECKED_CART_ITEMS:
      let checkedIds = action.payload;
      state.forEach((item)=>{
        if(checkedIds.includes(item.lesson.id)){
          item.checked =true;
        }else{
          item.checked =false;
        }
      });
      break;
    case actionTypes.SETTLE:
      state = state.filter((item) => !item.checked);
      break;
    default:
      break;
  }
    return state;
}