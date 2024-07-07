import * as actionTypes from "../action-types";
import { validate, register, login,uploadAvatar } from '@/api/profile';
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
  uploadAvatar(userId,avatar){
    return function (dispatch) {
      return (async function () {
        try {
          let result = await uploadAvatar(userId,avatar);
          if (result.success) {
            dispatch({
              type: actionTypes.CHANGE_AVATAR,
              payload: result.data
            })
            Toast.show({
              icon: 'success',
              content: `上传成功`
            })
          } else {
            Toast.show({
              icon: 'fail',
              content: result.message
            })
          }
          return result
        } catch (error) {
          Toast.show({
            icon: 'fail',
            content: `上传失败`
          })
        }
      })();
    }
  }
};