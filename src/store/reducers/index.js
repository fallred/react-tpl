//import {combineReducers} from 'redux';
import {combineReducers} from 'redux-immer';
import {routerReducer} from '@/history';
import home from './home';
import cart from './cart';
import profile from './profile';
import counter from './counter';
import {produce} from 'immer';
//router状态切片 {pathname:'/'}
let reducers = {
    //当页面路径发生改变后，会向仓库派发一个动作@@router/LOCATION_CHANGE
    //把最新的路径传过来，传过来以后会交给此reducer计算新状态
    // 保存最新的路径到仓库中去 {}
    router:routerReducer,
    home,
    cart,
    profile,
    counter
}
//把多个reducers合并成一个reducer
let combinedReducer = combineReducers(produce,reducers);
//默认导出此合并后的reducer
export default combinedReducer;

/* let rootState = {
    router:{pathname:'/counter'},
    home:{},
    cart:{},
    profile:{}
}
 */