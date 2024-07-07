import {createBrowserHistory} from 'history';
import {createReduxHistoryContext} from 'redux-first-history';
//创建基于浏览器历史对象的history对象
const history = createBrowserHistory()
const {
    routerReducer,//状态计算函数，会用在合并reducers
    routerMiddleware,//路由中间件，可以拦截跳转路径的动作，进行路径的跳转
    createReduxHistory//创建redux优先的历史对象
} = createReduxHistoryContext({history})
export {
    routerReducer,
    routerMiddleware,
    createReduxHistory
}
