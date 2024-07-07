import {LOGIN_STATES} from '@/constants';
import * as actionTypes from '../action-types';
//定义初始状态
const initialState = {
    loginState:LOGIN_STATES.UN_VALIDATE,//默认值是未验证
    error:null,//存放后台返回的登录错误对象
    user:null,//如果当前的登录登录了，会把登录的信息放在这里保存
}
export default function(state=initialState,action){
    switch(action.type){
        case actionTypes.VALIDATE:
            //如果携带的数据中表示success为true,表示验证登录状态成功
            //if(action?.payload?.success){}//
            if(action.error){//说明验证登录状态失败
                return {
                    ...state,
                    error:action.payload,//错误对象就是动作的payload属性
                    user:null,//清除登录用户信息
                    loginState:LOGIN_STATES.UN_LOGIN//登录状态为已登录
                }
            }else{//否则表示验证登录状态成功
                return {
                    ...state,
                    loginState:LOGIN_STATES.LOGIN_ED,//状态变成登录态
                    user:action.payload.data,//取出来当前的登录用户信息保存到仓库中
                    error:null//清除错误信息
                }
            }
        case actionTypes.LOGOUT://如果退出登录的话，清除仓库中保存的数据
            return {
                ...state,
                loginState:LOGIN_STATES.UN_LOGIN,
                user:null,
                error:null
            }
         //如果是想修改头像的话
        case actionTypes.CHANGE_AVATAR:
            return {
                ...state,
                user:{...state.user,avatar:action.payload}
            }    
        default:
            return state;
    }
}