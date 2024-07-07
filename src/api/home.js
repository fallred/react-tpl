import axios from './';
export function getSliders() {
    return axios.get('/slider/list');
}
/**
 * 获取课程列表
 * @param {*} currentCategory 当前的分类
 * @param {*} offset 偏移量
 * @param {*} limit 每页的条数
 */
export function getLessons(category='all',offset,limit){
  //return axios.get(`/lesson/list?category=${currentCategory}&offset=${offset}&limit=${limit}`);
  return axios.get(`/lesson/list`,{
    params:{
      category,
      offset,
      limit
    }
  });
}
/**
 * 通过课程的ID获取课程的对象
 * @param {*} id 课程ID
 * @returns Promise<课程对象>
 */
export function getLesson(id){
  return axios.get(`/lesson/${id}`);
}