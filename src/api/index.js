import axios from 'axios';
//指定axios默认的请求基准地址
//axios.defaults.baseURL = 'http://ketang.zhufengpeixun.com/api';
axios.defaults.baseURL = 'http://localhost:9898';
//设置axios默认的post请求头的请求类型
axios.defaults.headers.post['Content-Type'] = 'application/json';
//使用请求拦截器，用于在发送请求前进行一些操作
axios.interceptors.request.use(
    (config)=>{//如果一切正常，走此正常的拦截器
        //每次请求服务器接口的时候都要从sessionStorage中获取保存的access_token
        let access_token = sessionStorage.getItem('access_token');
        if(access_token){
            config.headers.Authorization = `Bearer ${access_token}`
        }
        return config;
    },
    (error)=>{//如果发生了错误，会走此失败的拦截器
        return Promise.reject(error);
    }
);
//使用响应拦截器，对响应数据做一些处理
axios.interceptors.response.use(
    response=>response.data,//如果响应成功，则返回响应中的数据部分，也就是响应体
    error=>Promise.reject(error)//如果有错误，返回一个包括错误对象的失败的promise
);
export default axios;