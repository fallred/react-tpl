import React from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';
import { history, store, persistedStore } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Mask } from 'antd-mobile';
import Tabs from './components/Tabs';
import Counter from './views/Counter';
import './styles/global.less';
const Home = React.lazy(() => import('./views/Home'));
const Cart = React.lazy(() => import('./views/Cart'));
const Login = React.lazy(() => import('./views/Login'));
const Register = React.lazy(() => import('./views/Register'));
const Profile = React.lazy(() => import('./views/Profile'));
const LessonDetail = React.lazy(() => import('./views/LessonDetail'));
const root = createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistedStore} loading={<Mask visible={true} />}>
            <HistoryRouter history={history}>
                <React.Suspense fallback={<Mask visible={true} />}>
                    <main className='main-container'>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/detail/:id" element={<LessonDetail />} />
                            <Route path="/counter" element={<Counter />} />
                        </Routes>
                    </main>
                </React.Suspense>
                <Tabs />
            </HistoryRouter>
        </PersistGate>

    </Provider>
);
