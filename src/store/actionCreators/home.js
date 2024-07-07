import *  as actionTypes from '../action-types';
import {getSliders,getLessons,getLesson} from '@/api/home';

const actionCreators = {
    //调用此方法，可以派发一个action动作，用来修改当前home状态片分中的当前分类
    setCurrentCategory(currentCategory){
        return {
            type:actionTypes.SET_CURRENT_CATEGORY,
            payload:currentCategory
        }
    },
    getSliders(){
        return {
            type:actionTypes.GET_SLIDERS,//获取轮播图数组
            payload:getSliders()//是一个axios接口调用,返回一个promise
            //此promise会被redux-promise拦截，等接口调用这个promise完成
            //完后了以后再次派发此动作 ，只不过payload已经变成promise 成功的值了
            //{type:actionTypes.GET_SLIDERS,payload:{success:true,data:[]}}
        }
    },
    getLessons(){
        //redux-thunk拦截到函数类型的动作对象后，会执行此函数，并且传递2个参数
        return async function(dispatch,getState){
            const {currentCategory,lessons:{hasMore,offset,limit,loading}} = getState().home;
            //如果有更多数据，并且当前不是处于加载状态
            if(hasMore&&!loading){
                //在请求后台接口之前把loading设置为true
                dispatch({type:actionTypes.SET_LOADING,payload:true});
                //调用获取下一页课程列表的接口，获取返回的课程列表
                let result = await getLessons(currentCategory,offset,limit);
                //派发SET_LESSONS动作，把得到到课程列表数据保存到仓库中 {hasMore,list}
                dispatch({type:actionTypes.SET_LESSONS,payload:result.data});
            }
        }
    },
    refreshLessons(){
        //redux-thunk拦截到函数类型的动作对象后，会执行此函数，并且传递2个参数
        return async function(dispatch,getState){
            const {currentCategory,lessons:{list,loading}} = getState().home;
            //如果当前不是处于加载状态
            if(!loading){
                //在请求后台接口之前把loading设置为true
                dispatch({type:actionTypes.SET_LOADING,payload:true});
                //调用获取下一页课程列表的接口，获取返回的课程列表 15 0~15
                let result = await getLessons(currentCategory,0,list.length);
                //派发SET_LESSONS动作，把得到到课程列表数据保存到仓库中 {hasMore,list}
                dispatch({type:actionTypes.REFRESH_LESSONS,payload:result.data});
            }
        }
    },
    getLesson(id){
        return async function(){
            try {
                let result = await getLesson(id);
                if (result.success) {
                    return result.data;
                } else {
                    Toast.show({
                        icon: 'fail',
                        content: '获取课程详情失败'
                    });
                    return null;
                }
            } catch (error) {
                Toast.show({
                    icon: 'fail',
                    content: error.message
                });
                return null;
            }
        }
    }
}
export default actionCreators;