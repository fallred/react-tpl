import { push } from 'redux-first-history';
import { Toast } from 'antd-mobile';
import *  as actionTypes from '../action-types';
import { validate, register, login, uploadAvatar } from '@/api/profile';
const actionCreators = {
    validate() {
        //因为我们已经使用了中间件redux-promise
        //如果派发的动作对象的payload属性是一个promise的话，会promise成功，获取成功的值
        //再次派发动作 {type:VALIDATE,payload:{??}}
        return {
            type: actionTypes.VALIDATE,
            //我写了then了，说明已经注册了成功和失败的处理函数
            //说明已经对失败进行处理了
            payload: validate()
        }
    },
    //用户注册
    register(values) {
        //thunk中间件执行函数，并且向传递中传递dispatch参数
        return async function (dispatch) {
            try {
                //调用后端的注册接口，注册用户信息
                let result = await register(values);
                //如果注册成功了
                if (result.success) {
                    Toast.show({
                        icon: 'success',
                        content: '恭喜你注册成功'
                    });
                    //派发一个跳转到/login路径中的动作
                    dispatch(push('/login'));
                } else {
                    Toast.show({
                        icon: 'fail',
                        content: '注册失败'
                    });
                }
            } catch (error) {
                Toast.show({
                    icon: 'fail',
                    content: error.response.data.message
                });
            }
        }
    },
    //用户登录
    login(values) {
        //thunk中间件执行函数，并且向传递中传递dispatch参数
        return async function (dispatch) {
            try {
                //调用后端的注册接口，注册用户信息
                let result = await login(values);
                //如果注册成功了
                if (result.success) {
                    //如果登录成功，可以把服务器返回的token字符串，保存到sessionStorage
                    sessionStorage.setItem('access_token', result.data.token);
                    Toast.show({
                        icon: 'success',
                        content: '恭喜你登录成功'
                    });
                    //派发一个跳转到/login路径中的动作
                    dispatch(push('/profile'));
                } else {
                    Toast.show({
                        icon: 'fail',
                        content: '登录失败'
                    });
                }
            } catch (error) {
                Toast.show({
                    icon: 'fail',
                    content: error.response.data.message
                });
            }
        }
    },
    logout() {
        return function (dispatch) {
            //清除保存在sessionStorage中的access_token
            sessionStorage.removeItem('access_token');
            dispatch({ type: actionTypes.LOGOUT });
            //再次跳转到登录页重新登录
            dispatch(push('/login'));
        }
    },
    //上传头像 userId是上传的哪个用户的头像的ID， avatar是上传的图片，二进制文件
    uploadAvatar(userId, avatar) {
        //如果actionCreator里的函数能够返回一个async function
        return async function (dispatch) {
            try {
                //调用后端的注册接口，注册用户信息
                let result = await uploadAvatar(userId, avatar);
                //如果注册成功了
                if (result.success) {
                    //把上传的头像地址保存在redux仓库中
                    dispatch({
                        type: actionTypes.CHANGE_AVATAR,
                        payload: result.data
                    })
                    Toast.show({
                        icon: 'success',
                        content: '恭喜你上传头像成功'
                    });
                } else {
                    Toast.show({
                        icon: 'fail',
                        content: '上传头像失败'
                    });
                }
                return result;
            } catch (error) {
                console.log(error);
                Toast.show({
                    icon: 'fail',
                    content: '上传头像失败'
                });
            }
        }
    }
}
export default actionCreators;