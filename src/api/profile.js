import axios from './';

export function validate() {
    //向服务器发请求，询问服务器当前的用户是否登录了
    //如果登录了，返回登录用户信息
    //如果没有登录，返回401，表示当前用户未登录
    return axios.get('/user/validate');
}
//用户注册
export function register(values) {
    return axios.post('/user/register', values);
}
//用户登录
export function login(values) {
    return axios.post('/user/login', values);
}
/**
 * 上传用户的头像
 * @param {*} userId 每个用户都有一个唯一ID
 * @param {*} avatar 头像文件
 */
export function uploadAvatar(userId, avatar) {
    //因为头像的上传是二进制文件的上传
    //要想上传必须使用FormData
    const formData = new FormData();
    //添加用户ID字段
    formData.append('userId', userId);
    //再添加头像的文件字段
    formData.append('avatar', avatar);
    //以post请求方法向服务器/user/uploadAvatar发起请求，
    //请求体是formData，请求头的内容类型为multipart/form-data
    return axios.post('/user/uploadAvatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}