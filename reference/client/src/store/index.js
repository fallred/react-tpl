import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { routerMiddleware } from './history';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}
const persistedReducer = persistReducer(persistConfig, reducers)
const store = applyMiddleware(thunk, routerMiddleware, promise, logger)(createStore)(persistedReducer);
let persistor = persistStore(store);
export { store, persistor };