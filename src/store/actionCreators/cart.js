import { Toast } from 'antd-mobile';
import * as actionTypes from '../action-types';
const actionCreators = {
    addCartItem(lesson){
        return function(dispatch){
            dispatch({
                type:actionTypes.ADD_CART_ITEM,
                payload:lesson
            })
            Toast.show('添加课程成功');
        }
    },
    removeCartItem(id){
        return {
            type:actionTypes.REMOVE_CART_ITEM,
            payload:id
        }
    },
    clearCartItems(){
        return {
            type:actionTypes.CLEAR_CART_ITEMS
        }
    },
    changeCartItemCount(id,count){
        return {
            type:actionTypes.CHANGE_CART_ITEM_COUNT,
            payload:{
                id,count
            }
        }
    },
    changeCheckedCartItem(checkedIds){
        return {
            type:actionTypes.CHANGE_CHECKED_CART_ITEM,
            payload:checkedIds
        }
    },
    settle(){
        return {
            type:actionTypes.SETTLE
        }
    }
}
export default actionCreators;