import * as actionTypes from '@/store/action-types';
//定义Home的默认状态 当前分类是all
const initialState = {
    currentCategory: 'all',
    sliders: [],//存放轮播图的数组
    lessons: {
        list: [],//保存课程列表信息
        offset: 0,//下一次加载从哪个索引开始加载
        limit: 5,//第次加载多少条
        hasMore: true,//是否后面还有更多的数据,加载完成就是false,没加载就是true
        loading: false//当前是否正在加载数据中
    }
}
export default function (state = initialState, action) {
    switch (action.type) {
        //如果需要设置当前的分类的话
        case actionTypes.SET_CURRENT_CATEGORY:
            //返回一个新的状态对象，用动作中的payload设置或者覆盖分为中的currentCategory
            state.currentCategory=action.payload;
            return state;
        case actionTypes.GET_SLIDERS:
            state.sliders=action.payload.data;
            return state;
        case actionTypes.SET_LESSONS:
            state.lessons.loading=false;
            state.lessons.hasMore=action.payload.hasMore;
            state.lessons.list=[...state.lessons.list, ...action.payload.list];
            state.lessons.offset=state.lessons.offset + action.payload.list.length;
            return state;
        case actionTypes.REFRESH_LESSONS:
            return {
                ...state,
                lessons: {//覆盖lessons
                    ...state.lessons,
                    loading: false,
                    //用服务器返回的hasMore覆盖仓库中的hasMore
                    hasMore: action.payload.hasMore,
                    //在刷新的时候，用返回list直接覆盖list
                    list: action.payload.list,
                    //用返回的长度直接覆盖
                    offset:  action.payload.list.length
                }
            }
        case actionTypes.SET_LOADING:
            state.lessons.loading=action.payload;
            return state;
        default:
            return state;
    }
}