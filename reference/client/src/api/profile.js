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
export function uploadAvatar(userId,avatar) {
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('avatar', avatar);
  return axios.post('/user/uploadAvatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}