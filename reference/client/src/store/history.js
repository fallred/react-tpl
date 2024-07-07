import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from "redux-first-history";
export const history = createBrowserHistory();
const { routerReducer, routerMiddleware, createReduxHistory } = createReduxHistoryContext({ history });
export {
    routerReducer,
    routerMiddleware,
    createReduxHistory
}