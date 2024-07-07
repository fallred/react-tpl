import axios from "./";
export function getSliders() {
  return axios.get("/slider/list");
}
export function getLessons(currentCategory = "all",offset,limit) {
  return axios.get(
    `/lesson/list?category=${currentCategory}&offset=${offset}&limit=${limit}`
  );
}
export function getLesson(id) {
  return axios.get(`/lesson/${id}`);
}