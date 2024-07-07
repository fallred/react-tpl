## 1.项目介绍
### 1.1 用例图
- 用例图(use case diagram)是用户与系统交互的最简表示形式，展现了用户和与他相关的用例之间的关系

![uescase](https://static.zhufengpeixun.com/usecase_1689590467284.jpg)


### 1.2 流程图
#### 1.2.1 注册登录
![注册登录](https://static.zhufengpeixun.com/signupsignin_1689590498238.jpg)

#### 1.2.2 购买课程

![gou_mai](https://static.zhufengpeixun.com/buycourse_1689590525292.jpg)


## 2. 搭建开发环境
### 2.1 本节目录
```js
.
├── package.json
├── public
│   └── index.html
├── src
│   └── index.js
├── static
│   └── setRemUnit.js
└── webpack.config.js
```

### 2.2 初始化项目
```js
mkdir zhufengketangclient
cd zhufengketangclient
npm init -y
```

### 2.3 安装依赖
```js
npm install react react-dom antd-mobile @ant-design/icons react-router-dom redux redux-logger redux-promise redux-thunk react-redux redux-first-history axios redux-persist redux-immer immer --save
npm install webpack webpack-cli webpack-dev-server babel-loader @babel/preset-env @babel/preset-react style-loader css-loader less-loader less  copy-webpack-plugin  html-webpack-plugin px2rem-loader --save-dev
```

### 2.4 编写 webpack 配置文件
webpack.config.js
```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
    mode: process.env.NODE_ENV == "production" ? "production" : "development", //默认是开发模块
    entry: {
        main: "./src/index.js"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js"，
        publicPath: "/"
    },
    devtool: "source-map",
    devServer: {
        hot: true,
        static: path.join(__dirname, "static"),
        historyApiFallback: true
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ]
                },
                include: path.resolve('src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader"
                    },
                    "less-loader",
                ],
            },
            {
                test: /\.(jpg|png|gif|svg|jpeg)$/,
                type: 'asset'
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'static'), to: path.resolve(__dirname, 'dist') }
            ]
        })
    ],
};
```

### 2.5 src\index.js
src\index.js
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<div>hello</div>
);
```

### 2.6 public\index.html
public\index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>珠峰课堂</title>
  </head>
  <body>
    <div id="root"></div>
   <script src="/setRemUnit.js"></script>
  </body>
</html>
```

### 2.7 setRemUnit.js
static\setRemUnit.js
```js
let docEle = document.documentElement;
function setRemUnit() {
  docEle.style.fontSize = docEle.clientWidth / 10 + "px";
}
setRemUnit();
window.addEventListener("resize", setRemUnit);
```

### 2.8 package.json
```json
{
  "name": "zhufengketangclient",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "webpack serve",
    "build": "webpack"
  },
  "license": "MIT",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@babel/preset-env": "^7.22.9",
    "@babel/preset-react": "^7.22.5",
    "babel-loader": "^9.1.3",
    "copy-webpack-plugin": "^11.0.0",
    "css-loader": "^6.8.1",
    "html-webpack-plugin": "^5.5.3",
    "less": "^4.1.3",
    "less-loader": "^11.1.3",
    "style-loader": "^3.3.3",
    "webpack": "^5.88.1",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
  }
}
```

## 3.实现底部路由
### 3.1 参考
#### 3.1.1 介绍
- 这一章我们开始配置路由,我们的应用在尾部有三个页签,分别对应首页,购物车和个人中心三个页面
- 在本章节我们实践以下内容
  - 1. 如何使用 react 全家桶配置路由
  - 2. 如何按需加载`antd-mobile`并使用图标组件
  - 3. 如何在 react 样式中使用`less`编写样式
  - 4. 如何在移动端中使用 `rem` 实现布局以及如何使用 `flex`布局

#### 3.1.2 目录
```js
.
├── package.json
├── public
│   └── index.html
├── src
│   ├── components
│   │   └── Tabs
│   │       ├── index.js
│   │       └── index.less
│   ├── index.js
│   ├── store
│   │   ├── action-types.js
│   │   ├── history.js
│   │   ├── index.js
│   │   └── reducers
│   │       ├── cart.js
│   │       ├── home.js
│   │       ├── index.js
│   │       └── profile.js
│   ├── styles
│   │   └── global.less
│   └── views
│       ├── Cart
│       │   └── index.js
│       ├── Home
│       │   └── index.js
│       └── Profile
│           └── index.js
├── static
│   └── setRemUnit.js
└── webpack.config.js
```

#### 3.1.3 效果预览

![day1](https://static.zhufengpeixun.com/zhufengketangday1_1689590571406.gif)

#### 3.1.4 页面布局
![tabs](https://static.zhufengpeixun.com/tabs_1689590614959.png)

### 3.2 src\index.js
src\index.js
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store, history } from "./store";
import "./styles/global.less";
import Tabs from "./components/Tabs";
import Home from "./views/Home";
import Cart from "./views/Cart";
import Profile from "./views/Profile";
import { HistoryRouter } from "redux-first-history/rr6";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<HistoryRouter history={history}>
			<main className="main-container">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Cart" element={<Cart />} />
					<Route path="/profile" element={<Profile />} />
				</Routes>
			</main>
			<Tabs />
		</HistoryRouter>
	</Provider>
);
```

### 3.3 global.less

src\styles\global.less

```less
*{
    padding: 0;
    margin: 0;
}
ul,li{
    list-style: none;
}
#root{
    margin:0 auto;
    max-width: 750px;
    box-sizing: border-box;
}
.main-container{
    padding:100px 0 120px 0;
}
```

### 3.4 Tabs\index.js

src\components\Tabs\index.js

```js
import React from "react";
import { NavLink } from "react-router-dom";
import { HomeOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import "./index.less";
function Tabs() {
    return (
        <footer>
            <NavLink to="/" >
                <HomeOutlined />
                <span>首页</span>
            </NavLink>
            <NavLink to="/cart">
                <ShoppingCartOutlined />
                <span>购物车</span>
            </NavLink>
            <NavLink to="/profile">
                <UserOutlined />
                <span>个人中心</span>
            </NavLink>
        </footer>
    );
}
export default Tabs;
```

### 3.5 Tabs\index.less

src\components\Tabs\index.less

```less
footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 120px;
    z-index: 1000;
    background-color: #fff;
    border-top: 1px solid #d5d5d5;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #000;
      span {
        font-size: 30px;
        line-height: 50px;
        &.anticon {
          font-size: 50px;
        }
      }
      &.active {
        color: orangered;
        font-weight: bold;
      }
    }
  }
```

### 3.6 history.js

src\store\history.js

```js
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from "redux-first-history";
const history = createBrowserHistory();
const { routerReducer, routerMiddleware, createReduxHistory } = createReduxHistoryContext({ history });
export {
    routerReducer,
    routerMiddleware,
    createReduxHistory
}
```

### 3.7 action-types.js

src\store\action-types.js

```js

```

### 3.8 reducers\home.js

src\store\reducers\home.js

```js
let initialState = {};
export default function (state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
```

### 3.9 reducers\cart.js
src\store\reducers\cart.js

```js
let initialState = {};
export default function (state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
```

### 3.10 reducers\profile.js
src\store\reducers\profile.js
```js
let initialState = {};
export default function (state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
```

### 3.11 reducers\index.js

src\store\reducers\index.js

```js
import { combineReducers } from 'redux';
import { routerReducer } from '../history';
import home from './home';
import cart from './cart';
import profile from './profile';
const rootReducer = combineReducers({
    router:routerReducer,
    home,
    cart,
    profile
});
export default rootReducer;
```

### 3.12 store\index.js

src\store\index.js

```js
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { routerMiddleware, createReduxHistory } from './history';
export const store = applyMiddleware(thunk, routerMiddleware, promise, logger)(createStore)(reducers);
export const history = createReduxHistory(store);
```

### 3.13 Home\index.js

src\views\Home\index.js

```js
import React from "react";
function Home() {
    return <div>Home</div>;
}
export default Home;
```

### 3.14 Cart\index.js

src\views\Cart\index.js

```js
import React from "react";
function Cart() {
    return <div>Cart</div>;
}
export default Cart;
```

### 3.15 Profile\index.js

src\views\Profile\index.js

```js
import React from "react";
function Profile() {
    return <div>Profile</div>;
}
export default Profile;
```

## 4. 实现首页头部导航

### 4.1 参考
#### 4.1.1 文档
- 本章我们将要实现首页的头部导航
- 本章我们要掌握的知识点
  - React 动画库的使用
  - 如何创建 redux 仓库以及如何关联组件

#### 4.1.2 logo图
![logo](https://img.zhufengpeixun.com/logo.png)

#### 4.1.3 本章代码
```js
.
├── package.json
├── public
│   └── index.html
├── src
│   ├── assets
│   │   └── images
│   │       └── logo.png
│   ├── components
│   │   └── Tabs
│   │       ├── index.js
│   │       └── index.less
│   ├── index.js
│   ├── store
│   │   ├── actions
│   │   │   └── home.js
│   │   ├── action-types.js
│   │   ├── history.js
│   │   ├── index.js
│   │   └── reducers
│   │       ├── cart.js
│   │       ├── home.js
│   │       ├── index.js
│   │       └── profile.js
│   ├── styles
│   │   └── global.less
│   └── views
│       ├── Cart
│       │   └── index.js
│       ├── Home
│       │   ├── components
│       │   │   └── HomeHeader
│       │   │       ├── index.js
│       │   │       └── index.less
│       │   ├── index.js
│       │   └── index.less
│       └── Profile
│           └── index.js
├── static
│   └── setRemUnit.js
```

#### 4.1.4 效果预览
![homenavigation](https://static.zhufengpeixun.com/homenavigation_1689647098182.gif)

#### 4.1.5 本章布局

![home-header.png](https://static.zhufengpeixun.com/homeheader_1689647135383.png)

### 4.2 HomeHeader\index.js

src\views\Home\components\HomeHeader\index.js

```js
import React, { useState } from 'react';
import { BarsOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { Transition } from 'react-transition-group';
import logo from '@/assets/images/logo.png';
import './index.less';
const duration = 1000;
const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}
const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
};
function HomeHeader(props) {
    let [isMenuVisible, setIsMenuVisible] = useState(false);
    const setCurrentCategory = (event) => {
        let { target } = event;
        let category = target.dataset.category;
        props.setCurrentCategory(category);
        setIsMenuVisible(false);
    }
    return (
        <header className="home-header">
            <div className="logo-header">
                <img src={logo} />
                <BarsOutlined onClick={() => setIsMenuVisible(!isMenuVisible)} />
            </div>
            <Transition in={isMenuVisible} timeout={duration}>
                {
                    (state) => (
                        <ul
                            className="category"
                            onClick={setCurrentCategory}
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}
                        >
                            <li data-category="all" className={classnames({ active: props.currentCategory === 'all' })}>全部课程</li>
                            <li data-category="react" className={classnames({ active: props.currentCategory === 'react' })}>React课程</li>
                            <li data-category="vue" className={classnames({ active: props.currentCategory === 'vue' })}>Vue课程</li>
                        </ul>
                    )
                }
            </Transition>
        </header>
    )
}
export default HomeHeader;
```

### 4.3 HomeHeader\index.less

src\views\Home\components\HomeHeader\index.less

```less
@BG: #2a2a2a;

.home-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;

    .logo-header {
        height: 100px;
        background: @BG;
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
            width: 200px;
            margin-left: 20px;
        }

        span.anticon.anticon-bars {
            font-size: 60px;
            margin-right: 20px;
        }
    }

    .category {
        position: absolute;
        width: 100%;
        top: 100px;
        left: 0;
        background: @BG;

        li {
            line-height: 60px;
            text-align: center;
            color: #fff;
            font-size: 30px;
            border-top: 1px solid lighten(@BG, 20%);

            &.active {
                color: red;
            }
        }
    }
}
```

### 4.4 action-types.js

src\store\action-types.js

```diff
+export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
```

### 4.5 reducers\home.js

src\store\reducers\home.js

```diff
+import * as actionTypes from "../action-types";
let initialState = {
+   currentCategory: 'all'
};
export default function (state = initialState, action) {
    switch (action.type) {
+       case actionTypes.SET_CURRENT_CATEGORY:
+           return { ...state, currentCategory: action.payload };
        default:
            return state;
    }
}
```

### 4.6 actions\home.js

src\store\actions\home.js

```js
import * as actionTypes from "../action-types";
export default {
  setCurrentCategory(currentCategory) {
    return { type: actionTypes.SET_CURRENT_CATEGORY, payload: currentCategory };
  },
};
```

### 4.7 Home\index.js

src\views\Home\index.js

```diff
import React from "react";
+import actions from '@/store/actions/home';
+import HomeHeader from './components/HomeHeader';
+import { connect } from 'react-redux';
+import './index.less';
function Home(props) {
    return (
+       <>
+           <HomeHeader
+               currentCategory={props.currentCategory}
+               setCurrentCategory={props.setCurrentCategory}
+           />
+       </>
    )
}
+let mapStateToProps = (state) => state.home;
+export default connect(
+    mapStateToProps,
+    actions
+)(Home);
```

### 4.8 Home\index.less
src\views\Home\index.less
```less
```

## 5. 个人中心
- 本章主要编写`Profile`组件,就是切换到个人中心页的时候,先发起一个 ajax 请求判断此用户是否登录,如果已经登录的话显示用户信息,如果未登录的请提示跳转到登录和注册页
- 本章实践的内容
  - 路由的切换
  - 如何在 hooks 中发起 ajax 请求
  - 如何保存及发送时携带 jwt 和 token
  - 如何根据环境不同加载不同的接口地址
  - 如何编写`axios`拦截器

### 5.1  参考
#### 5.1.1 本章目录
```js
├── package.json
├── public
│   └── index.html
├── src
│   ├── api
│   │   ├── index.js
│   │   └── profile.js
│   ├── assets
│   │   └── images
│   │       └── logo.png
│   ├── components
│   │   ├── NavHeader
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   └── Tabs
│   │       ├── index.js
│   │       └── index.less
│   ├── constants.js
│   ├── index.js
│   ├── store
│   │   ├── actions
│   │   │   ├── home.js
│   │   │   └── profile.js
│   │   ├── action-types.js
│   │   ├── history.js
│   │   ├── index.js
│   │   └── reducers
│   │       ├── cart.js
│   │       ├── home.js
│   │       ├── index.js
│   │       └── profile.js
│   ├── styles
│   │   └── global.less
│   └── views
│       ├── Cart
│       │   └── index.js
│       ├── Home
│       │   ├── components
│       │   │   └── HomeHeader
│       │   │       ├── index.js
│       │   │       └── index.less
│       │   ├── index.js
│       │   └── index.less
│       └── Profile
│           ├── index.js
│           └── index.less
├── static
│   └── setRemUnit.js
└── webpack.config.js
```

#### 5.1.2 本章效果

![profileroute](https://static.zhufengpeixun.com/profileroute_1689649215162.gif)

### 5.2 Profile\index.js

src\views\Profile\index.js

```js
import React, { useEffect } from "react";
import { Button, List, Toast, Result,Mask } from "antd-mobile";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import actions from "@/store/actions/profile";
import NavHeader from "@/components/NavHeader";
import { LOGIN_TYPES } from '@/constants';
import "./index.less";
function Profile(props) {
    const navigate = useNavigate();
    useEffect(() => {
        if (props.loginState == LOGIN_TYPES.UN_VALIDATE)
            props.validate().catch(() => Toast.show({
                icon:'fail',
                content:`验证失败`
            }));
    }, []);
    let content=null;
    switch (props.loginState) {
        case LOGIN_TYPES.UN_VALIDATE:
            content =  <Mask visible={true} />;
            break;
        case LOGIN_TYPES.LOGINED:
            content = (
                <div className="user-info">
                    <List renderHeader={() => '当前登录用户'}>
                        <List.Item extra="珠峰架构">用户名</List.Item>
                        <List.Item extra="15718856132">手机号</List.Item>
                        <List.Item extra="zhangsan@qq.com">邮箱</List.Item>
                    </List>
                    <Button type="primary">退出登录</Button>
                </div>
            );
            break;
        case LOGIN_TYPES.UNLOGIN:
            content = (
                <Result
                status='warning'
                title='亲爱的用户你好，你当前尚未登录，请你选择注册或者登录'
                description={
                    <div style={{ textAlign: "center", padding: "50px" }}>
                        <Button type="ghost" onClick={() => navigate("/login")}>登录</Button>
                        <Button
                            type="ghost"
                            style={{ marginLeft: "50px" }}
                            onClick={() => navigate("/register")}
                        >注册</Button>
                    </div>
                }
              />
            )
    }
    return (
        <section>
            <NavHeader >个人中心</NavHeader>
            {content}
        </section>
    );
}
let mapStateToProps = (state) => state.profile;
export default connect(mapStateToProps, actions)(Profile);
```

### 5.3 Profile\index.less

src\views\Profile\index.less

```less
.user-info {
    padding: 20px;
}
```

### 5.4 action-types.js

src\store\action-types.js

```diff
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
+export const VALIDATE = 'VALIDATE';
```

### 5.5 constants.js

src\constants.js

```js
export const LOGIN_TYPES = {
  UN_VALIDATE: "UN_VALIDATE",
  LOGINED: "LOGINED",
  UNLOGIN: "UNLOGIN"
};
```

### 5.6 profile.js

src\store\reducers\profile.js

```js
import * as actionTypes from "../action-types";
import { LOGIN_TYPES } from "@/constants";
let initialState = {
  loginState: LOGIN_TYPES.UN_VALIDATE,
  user: null,
  error: null
};
export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.VALIDATE:
      if (action.payload.success) {
        return { ...state,
          loginState: LOGIN_TYPES.LOGINED,
          user: action.payload.data,
          error: null
        };
      } else {
        return { ...state,
          loginState: LOGIN_TYPES.UNLOGIN,
          user: null,
          error: action.payload
        };
      }
    default:
      return state;
  }
}
```

### 5.7 profile.js

src\store\actions\profile.js

```js
import * as actionTypes from "../action-types";
import { validate } from "@/api/profile";
export default {
  validate() {
    return {
      type: actionTypes.VALIDATE,
      payload: validate()
    };
  },
};
```

### 5.8 api\index.js

src\api\index.js

```js
import axios from "axios";
axios.defaults.baseURL = "http://ketang.zhufengpeixun.com";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.interceptors.request.use(
  (config) => {
    let access_token = sessionStorage.getItem("access_token");
    config.headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
export default axios;
```

### 5.10 api\profile.js

src\api\profile.js

```js
import axios from "./";
export function validate() {
  return axios.get("/user/validate");
}
```

### 5.11 NavHeader\index.js

src\components\NavHeader\index.js

```js
import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import "./index.less";
export default function NavHeader(props) {
    const { navigator } = React.useContext(NavigationContext);
    return (
        <div className="nav-header">
            <LeftOutlined onClick={() => navigator.back()} />
            {props.children}
        </div>
    );
}
```

### 5.12 NavHeader\index.less
src\components\NavHeader\index.less

```less
.nav-header {
  position: fixed;
  left: 0;
  top: 0;
  height: 100px;
  z-index: 1000;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  line-height: 100px;
  background-color: #2a2a2a;
  color: #fff;
  font-size: 35px;
  span {
    position: absolute;
    left: 20px;
    line-height: 100px;
  }
}
```

## 6. 注册登陆
- 本章我们主要是实现注册登录的功能
- 本章主要要实践的内容
  - 如何使用`antd-mobile`中的表单功能

### 6.1 参考
#### 6.1.1 目录结构
```js
.
├── package.json
├── public
│   └── index.html
├── src
│   ├── api
│   │   ├── index.js
│   │   └── profile.js
│   ├── assets
│   │   └── images
│   │       └── logo.png
│   ├── components
│   │   ├── NavHeader
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   └── Tabs
│   │       ├── index.js
│   │       └── index.less
│   ├── constants.js
│   ├── index.js
│   ├── store
│   │   ├── actions
│   │   │   ├── home.js
│   │   │   └── profile.js
│   │   ├── action-types.js
│   │   ├── history.js
│   │   ├── index.js
│   │   └── reducers
│   │       ├── cart.js
│   │       ├── home.js
│   │       ├── index.js
│   │       └── profile.js
│   ├── styles
│   │   └── global.less
│   └── views
│       ├── Cart
│       │   └── index.js
│       ├── Home
│       │   ├── components
│       │   │   └── HomeHeader
│       │   │       ├── index.js
│       │   │       └── index.less
│       │   ├── index.js
│       │   └── index.less
│       ├── Login
│       │   ├── index.js
│       │   └── index.less
│       ├── Profile
│       │   ├── index.js
│       │   └── index.less
│       └── Register
│           ├── index.js
│           └── index.less
├── static
│   └── setRemUnit.js
└── webpack.config.js
```

#### 6.1.2 本章效果

![registerlogin](https://static.zhufengpeixun.com/registerlogin_1689668336719.gif)

### 6.2 src\index.js

src\index.js

```diff
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store, history } from "./store";
import "./styles/global.less";
import Tabs from "./components/Tabs";
import Home from "./views/Home";
import Cart from "./views/Cart";
+import Profile from "./views/Profile";
+import Register from "./views/Register";
import Login from "./views/Login";
import { HistoryRouter } from "redux-first-history/rr6";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<HistoryRouter history={history}>
			<main className="main-container">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/profile" element={<Profile />} />
+					<Route path="/register" element={<Register/>} />
+          <Route path="/login" element={<Login/>} />
				</Routes>
			</main>
			<Tabs />
		</HistoryRouter>
	</Provider>
);
```

### 6.3 api\profile.js

src\api\profile.js

```diff
import axios from "./";
export function validate() {
  return axios.get("/user/validate");
}
+export function register(values) {
+        return axios.post('/user/register', values);
+}
+export function login(values) {
+    return axios.post('/user/login', values);
+}
```

### 6.4 Profile\index.js

src\views\Profile\index.js

```diff
import React, { useEffect } from "react";
import { Button, List, Toast, Result,Mask } from "antd-mobile";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import actions from "@/store/actions/profile";
import NavHeader from "@/components/NavHeader";
import { LOGIN_TYPES } from '@/constants';
import "./index.less";
function Profile(props) {
    const navigate = useNavigate();
    useEffect(() => {
+       props.validate();
    }, []);
    let content=null;
    switch (props.loginState) {
        case LOGIN_TYPES.UN_VALIDATE:
            content =  <Mask visible={true} />;
            break;
        case LOGIN_TYPES.LOGINED:
            content = (
                <div className="user-info">
+                   <List renderHeader={() => '当前登录用户'}>
+                       <List.Item extra={props.user.username}>用户名</List.Item>
+                       <List.Item extra={props.user.email}>邮箱</List.Item>
+                   </List>
+                   <Button type="primary" onClick={() => props.logout() }>退出登录</Button>
                </div>
            );
            break;
        case LOGIN_TYPES.UNLOGIN:
            content = (
                <Result
                status='warning'
                title='亲爱的用户你好，你当前尚未登录，请你选择注册或者登录'
                description={
                    <div style={{ textAlign: "center", padding: "50px" }}>
                        <Button type="ghost" onClick={() => navigate("/login")}>登录</Button>
                        <Button
                            type="ghost"
                            style={{ marginLeft: "50px" }}
                            onClick={() => navigate("/register")}
                        >注册</Button>
                    </div>
                }
              />
            )
    }
    return (
        <section>
            <NavHeader >个人中心</NavHeader>
            {content}
        </section>
    );
}
let mapStateToProps = (state) => state.profile;
export default connect(mapStateToProps, actions)(Profile);

```

### 6.5 action-types.js

src\store\action-types.js

```diff
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
export const VALIDATE = 'VALIDATE';
+export const LOGOUT = 'LOGOUT';
```

### 6.6 actions\profile.js

src\store\actions\profile.js

```diff
import * as actionTypes from "../action-types";
+import { validate, register, login } from '@/api/profile';
+import { push } from 'redux-first-history';
+import { Toast } from "antd-mobile";
export default {
  validate() {
    return {
      type: actionTypes.VALIDATE,
      payload: validate()
    };
  },
+ register(values) {
+   return function (dispatch) {
+     (async function () {
+       try {
+         let result = await register(values);
+         if (result.success) {
+           dispatch(push('/login'));
+           Toast.show({
+             icon: 'success',
+             content: `注册成功`
+           })
+         } else {
+           Toast.show({
+             icon: 'fail',
+             content: result.message
+           })
+         }
+       } catch (error) {
+         Toast.show({
+           icon: 'fail',
+           content: `注册失败`
+         })
+       }
+     })();
+   }
+ },
+ login(values) {
+   return function (dispatch) {
+     (async function () {
+       try {
+         let result = await login(values);
+         if (result.success) {
+           sessionStorage.setItem('access_token', result.data.token);
+           Toast.show({
+             icon: 'success',
+             content: `登录成功`
+           })
+           dispatch(push('/profile'));
+         } else {
+           Toast.show({
+             icon: 'fail',
+             content: result.message
+           })
+         }
+       } catch (error) {
+         Toast.show({
+           icon: 'fail',
+           content: `登录失败`
+         })
+       }
+     })();
+   }
+ },
+ logout() {
+   return function (dispatch) {
+     sessionStorage.removeItem('access_token');
+     dispatch({ type: actionTypes.LOGOUT });
+     dispatch(push('/login'));
+   }
+ }
};
```

### 6.7 profile.js
src\store\reducers\profile.js

```diff
import * as actionTypes from "../action-types";
import { LOGIN_TYPES } from "@/constants";
let initialState = {
  loginState: LOGIN_TYPES.UN_VALIDATE,
  user: null,
  error: null
};
export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.VALIDATE:
      if (action.payload.success) {
        return {
          ...state,
          loginState: LOGIN_TYPES.LOGINED,
          user: action.payload.data,
          error: null
        };
      } else {
        return {
          ...state,
          loginState: LOGIN_TYPES.UNLOGIN,
          user: null,
          error: action.payload
        };
      }
+   case actionTypes.LOGOUT:
+     return {
+       ...state,
+       loginState: LOGIN_TYPES.UN_VALIDATE,
+       user: null,
+       error: null,
+     };
    default:
      return state;
  }
}
```
### 6.8 Register\index.js

src\views\Register\index.js

```js
import React from "react";
import { connect } from "react-redux";
import actions from "../../store/actions/profile";
import { Link } from "react-router-dom";
import NavHeader from "../../components/NavHeader";
import { Form, Input, Button, Toast } from "antd-mobile";
import { UserAddOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import "./index.less";

function Register(props) {
    const onFinish = (values) => {
        props.register(values);
    };
    const onFinishFailed = (errorInfo) => {
        Toast.show({
            icon: "fail",
            content: "表单验证失败! " + errorInfo,
        });
    };
    return (
        <>
            <NavHeader>用户注册</NavHeader>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="register-form"
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: "请输入你的用户名!" }]}
                >
                    <Input prefix={<UserAddOutlined />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: "请输入你的密码!" }]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
                </Form.Item>
                <Form.Item
                    label="确认密码"
                    name="confirmPassword"
                    rules={[{ required: true, message: "请输入你的确认密码!" }]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="确认密码"
                    />
                </Form.Item>
                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[{ required: true, message: "请输入你的邮箱!" }]}
                >
                    <Input prefix={<MailOutlined />} type="email" placeholder="邮箱" />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        注册
                    </Button>
                    或者 <Link to="/login">立刻登录!</Link>
                </Form.Item>
            </Form>
        </>
    );
}

let mapStateToProps = (state) => state.profile;
export default connect(mapStateToProps, actions)(Register);
```

### 6.9 Register\index.less
views\Register\index.less

```less
.register-form {
    padding: 20px;
}
```

### 6.10 Login\index.js

src\views\Login\index.js

```js
import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Toast } from "antd-mobile";
import { UserAddOutlined, LockOutlined } from "@ant-design/icons";
import actions from "@/store/actions/profile";
import { Link } from "react-router-dom";
import NavHeader from "@/components/NavHeader";
import "./index.less";

function Login(props) {
    const onFinish = (values) => {
        props.login(values);
    };
    const onFinishFailed = (errorInfo) => {
        Toast.show({
            icon: "fail",
            content: "表单验证失败! " + errorInfo,
        });
    };
    return (
        <>
            <NavHeader>用户登录</NavHeader>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="login-form"
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: "请输入你的用户名!" }]}
                >
                    <Input prefix={<UserAddOutlined />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: "请输入你的密码!" }]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        登录
                    </Button>
                    或者 <Link to="/register">立刻注册!</Link>
                </Form.Item>
            </Form>
        </>
    );
}

const mapStateToProps = (state) => state.profile;
export default connect(mapStateToProps, actions)(Login);
```

### 6.11 Login\index.less
src\views\Login\index.less

```less
.login-form {
    padding: 20px;
}
```

## 7.上传头像
- 本章节我们学习如何向服务器端上传头像
- 本章学习如下内容
  - 如何使用`antd-mobile`的图片上传组件

### 7.1 参考
#### 7.1.1 本章目录
```js
.
├── package.json
├── public
│   └── index.html
├── src
│   ├── api
│   │   ├── index.js
│   │   └── profile.js
│   ├── assets
│   │   └── images
│   │       └── logo.png
│   ├── components
│   │   ├── NavHeader
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   └── Tabs
│   │       ├── index.js
│   │       └── index.less
│   ├── constants.js
│   ├── index.js
│   ├── store
│   │   ├── actions
│   │   │   ├── home.js
│   │   │   └── profile.js
│   │   ├── action-types.js
│   │   ├── history.js
│   │   ├── index.js
│   │   └── reducers
│   │       ├── cart.js
│   │       ├── home.js
│   │       ├── index.js
│   │       └── profile.js
│   ├── styles
│   │   └── global.less
│   └── views
│       ├── Cart
│       │   └── index.js
│       ├── Home
│       │   ├── components
│       │   │   └── HomeHeader
│       │   │       ├── index.js
│       │   │       └── index.less
│       │   ├── index.js
│       │   └── index.less
│       ├── Login
│       │   ├── index.js
│       │   └── index.less
│       ├── Profile
│       │   ├── index.js
│       │   └── index.less
│       └── Register
│           ├── index.js
│           └── index.less
├── static
│   └── setRemUnit.js
└── webpack.config.js
```

#### 7.1.2 本章效果

![uploadavatar.gif](https://static.zhufengpeixun.com/uploadavatar_1689671256572.gif)

### 7.2 Profile\index.js

src\views\Profile\index.js

```diff
+import React, { useEffect,useState } from "react";
+import { Button, List, Toast, Result, Mask,ImageUploader } from "antd-mobile";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import actions from "@/store/actions/profile";
import NavHeader from "@/components/NavHeader";
import { LOGIN_TYPES } from '@/constants';
import "./index.less";
function Profile(props) {
    const navigate = useNavigate();
+   const [fileList, setFileList] = useState(()=>{
+       return props.user?.avatar ? [{url:props.user.avatar}] : [];
+   })
    useEffect(() => {
+       props.validate().then((action)=>{
+          if(action?.payload?.data?.avatar){
+               setFileList([{url:action.payload.data.avatar}]);
+          }
+          return action;
+       },()=>{Toast.show({
+           icon: 'fail',
+           content: `未登录`
+       })})
    }, []);
    let content = null;
    switch (props.loginState) {
        case LOGIN_TYPES.UN_VALIDATE:
            content = <Mask visible={true} />;
            break;
        case LOGIN_TYPES.LOGINED:
+           const uploadImage = async (file) => {
+               let result = await props.uploadAvatar(props.user.id,file);
+               return {url: result.data};
+           };
            content = (
                <div className="user-info">
                    <List renderHeader={() => '当前登录用户'}>
                        <List.Item extra={props.user.username}>用户名</List.Item>
                        <List.Item extra={props.user.email}>邮箱</List.Item>
+                       <List.Item extra={
+                           <ImageUploader
+                               maxCount={1}
+                               onDelete={() => setFileList([])}
+                               accept="image/jpg,image/jpeg,image/png,image/gif"
+                               value={fileList}
+                               upload={uploadImage}
+                               beforeUpload={beforeUpload}
+                               imageFit="fit"
+                           />
+                       }>头像</List.Item>
                    </List>
                    <Button type="primary" onClick={() => props.logout()}>退出登录</Button>
                </div>
            );
            break;
        case LOGIN_TYPES.UNLOGIN:
            content = (
                <Result
                    status='warning'
                    title='亲爱的用户你好，你当前尚未登录，请你选择注册或者登录'
                    description={
                        <div style={{ textAlign: "center", padding: "50px" }}>
                            <Button type="ghost" onClick={() => navigate("/login")}>登录</Button>
                            <Button
                                type="ghost"
                                style={{ marginLeft: "50px" }}
                                onClick={() => navigate("/register")}
                            >注册</Button>
                        </div>
                    }
                />
            )
    }
    return (
        <section>
            <NavHeader >个人中心</NavHeader>
            {content}
        </section>
    );
}
+function beforeUpload(file) {
+  const isLessThan2M = file.size / 1024 / 1024 < 2;
+  if (!isLessThan2M) {
+    Toast.show({
+        icon: 'fail',
+        content: "图片必须小于2MB!"
+    })
+    return false;
+  }
+  return file;
+}
let mapStateToProps = (state) => state.profile;
export default connect(mapStateToProps, actions)(Profile);
```

### 7.3 Profile\index.less

src\views\Profile\index.less

```diff
.user-info {
    padding: 20px;
}
+.adm-image-img{
+    height:100%;
+}
```

### 7.4 action-types.js

src\store\action-types.js

```diff
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
export const VALIDATE = 'VALIDATE';
export const LOGOUT = 'LOGOUT';
+export const CHANGE_AVATAR = "CHANGE_AVATAR";
```

### 7.5 reducers\profile.js

src\store\reducers\profile.js

```diff
import * as actionTypes from "../action-types";
import { LOGIN_TYPES } from "@/constants";
let initialState = {
  loginState: LOGIN_TYPES.UN_VALIDATE,
  user: null,
  error: null
};
export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.VALIDATE:
      if (action.payload.success) {
        return {
          ...state,
          loginState: LOGIN_TYPES.LOGINED,
          user: action.payload.data,
          error: null
        };
      } else {
        return {
          ...state,
          loginState: LOGIN_TYPES.UNLOGIN,
          user: null,
          error: action.payload
        };
      }
    case actionTypes.LOGOUT:
      return {
        ...state,
        loginState: LOGIN_TYPES.UN_VALIDATE,
        user: null,
        error: null,
      };
+   case actionTypes.CHANGE_AVATAR:
+     return { ...state, user: { ...state.user, avatar: action.payload } };
    default:
      return state;
  }
}
```

### 7.6 actions\profile.js

src\store\actions\profile.js

```diff
import * as actionTypes from "../action-types";
+import { validate, register, login,uploadAvatar } from '@/api/profile';
import { push } from 'redux-first-history';
import { Toast } from "antd-mobile";
export default {
  validate() {
    return {
      type: actionTypes.VALIDATE,
      payload: validate()
    };
  },
  register(values) {
    return function (dispatch) {
      (async function () {
        try {
          let result = await register(values);
          if (result.success) {
            dispatch(push('/login'));
            Toast.show({
              icon: 'success',
              content: `注册成功`
            })
          } else {
            Toast.show({
              icon: 'fail',
              content: result.message
            })
          }
        } catch (error) {
          Toast.show({
            icon: 'fail',
            content: `注册失败`
          })
        }
      })();
    }
  },
  login(values) {
    return function (dispatch) {
      (async function () {
        try {
          let result = await login(values);
          if (result.success) {
            sessionStorage.setItem('access_token', result.data.token);
            Toast.show({
              icon: 'success',
              content: `登录成功`
            })
            dispatch(push('/profile'));
          } else {
            Toast.show({
              icon: 'fail',
              content: result.message
            })
          }
        } catch (error) {
          Toast.show({
            icon: 'fail',
            content: `登录失败`
          })
        }
      })();
    }
  },
  logout() {
    return function (dispatch) {
      sessionStorage.removeItem('access_token');
      dispatch({ type: actionTypes.LOGOUT });
      dispatch(push('/login'));
    }
  },
+ uploadAvatar(userId,avatar){
+   return function (dispatch) {
+     return (async function () {
+       try {
+         let result = await uploadAvatar(userId,avatar);
+         if (result.success) {
+           dispatch({
+             type: actionTypes.CHANGE_AVATAR,
+             payload: result.data
+           })
+           Toast.show({
+             icon: 'success',
+             content: `上传成功`
+           })
+         } else {
+           Toast.show({
+             icon: 'fail',
+             content: result.message
+           })
+         }
+         return result
+       } catch (error) {
+         Toast.show({
+           icon: 'fail',
+           content: `上传失败`
+         })
+       }
+     })();
+   }
+ }
};
```

### 7.7 api\profile.js
src\api\profile.js
```diff
import axios from "./";
export function validate() {
  return axios.get("/user/validate");
}
export function register(values) {
        return axios.post('/user/register', values);
}
export function login(values) {
    return axios.post('/user/login', values);
}
+export function uploadAvatar(userId,avatar) {
+  const formData = new FormData();
+  formData.append('userId', userId);
+  formData.append('avatar', avatar);
+  return axios.post('/user/uploadAvatar', formData, {
+    headers: {
+      'Content-Type': 'multipart/form-data'
+    }
+  });
+}
```

## 8. 前台轮播图
- 本章实践前台轮播图
- 本章需要实践的内容
  - 使用 `antd-mobile` 的轮播图组件

### 8.1 参考
#### 8.1.1 本章目录
```js
.
├── package.json
├── public
│   └── index.html
├── README.md
├── src
│   ├── api
│   │   ├── home.js
│   │   ├── index.js
│   │   └── profile.js
│   ├── assets
│   │   └── images
│   │       └── logo.png
│   ├── components
│   │   ├── NavHeader
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   └── Tabs
│   │       ├── index.js
│   │       └── index.less
│   ├── constants.js
│   ├── index.js
│   ├── store
│   │   ├── actions
│   │   │   ├── home.js
│   │   │   └── profile.js
│   │   ├── action-types.js
│   │   ├── history.js
│   │   ├── index.js
│   │   └── reducers
│   │       ├── cart.js
│   │       ├── home.js
│   │       ├── index.js
│   │       └── profile.js
│   ├── styles
│   │   └── global.less
│   └── views
│       ├── Cart
│       │   └── index.js
│       ├── Home
│       │   ├── components
│       │   │   ├── HomeHeader
│       │   │   │   ├── index.js
│       │   │   │   └── index.less
│       │   │   └── HomeSwiper
│       │   │       ├── index.js
│       │   │       └── index.less
│       │   ├── index.js
│       │   └── index.less
│       ├── Login
│       │   ├── index.js
│       │   └── index.less
│       ├── Profile
│       │   ├── index.js
│       │   └── index.less
│       └── Register
│           ├── index.js
│           └── index.less
├── static
│   └── setRemUnit.js
└── webpack.config.js
```

#### 8.1.2 本章效果

![homesliders](https://static.zhufengpeixun.com/homesliders_1689681385812.gif)

### 8.2 action-types.js

src\store\action-types.js

```diff
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
export const VALIDATE = 'VALIDATE';
export const LOGOUT = 'LOGOUT';
export const CHANGE_AVATAR = "CHANGE_AVATAR";
+export const GET_SLIDERS = "GET_SLIDERS";
```

### 8.3 actions\home.js

src\store\actions\home.js

```diff
import * as actionTypes from "../action-types";
+import { getSliders } from "@/api/home";
export default {
  setCurrentCategory(currentCategory) {
    return { type: actionTypes.SET_CURRENT_CATEGORY, payload: currentCategory };
  },
+ getSliders() {
+   return {
+     type: actionTypes.GET_SLIDERS,
+     payload: getSliders(),
+   };
+ }
};
```

### 8.4 reducers\home.js

src\store\reducers\home.js

```diff
import * as actionTypes from "../action-types";
let initialState = {
    currentCategory: 'all',
+   sliders:[]
};
export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CATEGORY:
            return { ...state, currentCategory: action.payload };
+       case actionTypes.GET_SLIDERS:
+            return { ...state, sliders: action.payload.data };
        default:
            return state;
    }
}
```

### 8.5 api\home.js

src\api\home.js

```js
import axios from "./";
export function getSliders() {
  return axios.get("/slider/list");
}
```

### 8.6 HomeSwiper.js

src\views\Home\components\HomeSwiper.js

```js
import React, { useEffect } from "react";
import { Swiper,Image } from "antd-mobile";
import "./index.less";
function HomeSwiper(props) {
    useEffect(() => {
        if (props.sliders && props.sliders.length === 0 && props.getSliders) {
            props.getSliders();
        }
    }, []);
    return (
        <Swiper autoplay={true} loop={true}>
            {
                props.sliders.map((slider) => (
                    <Swiper.Item key={slider._id}>
                        <Image src={slider.url} lazy />
                    </Swiper.Item>
                ))
            }
        </Swiper>
    );
}

export default HomeSwiper;
```

### 8.7 HomeSwiper\index.less

src\views\Home\components\HomeSwiper\index.less

```less
.adm-image-img{
  height:320px;
}
```

### 8.8 Home\index.js

src\views\Home\index.js

```diff
import React from "react";
import actionCreators from '@/store/actions/home';
import HomeHeader from './components/HomeHeader';
import { connect } from 'react-redux';
+import HomeSwiper from "./components/HomeSwiper";
import './index.less';
function Home(props) {
    return (
        <>
            <HomeHeader
                currentCategory={props.currentCategory}
                setCurrentCategory={props.setCurrentCategory}
            />
+           <div className="home-container">
+               <HomeSwiper sliders={props.sliders} getSliders={props.getSliders} />
+           </div>
        </>
    )
}
let mapStateToProps = (state) => state.home;
export default connect(
    mapStateToProps,
    actionCreators
)(Home);
```

## 9. 课程列表
- 本章实践的内容
  - 加载课程列表
  - 上拉加载

### 9.1 参考
#### 9.1.1 目录结构
```js
.
├── package.json
├── public
│   └── index.html
├── README.md
├── src
│   ├── api
│   │   ├── home.js
│   │   ├── index.js
│   │   └── profile.js
│   ├── assets
│   │   └── images
│   │       └── logo.png
│   ├── components
│   │   ├── NavHeader
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   └── Tabs
│   │       ├── index.js
│   │       └── index.less
│   ├── constants.js
│   ├── index.js
│   ├── store
│   │   ├── actions
│   │   │   ├── home.js
│   │   │   └── profile.js
│   │   ├── action-types.js
│   │   ├── history.js
│   │   ├── index.js
│   │   └── reducers
│   │       ├── cart.js
│   │       ├── home.js
│   │       ├── index.js
│   │       └── profile.js
│   ├── styles
│   │   └── global.less
│   ├── utils.js
│   └── views
│       ├── Cart
│       │   └── index.js
│       ├── Home
│       │   ├── components
│       │   │   ├── HomeHeader
│       │   │   │   ├── index.js
│       │   │   │   └── index.less
│       │   │   ├── HomeSwiper
│       │   │   │   ├── index.js
│       │   │   │   └── index.less
│       │   │   └── LessonList
│       │   │       ├── index.js
│       │   │       └── index.less
│       │   ├── index.js
│       │   └── index.less
│       ├── Login
│       │   ├── index.js
│       │   └── index.less
│       ├── Profile
│       │   ├── index.js
│       │   └── index.less
│       └── Register
│           ├── index.js
│           └── index.less
├── static
│   └── setRemUnit.js
└── webpack.config.js
```

#### 9.1.2 页面效果
![lessonlist2](https://static.zhufengpeixun.com/lessonlist2_1689731403500.gif)

### 9.2 api\home.js

src\api\home.js

```diff
import axios from "./";
export function getSliders() {
  return axios.get("/slider/list");
}
+export function getLessons(currentCategory = "all",offset,limit) {
+  return axios.get(
+    `/lesson/list?category=${currentCategory}&offset=${offset}&limit=${limit}`
+  );
+}
```

### 9.3 action-types.js

src\store\action-types.js

```diff
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
export const VALIDATE = 'VALIDATE';
export const LOGOUT = 'LOGOUT';
export const CHANGE_AVATAR = "CHANGE_AVATAR";
export const GET_SLIDERS = "GET_SLIDERS";
+export const GET_LESSONS = "GET_LESSONS";
+export const SET_LESSONS_LOADING = "SET_LESSONS_LOADING";
+export const SET_LESSONS = "SET_LESSONS";
```

### 9.4 reducers\home.js

src\store\reducers\home.js

```diff
import * as actionTypes from "../action-types";
let initialState = {
    currentCategory: 'all',
    sliders: [],
+   lessons: {
+       loading: false,
+       list: [],
+       hasMore: true,
+       offset: 0,
+       limit: 5
+   },
};
export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CATEGORY:
            return { ...state, currentCategory: action.payload };
        case actionTypes.GET_SLIDERS:
            return { ...state, sliders: action.payload.data };
+       case actionTypes.SET_LESSONS_LOADING:
+           return {
+               ...state,
+               lessons: { ...state.lessons, loading: action.payload },
+           };
+       case actionTypes.SET_LESSONS:
+           return {
+               ...state,
+               lessons: {
+                   ...state.lessons,
+                   loading: false,
+                   hasMore: action.payload.hasMore,
+                   list: [...state.lessons.list, ...action.payload.list],
+                   offset: state.lessons.offset + action.payload.list.length
+               },
+           };
        default:
            return state;
    }
}
```

### 9.5 actions\home.js

src\store\actions\home.js

```diff
import * as actionTypes from "../action-types";
+import { getSliders, getLessons } from "@/api/home";
export default {
  setCurrentCategory(currentCategory) {
    return { type: actionTypes.SET_CURRENT_CATEGORY, payload: currentCategory };
  },
  getSliders() {
    return {
      type: actionTypes.GET_SLIDERS,
      payload: getSliders(),
    };
  },
+ getLessons() {
+   return (dispatch, getState) => {
+     (async function () {
+       let {
+         currentCategory,
+         lessons: { hasMore, offset, limit, loading },
+       } = getState().home;
+       if (hasMore && !loading) {
+         dispatch({ type: actionTypes.SET_LESSONS_LOADING, payload: true });
+         let result = await getLessons(currentCategory, offset, limit);
+         dispatch({ type: actionTypes.SET_LESSONS, payload: result.data });
+       }
+     })();
+   };
+ }
};
```

### 9.6 src\utils.js

src\utils.js

```js
export function loadMore(element, callback) {
    function _loadMore() {
        let clientHeight = element.clientHeight;
        let scrollTop = element.scrollTop;
        let scrollHeight = element.scrollHeight;
        if (clientHeight + scrollTop + 10 >= scrollHeight) {
            callback();
        }
    }
    element.addEventListener("scroll", debounce(_loadMore, 300));
}
export function debounce(fn, wait) {
    var timeout = null;
    return function () {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    };
}
```

### 9.7 LessonList\index.js
src\views\Home\components\LessonList\index.js

```js
import React, { useEffect } from "react";
import { Image, Button,NoticeBar,Card,Skeleton } from "antd-mobile";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import "./index.less";

function LessonList(props) {
  useEffect(() => {
    if (props.lessons.list.length == 0) {
      props.getLessons();
    }
  }, []);
  return (
    <section className="lesson-list">
      <h2>
        <MenuOutlined /> 全部课程
      </h2>
      {props.lessons.list.length>0?props.lessons.list.map((lesson) => (
        <Link
          key={lesson.id}
          to={{ pathname: `/detail/${lesson.id}`}}
          state={lesson}
        >
           <Card headerStyle={{display:'flex',justifyContent:'center'}} title={lesson.title}>
             <Image src={lesson.poster} />
           </Card>
        </Link>
      )):(
        <>
          <Skeleton.Title animated />
          <Skeleton.Paragraph lineCount={5} animated />
        </>
      )}
      {props.lessons.hasMore ? (
        <Button
          onClick={props.getLessons}
          loading={props.lessons.loading}
          type="primary"
          block
        >
          {props.lessons.loading ? "" : "加载更多"}
        </Button>
      ) : (
        <NoticeBar content='到底了' color='alert' />
      )}
    </section>
  );
}
export default LessonList;
```

### 9.8 LessonList\index.less
src\views\Home\components\LessonList\index.less

```less
.lesson-list {
    h2 {
        line-height: 100px;
        i {
            margin: 0 10px;
        }
    }
    .adm-notice-bar.adm-notice-bar-alert{
        justify-content: center;
        .adm-notice-bar-content{
            flex: none;
        }
    }
    .adm-image-img{
        height: 500px;
    }
}
```

### 9.9 Home\index.js

src\views\Home\index.js

```diff
+import React,{useRef,useEffect} from "react";
import actionCreators from '@/store/actions/home';
import HomeHeader from './components/HomeHeader';
import { connect } from 'react-redux';
import HomeSwiper from "./components/HomeSwiper";
+import LessonList from "./components/LessonList";
+import { loadMore} from "@/utils";
import './index.less';
function Home(props) {
+   const homeContainerRef = useRef(null);
+   useEffect(() => {
+         loadMore(homeContainerRef.current, props.getLessons);
+   }, []);
    return (
        <>
            <HomeHeader
                currentCategory={props.currentCategory}
                setCurrentCategory={props.setCurrentCategory}
            />
+           <div className="home-container" ref={homeContainerRef}>
                <HomeSwiper sliders={props.sliders} getSliders={props.getSliders} />
+               <LessonList
+                   container={homeContainerRef}
+                   lessons={props.lessons}
+                   getLessons={props.getLessons}
+               />
+           </div>
        </>
    )
}
let mapStateToProps = (state) => state.home;
export default connect(
    mapStateToProps,
    actionCreators
)(Home);
```

### 9.10 Home\index.less

src\views\Home\index.less

```diff
+.home-container {
+    position: fixed;
+    top: 100px;
+    left: 0;
+    width: 100%;
+    overflow-y: auto;
+    height: calc(100vh - 220px);
+    background-color: #FFF;
+}
```

## 10. 课程详情
### 10.1 参考
#### 10.1.1 目录结构
```js
.
├── package.json
├── public
│   └── index.html
├── README.md
├── src
│   ├── api
│   │   ├── home.js
│   │   ├── index.js
│   │   └── profile.js
│   ├── assets
│   │   └── images
│   │       └── logo.png
│   ├── components
│   │   ├── NavHeader
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   └── Tabs
│   │       ├── index.js
│   │       └── index.less
│   ├── constants.js
│   ├── index.js
│   ├── store
│   │   ├── actions
│   │   │   ├── home.js
│   │   │   └── profile.js
│   │   ├── action-types.js
│   │   ├── history.js
│   │   ├── index.js
│   │   └── reducers
│   │       ├── cart.js
│   │       ├── home.js
│   │       ├── index.js
│   │       └── profile.js
│   ├── styles
│   │   └── global.less
│   ├── utils.js
│   └── views
│       ├── Cart
│       │   └── index.js
│       ├── Detail
│       │   └── index.js
│       ├── Home
│       │   ├── components
│       │   │   ├── HomeHeader
│       │   │   │   ├── index.js
│       │   │   │   └── index.less
│       │   │   ├── HomeSwiper
│       │   │   │   ├── index.js
│       │   │   │   └── index.less
│       │   │   └── LessonList
│       │   │       ├── index.js
│       │   │       └── index.less
│       │   ├── index.js
│       │   └── index.less
│       ├── Login
│       │   ├── index.js
│       │   └── index.less
│       ├── Profile
│       │   ├── index.js
│       │   └── index.less
│       └── Register
│           ├── index.js
│           └── index.less
├── static
│   └── setRemUnit.js
└── webpack.config.js
```

#### 10.1.2 页面效果
![lessondetail](https://static.zhufengpeixun.com/lessondetail_1689753939368.gif)

### 10.2 src\index.js
src\index.js
```diff
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store, history } from "./store";
import "./styles/global.less";
import Tabs from "./components/Tabs";
import Home from "./views/Home";
import Cart from "./views/Cart";
import Profile from "./views/Profile";
import Register from "./views/Register";
import Login from "./views/Login";
+import Detail from "./views/Detail";
import { HistoryRouter } from "redux-first-history/rr6";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<HistoryRouter history={history}>
			<main className="main-container">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
+					<Route path="/detail/:id" element={<Detail/>} />
				</Routes>
			</main>
			<Tabs />
		</HistoryRouter>
	</Provider>
);
```

### 10.3 api\home.js

src\api\home.js

```diff
import axios from "./";
export function getSliders() {
  return axios.get("/slider/list");
}
export function getLessons(currentCategory = "all",offset,limit) {
  return axios.get(
    `/lesson/list?category=${currentCategory}&offset=${offset}&limit=${limit}`
  );
}
+export function getLesson(id) {
+  return axios.get(`/lesson/${id}`);
+}
```

### 10.4 views\Detail\index.js

src\views\Detail\index.js

```js
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Card,Image } from "antd-mobile";
import NavHeader from "@/components/NavHeader";
import { getLesson } from "@/api/home";
import {useLocation,useParams} from 'react-router-dom';
function Detail() {
    const location = useLocation();
    const params = useParams();
    let [lesson, setLesson] = useState({});
    useEffect(() => {
        (async () => {
            debugger
            let lesson = location.state;
            if (!lesson) {
                let result = await getLesson(params.id);
                if (result.success) lesson = result.data;
            }
            setLesson(lesson);
        })();
    }, []);
    return (
        <>
            <NavHeader>课程详情</NavHeader>
            <Card headerStyle={{display:'flex',justifyContent:'center'}} title={lesson.title}>
             <Image src={lesson.poster} />
             </Card>
        </>
    );
}

export default connect()(Detail);
```

## 11. 下拉刷新
### 11.1 参考
#### 11.1.1 目录结构
```js
.
├── package.json
├── public
│   └── index.html
├── README.md
├── src
│   ├── api
│   │   ├── home.js
│   │   ├── index.js
│   │   └── profile.js
│   ├── assets
│   │   └── images
│   │       └── logo.png
│   ├── components
│   │   ├── NavHeader
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   └── Tabs
│   │       ├── index.js
│   │       └── index.less
│   ├── constants.js
│   ├── index.js
│   ├── store
│   │   ├── actions
│   │   │   ├── home.js
│   │   │   └── profile.js
│   │   ├── action-types.js
│   │   ├── history.js
│   │   ├── index.js
│   │   └── reducers
│   │       ├── cart.js
│   │       ├── home.js
│   │       ├── index.js
│   │       └── profile.js
│   ├── styles
│   │   └── global.less
│   ├── utils.js
│   └── views
│       ├── Cart
│       │   └── index.js
│       ├── Detail
│       │   └── index.js
│       ├── Home
│       │   ├── components
│       │   │   ├── HomeHeader
│       │   │   │   ├── index.js
│       │   │   │   └── index.less
│       │   │   ├── HomeSwiper
│       │   │   │   ├── index.js
│       │   │   │   └── index.less
│       │   │   └── LessonList
│       │   │       ├── index.js
│       │   │       └── index.less
│       │   ├── index.js
│       │   └── index.less
│       ├── Login
│       │   ├── index.js
│       │   └── index.less
│       ├── Profile
│       │   ├── index.js
│       │   └── index.less
│       └── Register
│           ├── index.js
│           └── index.less
├── static
│   └── setRemUnit.js
└── webpack.config.js
```

### 11.2 src\utils.js
src\utils.js
```diff
export function loadMore(element, callback) {
    function _loadMore() {
        let clientHeight = element.clientHeight;
        let scrollTop = element.scrollTop;
        let scrollHeight = element.scrollHeight;
        if (clientHeight + scrollTop + 10 >= scrollHeight) {
            callback();
        }
    }
    element.addEventListener("scroll", debounce(_loadMore, 300));
}
export function debounce(fn, wait) {
    var timeout = null;
    return function () {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    };
}
+export function downRefresh(element, callback) {
+  let startY;
+  let distance;
+  let originalTop = element.offsetTop;
+  let startTop;
+  let $timer = null;
+  element.addEventListener("touchstart", function (event) {
+    if ($timer) clearInterval($timer);
+    let touchMove = throttle(_touchMove, 30);
+    if (element.scrollTop === 0) {
+      startTop = element.offsetTop;
+      startY = event.touches[0].pageY; 
+      element.addEventListener("touchmove", touchMove);
+      element.addEventListener("touchend", touchEnd);
+    }
+    function _touchMove(event) {
+      let pageY = event.touches[0].pageY;
+      if (pageY > startY) {
+        distance = pageY - startY;
+        element.style.top = startTop + distance + "px";
+      } else {
+        element.removeEventListener("touchmove", touchMove);
+        element.removeEventListener("touchend", touchEnd);
+      }
+    }
+    function touchEnd(_event) {
+      element.removeEventListener("touchmove", touchMove);
+      element.removeEventListener("touchend", touchEnd);
+      if (distance > 30) {
+        callback();
+      }
+      $timer = setInterval(() => {
+         let currentTop = element.offsetTop;
+         if (currentTop - originalTop >= 1) {
+          element.style.top = currentTop - 1 + 'px';
+         } else {
+             $timer && clearInterval($timer)
+             element.style.top = originalTop + 'px';
+         }
+       }, 16);
+    }
+  });
+}

+export function throttle(func, delay) {
+  var prev = Date.now();
+  return function () {
+    var context = this;
+    var args = arguments;
+    var now = Date.now();
+    if (now - prev >= delay) {
+      func.apply(context, args);
+      prev = now;
+    }
+  };
+}
```

### 11.3 action-types.js
src\store\action-types.js
```diff
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
export const VALIDATE = 'VALIDATE';
export const LOGOUT = 'LOGOUT';
export const CHANGE_AVATAR = "CHANGE_AVATAR";
export const GET_SLIDERS = "GET_SLIDERS";
export const GET_LESSONS = "GET_LESSONS";
export const SET_LESSONS_LOADING = "SET_LESSONS_LOADING";
export const SET_LESSONS = "SET_LESSONS";
+export const REFRESH_LESSONS = "REFRESH_LESSONS";
```

### 11.4 actions\home.js
src\store\actions\home.js
```diff
import * as actionTypes from "../action-types";
import { getSliders, getLessons } from "@/api/home";
export default {
  setCurrentCategory(currentCategory) {
    return { type: actionTypes.SET_CURRENT_CATEGORY, payload: currentCategory };
  },
  getSliders() {
    return {
      type: actionTypes.GET_SLIDERS,
      payload: getSliders(),
    };
  },
  getLessons() {
    return (dispatch, getState) => {
      (async function () {
        let {
          currentCategory,
          lessons: { hasMore, offset, limit, loading },
        } = getState().home;
        if (hasMore && !loading) {
          dispatch({ type: actionTypes.SET_LESSONS_LOADING, payload: true });
          let result = await getLessons(currentCategory, offset, limit);
          dispatch({ type: actionTypes.SET_LESSONS, payload: result.data });
        }
      })();
    };
  },
+ refreshLessons() {
+   return (dispatch, getState) => {
+     (async function () {
+       let { currentCategory, lessons: { limit, loading } } = getState().home;
+       if (!loading) {
+         dispatch({ type: actionTypes.SET_LESSONS_LOADING, payload: true });
+         let result = await getLessons(currentCategory, 0, limit);
+         dispatch({ type: actionTypes.REFRESH_LESSONS, payload: result.data });
+       }
+     })();
+   }
+ }
};
```

### 11.5 reducers\home.js
src\store\reducers\home.js
```diff
import * as actionTypes from "../action-types";
let initialState = {
    currentCategory: 'all',
    sliders: [],
    lessons: {
        loading: false,
        list: [],
        hasMore: true,
        offset: 0,
        limit: 5
    },
};
export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CATEGORY:
            return { ...state, currentCategory: action.payload };
        case actionTypes.GET_SLIDERS:
            return { ...state, sliders: action.payload.data };
        case actionTypes.SET_LESSONS_LOADING:
            return {
                ...state,
                lessons: { ...state.lessons, loading: action.payload },
            };
        case actionTypes.SET_LESSONS:
            return {
                ...state,
                lessons: {
                    ...state.lessons,
                    loading: false,
                    hasMore: action.payload.hasMore,
                    list: [...state.lessons.list, ...action.payload.list],
                    offset: state.lessons.offset + action.payload.list.length
                },
            };
+       case actionTypes.REFRESH_LESSONS:
+           return {
+               ...state,
+               lessons: {
+                   ...state.lessons,
+                   loading: false,
+                   hasMore: action.payload.hasMore,
+                   list: action.payload.list,
+                   offset: action.payload.list.length,
+               },
+           };
        default:
            return state;
    }
}
```

### 11.6 Home\index.js
src\views\Home\index.js
```diff
import React,{useRef,useEffect} from "react";
import actionCreators from '@/store/actions/home';
import HomeHeader from './components/HomeHeader';
import { connect } from 'react-redux';
import HomeSwiper from "./components/HomeSwiper";
import LessonList from "./components/LessonList";
+import { loadMore,downRefresh} from "@/utils";
+import {DotLoading } from 'antd-mobile';
import './index.less';
function Home(props) {
    const homeContainerRef = useRef(null);
    useEffect(() => {
          loadMore(homeContainerRef.current, props.getLessons);
+         downRefresh(homeContainerRef.current, props.refreshLessons);
    }, []);
    return (
        <>
+           <DotLoading />
            <HomeHeader
                currentCategory={props.currentCategory}
                setCurrentCategory={props.setCurrentCategory}
+               refreshLessons={props.refreshLessons}
            />
            <div className="home-container" ref={homeContainerRef}>
                <HomeSwiper sliders={props.sliders} getSliders={props.getSliders} />
                <LessonList
                    container={homeContainerRef}
                    lessons={props.lessons}
                    getLessons={props.getLessons}
                />
            </div>
        </>
    )
}
let mapStateToProps = (state) => state.home;
export default connect(
    mapStateToProps,
    actionCreators
)(Home);
```

### 11.7 Home\index.less
src\views\Home\index.less
```diff
.home-container {
    position: fixed;
    top: 100px;
    left: 0;
    width: 100%;
    overflow-y: auto;
    height: calc(100vh - 220px);
    background-color: #FFF;
}
+.adm-loading.adm-dot-loading{
+    position: fixed;
+    top:200px;
+    width:100%;
+    text-align: center;
+    font-size: 48px;
+}
```

### 11.8 HomeHeader\index.js
src\views\Home\components\HomeHeader\index.js
```diff
import React, { useState } from 'react';
import { BarsOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { Transition } from 'react-transition-group';
import logo from '@/assets/images/logo.png';
import './index.less';
const duration = 1000;
const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}
const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
};
function HomeHeader(props) {
    let [isMenuVisible, setIsMenuVisible] = useState(false);
    const setCurrentCategory = (event) => {
        let { target } = event;
        let category = target.dataset.category;
        props.setCurrentCategory(category);
+       props.refreshLessons();
        setIsMenuVisible(false);
    }
    return (
        <header className="home-header">
            <div className="logo-header">
                <img src={logo} />
                <BarsOutlined onClick={() => setIsMenuVisible(!isMenuVisible)} />
            </div>
            <Transition in={isMenuVisible} timeout={duration}>
                {
                    (state) => (
                        <ul
                            className="category"
                            onClick={setCurrentCategory}
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}
                        >
                            <li data-category="all" className={classnames({ active: props.currentCategory === 'all' })}>全部课程</li>
                            <li data-category="react" className={classnames({ active: props.currentCategory === 'react' })}>React课程</li>
                            <li data-category="vue" className={classnames({ active: props.currentCategory === 'vue' })}>Vue课程</li>
                        </ul>
                    )
                }
            </Transition>
        </header>
    )
}
export default HomeHeader;
```


## 12. 虚拟列表
### 12.1 参考
#### 12.1.1 目录结构
```js
.
├── package.json
├── public
│   └── index.html
├── README.md
├── src
│   ├── api
│   │   ├── home.js
│   │   ├── index.js
│   │   └── profile.js
│   ├── assets
│   │   └── images
│   │       └── logo.png
│   ├── components
│   │   ├── NavHeader
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   └── Tabs
│   │       ├── index.js
│   │       └── index.less
│   ├── constants.js
│   ├── index.js
│   ├── store
│   │   ├── actions
│   │   │   ├── home.js
│   │   │   └── profile.js
│   │   ├── action-types.js
│   │   ├── history.js
│   │   ├── index.js
│   │   └── reducers
│   │       ├── cart.js
│   │       ├── home.js
│   │       ├── index.js
│   │       └── profile.js
│   ├── styles
│   │   └── global.less
│   ├── utils.js
│   └── views
│       ├── Cart
│       │   └── index.js
│       ├── Detail
│       │   └── index.js
│       ├── Home
│       │   ├── components
│       │   │   ├── HomeHeader
│       │   │   │   ├── index.js
│       │   │   │   └── index.less
│       │   │   ├── HomeSwiper
│       │   │   │   ├── index.js
│       │   │   │   └── index.less
│       │   │   └── LessonList
│       │   │       ├── index.js
│       │   │       └── index.less
│       │   ├── index.js
│       │   └── index.less
│       ├── Login
│       │   ├── index.js
│       │   └── index.less
│       ├── Profile
│       │   ├── index.js
│       │   └── index.less
│       └── Register
│           ├── index.js
│           └── index.less
├── static
│   └── setRemUnit.js
└── webpack.config.js
```

### 12.2 Home\index.js
src\views\Home\index.js
```diff
+import React, { useRef, useEffect } from "react";
import actionCreators from '@/store/actions/home';
import HomeHeader from './components/HomeHeader';
import { connect } from 'react-redux';
import HomeSwiper from "./components/HomeSwiper";
import LessonList from "./components/LessonList";
+import { loadMore, downRefresh, throttle } from "@/utils";
+import { DotLoading } from 'antd-mobile';
import './index.less';
function Home(props) {
    const homeContainerRef = useRef(null);
    const lessonListRef = useRef(null);
    useEffect(() => {
        loadMore(homeContainerRef.current, props.getLessons);
        downRefresh(homeContainerRef.current, props.refreshLessons);
+       homeContainerRef.current.addEventListener("scroll", throttle(lessonListRef.current, 13));
+       homeContainerRef.current.addEventListener('scroll', () => {
+           sessionStorage.setItem('scrollTop', homeContainerRef.current.scrollTop);
+       });
+       let scrollTop = sessionStorage.getItem('scrollTop');
+       if(scrollTop){
+           homeContainerRef.current.scrollTop = +scrollTop;
+           lessonListRef.current();
+       }
    }, []);
    return (
        <>
            <DotLoading />
            <HomeHeader
                currentCategory={props.currentCategory}
                setCurrentCategory={props.setCurrentCategory}
                refreshLessons={props.refreshLessons}
            />
            <div className="home-container" ref={homeContainerRef}>
                <HomeSwiper sliders={props.sliders} getSliders={props.getSliders} />
                <LessonList
                    container={homeContainerRef}
                    lessons={props.lessons}
                    getLessons={props.getLessons}
+                   ref={lessonListRef}
+                   homeContainerRef={homeContainerRef}
                />
            </div>
        </>
    )
}
let mapStateToProps = (state) => state.home;
export default connect(
    mapStateToProps,
    actionCreators
)(Home);
```

### 12.3 LessonList\index.js
src\views\Home\components\LessonList\index.js
```diff
+import React, { useEffect, useReducer } from "react";
+import { Image, Button, NoticeBar, Card, Skeleton } from "antd-mobile";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import "./index.less";

+function LessonList(props,lessonListRef) {
+ const [, forceUpdate] = useReducer(x => x + 1, 0);
  useEffect(() => {
    if (props.lessons.list.length == 0) {
      props.getLessons();
    }
+   lessonListRef.current = forceUpdate;
  }, []);
+ const remSize = parseFloat(document.documentElement.style.fontSize);
+ const itemSize = (650 / 75) * remSize;
+ const screenHeight = window.innerHeight - (222 / 75) * remSize;
+ const homeContainer = props.homeContainerRef.current;
+ let start = 0, end = 0;
+ const scrollTop = homeContainer?Math.max(homeContainer.scrollTop - ((320 + 65) / 75) * remSize,0):0;
+ start = Math.floor(scrollTop / itemSize);
+ end = start + Math.floor(screenHeight / itemSize);
+ start -= 2, end += 2;
+ start = start < 0 ? 0 : start;
+ end = end > props.lessons.list.length ? props.lessons.list.length : end;
+ const visibleList = props.lessons.list.map((item, index) => ({ ...item, index })).slice(start, end);
+ const style = { position: 'absolute', top: 0, left: 0, width: '100%', height: itemSize };
+ const bottomTop = (props.lessons.list.length) * itemSize;
  return (
    <section className="lesson-list">
      <h2>
        <MenuOutlined /> 全部课程
      </h2>
+      {visibleList.length > 0 ? (
+        <div style={{ position: 'relative', width: '100%', height: `${props.lessons.list.length * itemSize}px` }}>
+          {
+            visibleList.map((lesson) => (
+              <Link
+                style={{ ...style, top: `${itemSize * lesson.index}px`,backgroundColor: '#EEE' }}
+                key={lesson.id}
+                to={{ pathname: `/detail/${lesson.id}` }}
+                state={lesson}
+              >
+                <Card headerStyle={{ display: 'flex', justifyContent: 'center'}} title={lesson.title}>
+                  <Image src={lesson.poster} />
+                </Card>
+              </Link>
+            ))
+          }
+          {props.lessons.hasMore ? (
+            <Button
+              style={{ textAlign: "center",position: 'absolute', top: `${bottomTop}px` }}
+              onClick={props.getLessons}
+              loading={props.lessons.loading}
+              type="primary"
+              block
+            >
+              {props.lessons.loading ? "" : "加载更多"}
+            </Button>
+          ) : (
+            <NoticeBar style={{width:'100%',position: 'absolute', top: `${bottomTop}px`}} content='到底了' color='alert' />
+          )}
+        </div>
+      ) : (
+        <>
+          <Skeleton.Title animated />
+          <Skeleton.Paragraph lineCount={5} animated />
+        </>
+      )}
    </section>
  );
}
export default React.forwardRef(LessonList);
```

## 13. 路由懒加载
### 13.1 src\index.js
```diff
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
+import {Mask} from 'antd-mobile';
import { store, history } from "./store";
import "./styles/global.less";
import Tabs from "./components/Tabs";
+const Home = React.lazy(() => import("./views/Home"));
+const Cart = React.lazy(() => import("./views/Cart"));
+const Profile = React.lazy(() => import("./views/Profile"));
+const Register = React.lazy(() => import("./views/Register"));
+const Login = React.lazy(() => import("./views/Login"));
+const Detail = React.lazy(() => import("./views/Detail"));
import { HistoryRouter } from "redux-first-history/rr6";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<HistoryRouter history={history}>
+		    <React.Suspense fallback={<Mask visible={true} />}>
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
+			</React.Suspense>
			<Tabs />
		</HistoryRouter>
	</Provider>
);
```

## 14. 购物车
-  [redux-immer](https://github.com/salvoravida/redux-immer)is used to create an equivalent function of Redux combineReducers that works with immer state.
- [redux-persist](https://github.com/rt2zz/redux-persist)Persist and rehydrate a redux store.
  
### 14.1 参考
#### 14.1.1 目录结构
```js
.
├── package.json
├── public
│   └── index.html
├── README.md
├── src
│   ├── api
│   │   ├── home.js
│   │   ├── index.js
│   │   └── profile.js
│   ├── assets
│   │   └── images
│   │       └── logo.png
│   ├── components
│   │   ├── NavHeader
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   └── Tabs
│   │       ├── index.js
│   │       └── index.less
│   ├── constants.js
│   ├── index.js
│   ├── store
│   │   ├── actions
│   │   │   ├── cart.js
│   │   │   ├── home.js
│   │   │   └── profile.js
│   │   ├── action-types.js
│   │   ├── history.js
│   │   ├── index.js
│   │   └── reducers
│   │       ├── cart.js
│   │       ├── home.js
│   │       ├── index.js
│   │       └── profile.js
│   ├── styles
│   │   └── global.less
│   ├── utils.js
│   └── views
│       ├── Cart
│       │   ├── index.js
│       │   └── index.less
│       ├── Detail
│       │   ├── index.js
│       │   └── index.less
│       ├── Home
│       │   ├── components
│       │   │   ├── HomeHeader
│       │   │   │   ├── index.js
│       │   │   │   └── index.less
│       │   │   ├── HomeSwiper
│       │   │   │   ├── index.js
│       │   │   │   └── index.less
│       │   │   └── LessonList
│       │   │       ├── index.js
│       │   │       └── index.less
│       │   ├── index.js
│       │   └── index.less
│       ├── Login
│       │   ├── index.js
│       │   └── index.less
│       ├── Profile
│       │   ├── index.js
│       │   └── index.less
│       └── Register
│           ├── index.js
│           └── index.less
├── static
│   └── setRemUnit.js
└── webpack.config.js
```

### 14.2 src\index.js
src\index.js
```diff
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import {Mask} from 'antd-mobile';
+import { store, persistor } from "./store";
import "./styles/global.less";
import Tabs from "./components/Tabs";
const Home = React.lazy(() => import("./views/Home"));
const Profile = React.lazy(() => import("./views/Profile"));
const Register = React.lazy(() => import("./views/Register"));
const Login = React.lazy(() => import("./views/Login"));
const Detail = React.lazy(() => import("./views/Detail"));
+const Cart = React.lazy(() => import("./views/Cart"));
import { HistoryRouter } from "redux-first-history/rr6";
+import { PersistGate } from 'redux-persist/integration/react'
+import {history} from "./store/history";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
+		<PersistGate loading={<Mask visible={true} />} persistor={persistor}>
+			<HistoryRouter history={history}>
+				<React.Suspense fallback={<Mask visible={true} />}>
+				<main className="main-container">
+					<Routes>
+						<Route path="/" element={<Home />} />
+						<Route path="/cart" element={<Cart />} />
+						<Route path="/profile" element={<Profile />} />
+						<Route path="/register" element={<Register/>} />
+						<Route path="/login" element={<Login/>} />
+						<Route path="/detail/:id" element={<Detail/>} />
+					</Routes> 
+				</main>
+				</React.Suspense>
+				<Tabs />
+			</HistoryRouter>
+		</PersistGate>
	</Provider>
);
```

### 14.3 Detail\index.js
src\views\Detail\index.js
```diff
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
+import { Card, Image,Button } from "antd-mobile";
import NavHeader from "@/components/NavHeader";
import { getLesson } from "@/api/home";
+import actions from '@/store/actions/cart';
+import { useLocation, useParams } from 'react-router-dom';
+import './index.less';
function Detail(props) {
    const location = useLocation();
    const params = useParams();
    let [lesson, setLesson] = useState({});
    useEffect(() => {
        (async () => {
            let lesson = location.state;
            if (!lesson) {
                let result = await getLesson(params.id);
                if (result.success) lesson = result.data;
            }
            setLesson(lesson);
        })();
    }, []);
+   const addCartItem = (lesson) => {
+       let lessonImage = document.querySelector('.adm-image');
+       let cart = document.querySelector('.anticon.anticon-shopping-cart');
+       let clonedVideo = lessonImage.cloneNode(true);
+       let lessonImageWith = lessonImage.offsetWidth;
+       let lessonImageHeight = lessonImage.offsetHeight;
+       let cartWith = cart.offsetWidth;
+       let cartHeight = cart.offsetHeight;
+       let lessonImageLeft = lessonImage.getBoundingClientRect().left;
+       let lessonImageTop = lessonImage.getBoundingClientRect().top;
+       let cartRight = cart.getBoundingClientRect().right;
+       let cartBottom = cart.getBoundingClientRect().bottom;
+       clonedVideo.style.cssText = `
+           z-index: 1000;
+           opacity:0.8;
+           position:fixed;
+           width:${lessonImageWith}px;
+           height:${lessonImageHeight}px;
+           top:${lessonImageTop}px;
+           left:${lessonImageLeft}px;
+           transition: all 2s ease-in-out;
+       `;
+       document.body.appendChild(clonedVideo);
+       setTimeout(function () {
+           clonedVideo.style.left = (cartRight - (cartWith / 2)) + 'px';
+           clonedVideo.style.top = (cartBottom - (cartHeight / 2)) + 'px';
+           clonedVideo.style.width = `0px`;
+           clonedVideo.style.height = `0px`;
+           clonedVideo.style.opacity = '50';
+       }, 0);
+       props.addCartItem(lesson);
+   }
    return (
        <>
            <NavHeader>课程详情</NavHeader>
+           <Card headerStyle={{ display: 'flex', justifyContent: 'center' }} title={lesson.title} id="lesson-card">
                <Image src={lesson.poster} />
            </Card>
+           <Button
+               className="add-cart"
+               onClick={() => addCartItem(lesson)}
+           >加入购物车</Button>
        </>
    );
}
+let mapStateToProps = (state) => state;
+export default connect(
+      mapStateToProps,
+  actions
+)(Detail);
```

### 14.4 Detail\index.less
src\views\Detail\index.less
```less
.adm-image-img{
    height: 500px;
}
```

### 14.5 action-types.js
src\store\action-types.js
```diff
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
export const VALIDATE = 'VALIDATE';
export const LOGOUT = 'LOGOUT';
export const CHANGE_AVATAR = "CHANGE_AVATAR";
export const GET_SLIDERS = "GET_SLIDERS";
export const GET_LESSONS = "GET_LESSONS";
export const SET_LESSONS_LOADING = "SET_LESSONS_LOADING";
export const SET_LESSONS = "SET_LESSONS";
export const REFRESH_LESSONS = "REFRESH_LESSONS";
+export const ADD_CART_ITEM = 'ADD_CART_ITEM';//向购物车中增一个商品
+export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';//从购物车中删除一个商品
+export const CLEAR_CART_ITEMS = 'CLEAR_CART_ITEMS';//清空购物车
+export const CHANGE_CART_ITEM_COUNT = 'CHANGE_CART_ITEM_COUNT';//直接修改购物车商品的数量减1
+export const CHANGE_CHECKED_CART_ITEMS = 'CHANGE_CHECKED_CART_ITEMS';//选中商品
+export const SETTLE = 'SETTLE';//结算
```

### 14.6 cart.js
src\store\reducers\cart.js
```diff
import * as actionTypes from "@/store/action-types";
let initialState = [];
export default function (state = initialState,action) {
+ switch (action.type) {
+   case actionTypes.ADD_CART_ITEM:
+     let oldIndex = state.findIndex(
+       (item) => item.lesson.id === action.payload.id
+     );
+     if (oldIndex == -1) {
+       state.push({
+         checked: false,
+         count: 1,
+         lesson: action.payload,
+       });
+     } else {
+       state[oldIndex].count +=1;
+     }
+     break;
+   case actionTypes.REMOVE_CART_ITEM:
+     let removeIndex = state.findIndex(
+       (item) => item.lesson.id === action.payload
+     );
+     state.splice(removeIndex,1);
+     break;
+   case actionTypes.CLEAR_CART_ITEMS:
+     state.length = 0;
+     break;
+   case actionTypes.CHANGE_CART_ITEM_COUNT:
+     let index = state.findIndex(
+       (item) => item.lesson.id === action.payload.id
+     );
+     state[index].count=action.payload.count;
+     break;
+   case actionTypes.CHANGE_CHECKED_CART_ITEMS:
+     let checkedIds = action.payload;
+     state.forEach((item)=>{
+       if(checkedIds.includes(item.lesson.id)){
+         item.checked =true;
+       }else{
+         item.checked =false;
+       }
+     });
+     break;
+   case actionTypes.SETTLE:
+     state = state.filter((item) => !item.checked);
+     break;
    default:
      break;
  }
    return state;
}
```

### 14.7 reducers\index.js
src\store\reducers\index.js
```diff
import { routerReducer } from '../history';
import home from './home';
import cart from './cart';
import profile from './profile';
+import { combineReducers } from 'redux-immer';
+import {produce} from 'immer';
+const rootReducer = combineReducers(produce,{
    router:routerReducer,
    home,
    cart,
    profile
});
export default rootReducer;
```

### 14.8 store\index.js
src\store\index.js
```diff
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
+import { persistStore, persistReducer } from 'redux-persist';
+import storage from 'redux-persist/lib/storage';
+import { routerMiddleware } from './history';
+const persistConfig = {
+  key: 'root',
+  storage,
+  whitelist: ['cart']
+}
+const persistedReducer = persistReducer(persistConfig, reducers)
+const store = applyMiddleware(thunk, routerMiddleware, promise, logger)(createStore)(persistedReducer);
+let persistor = persistStore(store);
+export { store, persistor };
```

### 14.9 history.js
src\store\history.js
```diff
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from "redux-first-history";
+export const history = createBrowserHistory();
const { routerReducer, routerMiddleware, createReduxHistory } = createReduxHistoryContext({ history });
export {
    routerReducer,
    routerMiddleware,
    createReduxHistory
}
```

### 14.10 actions\cart.js
src\store\actions\cart.js
```js
import * as actionTypes from "../action-types";
import { Toast } from "antd-mobile";
import { push } from "redux-first-history";
export default {
  addCartItem(lesson) {
    return function (dispatch) {
      dispatch({
        type: actionTypes.ADD_CART_ITEM,
        payload: lesson,
      });
      Toast.show("添加课程成功", 1);
    };
  },
  removeCartItem(id) {
    return {
      type: actionTypes.REMOVE_CART_ITEM,
      payload: id,
    };
  },
  clearCartItems() {
    return {
      type: actionTypes.CLEAR_CART_ITEMS,
    };
  },
  changeCartItemCount(id, count) {
    return {
      type: actionTypes.CHANGE_CART_ITEM_COUNT,
      payload: {
        id,
        count,
      },
    };
  },
  changeCheckedCartItems(checkedIds) {
    return {
      type: actionTypes.CHANGE_CHECKED_CART_ITEMS,
      payload: checkedIds,
    };
  },
  settle() {
    return function (dispatch) {
      dispatch({
        type: actionTypes.SETTLE,
      });
      dispatch(push("/"));
    };
  },
};
```

### 14.11 Cart\index.js
src\views\Cart\index.js
```diff
+import React, { useState,useRef } from "react";
+import { connect } from "react-redux";
+import { Button, Input, SwipeAction, Modal, Grid, Space, Checkbox, List,Dialog } from "antd-mobile";
+import NavHeader from "@/components/NavHeader";
+import actions from "@/store/actions/cart";
+import './index.less';
+function Cart(props) {
+    const confirmSettle = () => {
+        Modal.confirm({
+            content: '请问你是否要结算',
+            onConfirm: () => {
+                props.settle();
+            },
+        })
+    };
+    let totalCount = props.cart
+        .filter((item) => item.checked)
+        .reduce((total, item) => total + item.count, 0);
+    let totalPrice = props.cart
+        .filter((item) => item.checked)
+        .reduce(
+            (total, item) =>
+                total + parseFloat(item.lesson.price.replace(/[^0-9\.]/g, "")) * item.count,
+            0
+        );
+    return (
+        <div style={{ padding: '2px' }}>
+            <NavHeader>购物车</NavHeader>
+            <CarrItems cart={props.cart} changeCartItemCount={props.changeCartItemCount} removeCartItem={props.removeCartItem} changeCheckedCartItems={props.changeCheckedCartItems} />
+            <Grid columns={15} gap={8}>
+                <Grid.Item span={3}>
+                    <Button
+                        type="warning"
+                        size="small"
+                        onClick={props.clearCartItems}
+                    >清空</Button>
+                </Grid.Item>
+                <Grid.Item span={5}>
+                    已选择{totalCount}件商品
+                </Grid.Item>
+                <Grid.Item span={4}>¥{totalPrice}元</Grid.Item>
+                <Grid.Item span={3}>
+                    <Button type="primary" size="small" onClick={confirmSettle}>结算</Button>
+                </Grid.Item>
+            </Grid>
+        </div>
+    );
+}
+const CarrItems = ({ cart, changeCartItemCount, removeCartItem, changeCheckedCartItems }) => {
+    const [value, setValue] = useState([])
+    const swipeActionRef = useRef(null)
+    return (
+        <Space direction='vertical'>
+            <Checkbox
+                indeterminate={value.length > 0 && value.length < cart.length}
+                checked={value.length === cart.length}
+                onChange={checked => {
+                    let newValue;
+                    if (checked) {
+                        newValue = cart.map(item => item.lesson.id);
+                    } else {
+                        newValue = [];
+                    }
+                    setValue(newValue)
+                    changeCheckedCartItems(newValue);
+                }}
+            >全选</Checkbox>
+            <Checkbox.Group
+                value={value}
+                onChange={v => {
+                    setValue(v)
+                    changeCheckedCartItems(v);
+                }}
+            >
+                <Space direction='vertical'>
+                    <List>
+                        {cart.map(item => (
+                                <List.Item>
+                                    <SwipeAction 
+                                     ref={swipeActionRef}
+                                     closeOnAction={false}
+                                     closeOnTouchOutside={false}
+                                      rightActions={[
+                                        {
+                                            key: 'remove',
+                                            text: '删除',
+                                            color: 'red',
+                                            onClick: async (value) => {
+                                                console.log('value',value)
+                                                const result = await Dialog.confirm({
+                                                    content: '确定要删除吗？',
+                                                })
+                                                if(result){
+                                                    removeCartItem(item.lesson.id);
+                                                }
+                                                swipeActionRef.current?.close()
+                                            },
+                                        }
+                                    ]}>
+                                    <Grid columns={12} gap={8}>
+                                        <Grid.Item span={1}>
+                                            <Checkbox value={item.lesson.id} checked={item.checked}></Checkbox>
+                                        </Grid.Item>
+                                        <Grid.Item span={6}>
+                                            {item.lesson.title}
+                                        </Grid.Item>
+                                        <Grid.Item span={2}>
+                                            ¥{item.lesson.price}
+                                        </Grid.Item>
+                                        <Grid.Item span={3}>
+                                            <Input
+                                                value={item.count}
+                                                onChange={val => {
+                                                    changeCartItemCount(item.lesson.id, Number(val))
+                                                }}
+                                            />
+                                        </Grid.Item>
+                                    </Grid>
+                                    </SwipeAction>
+                                </List.Item>
+                        ))}
+                    </List>
+                </Space>
+            </Checkbox.Group>
+        </Space>
+    )
+}
+let mapStateToProps = (state) => state;
+export default connect(mapStateToProps, actions)(Cart);
```

### 14.12 Cart\index.less
src\views\Cart\index.less
```js
.adm-grid{
    display: grid;
    align-items: center;
    height:64px;
}
.adm-grid-item{
    font-size:32px;
    line-height: 32px;
}
```