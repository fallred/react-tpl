import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import combinedReducer from './reducers';
import {createReduxHistory,routerMiddleware} from '../history'
//定义持久化的配置
const persistConfig = {
    key:'root',
    storage,//指的是把数据存放到localStorage中
    whitelist:['cart']//把哪个状态分片保存到localStorage中
}
//根据存储持久化配置对象，和合并过的reducer计算出一个持久化的reducer
const persistedReducer = persistReducer(persistConfig,combinedReducer);
//创建仓库
const store = applyMiddleware(
    routerMiddleware,promise,thunk,logger)(createStore)(persistedReducer);
//创建持久化仓库
const persistedStore = persistStore(store);
//根据仓库创建基于 redux的历史对象
const history = createReduxHistory(store);
export {
    store,
    history,
    persistedStore
}

