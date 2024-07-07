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
  refreshLessons() {
    return (dispatch, getState) => {
      (async function () {
        let { currentCategory, lessons: { limit, loading } } = getState().home;
        if (!loading) {
          dispatch({ type: actionTypes.SET_LESSONS_LOADING, payload: true });
          let result = await getLessons(currentCategory, 0, limit);
          dispatch({ type: actionTypes.REFRESH_LESSONS, payload: result.data });
        }
      })();
    }
  }
};