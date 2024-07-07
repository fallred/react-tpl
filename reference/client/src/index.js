import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import {Mask} from 'antd-mobile';
import { store, persistor } from "./store";
import "./styles/global.less";
import Tabs from "./components/Tabs";
const Home = React.lazy(() => import("./views/Home"));
const Profile = React.lazy(() => import("./views/Profile"));
const Register = React.lazy(() => import("./views/Register"));
const Login = React.lazy(() => import("./views/Login"));
const Detail = React.lazy(() => import("./views/Detail"));
const Cart = React.lazy(() => import("./views/Cart"));
import { HistoryRouter } from "redux-first-history/rr6";
import { PersistGate } from 'redux-persist/integration/react'
import {history} from "./store/history";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<PersistGate loading={<Mask visible={true} />} persistor={persistor}>
			<HistoryRouter history={history}>
				<React.Suspense fallback={<Mask visible={true} />}>
				<main className="main-container">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/register" element={<Register/>} />
						<Route path="/login" element={<Login/>} />
						<Route path="/detail/:id" element={<Detail/>} />
					</Routes> 
				</main>
				</React.Suspense>
				<Tabs />
			</HistoryRouter>
		</PersistGate>
	</Provider>
);