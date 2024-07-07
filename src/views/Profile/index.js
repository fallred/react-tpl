import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Mask, Toast, Result, Button, List, ImageUploader } from 'antd-mobile';
import './index.less';
import NavHeader from '@/components/NavHeader';
import actionCreators from '@/store/actionCreators/profile';
import { LOGIN_STATES } from '@/constants';
import { useNavigate } from 'react-router-dom';
function Profile(props) {
    //声明一个状态，默认值是空数组，保存图片
    const [fileList, setFileList] = useState(() => {
        //在第一次渲染的时候，肯定是没有user
        //如果我们是刷新此页面，那么此代码没有意义，
        //如果是从其它页面切换过来的，就可以使用
        return props?.user?.avatar ? [{url:props.user.avatar}] : [];
    });
    const navigate = useNavigate();
    useEffect(() => {
        //在第一渲染之后发送验证请求，服务器会返回user信息，保存到仓库中
        props.validate().then((action) => {
            if (action?.payload?.data?.avatar) {
                setFileList([{ url: action?.payload?.data?.avatar }]);
            }
        }).catch(() => {
            Toast.show({
                icon: 'fail',
                content: '验证失败'
            })
        });
    }, []);
    //将要渲染的内容
    let renderContent = null;
    //判断当前登录的类型
    switch (props.loginState) {
        case LOGIN_STATES.UN_VALIDATE://如果是未验证的状态
            renderContent = <Mask visible={true} />
            break;
        //如果当前的用户已经登录
        case LOGIN_STATES.LOGIN_ED:
            //如果用户选择了新的图片会调用此方法上传到服务器
            const uploadImage = async (file) => {
                //调用actionCreators对象中的上传头像的方法
                try {
                    let result = await props.uploadAvatar(props.user.id, file);
                    //result的data属性就是上传头像的地址
                    return { url: result.data };
                } catch (error) {
                    console.log(error);
                    return { url: '' }
                }
            }
            renderContent = (
                <div className='user-info'>
                    <List header='当前用户'>
                        <List.Item extra={props.user?.username}>用户名</List.Item>
                        <List.Item extra={props.user?.email}>邮箱</List.Item>
                        <List.Item extra={
                            <ImageUploader
                                maxCount={1}
                                accept="images/jpg,images/jpeg,images/gif,images/png"
                                imageFit='fit'
                                value={fileList}
                                upload={uploadImage}
                                onDelete={() => setFileList([])}
                                beforeUpload={beforeUpload}
                            />
                        }>头像</List.Item>
                    </List>
                    <Button type='primary' onClick={props.logout}>退出登录</Button>
                </div>
            )
            break;
        case LOGIN_STATES.UN_LOGIN:
            renderContent = (
                <Result
                    status="warning"
                    title="亲爱的用户你好，你当前尚未登录，请注册或者登录"
                    description={
                        <div style={{ textAlign: 'center', padding: '50px' }}>
                            <Button type='ghost' onClick={() => navigate('/login')}>登录</Button>
                            <Button type='ghost' style={{ marginLeft: '50px' }} onClick={() => navigate('/register')}>注册</Button>
                        </div>
                    }
                >
                </Result>
            )
            break;
        default:
            break;
    }
    return (
        <section>
            <NavHeader>个人中心</NavHeader>
            {renderContent}
        </section>
    )
}
//在文件上传前执行一些判断和校验
function beforeUpload(file) {
    //判断文件的大小是不是小于2M
    const isLessThan2M = file.size / 1024 / 1024 < 2;
    if (!isLessThan2M) {
        Toast.show({
            icon: 'fail',
            content: '图片的体积必须小于2MB'
        });
        //如果校验不通过，则返回false,不再走上传的逻辑
        return false;
    }
    return file;
}
const mapStateToProps = state => state.profile
//connect内部从外部的Provider获取仓库，然后从仓库中获取状态 store.getState()
//然后把状态传给 mapStateToProps，得到返回值，变成当前组件的属性
export default connect(
    mapStateToProps,
    actionCreators
)(Profile);