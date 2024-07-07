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
        case actionTypes.REFRESH_LESSONS:
            return {
                ...state,
                lessons: {
                    ...state.lessons,
                    loading: false,
                    hasMore: action.payload.hasMore,
                    list: action.payload.list,
                    offset: action.payload.list.length,
                },
            };
        default:
            return state;
    }
}