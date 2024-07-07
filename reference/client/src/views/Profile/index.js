import React, { useEffect,useState } from "react";
import { Button, List, Toast, Result, Mask,ImageUploader } from "antd-mobile";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import actions from "@/store/actions/profile";
import NavHeader from "@/components/NavHeader";
import { LOGIN_TYPES } from '@/constants';
import "./index.less";
function Profile(props) {
    const navigate = useNavigate();
    const [fileList, setFileList] = useState(()=>{
        return props.user?.avatar ? [{url:props.user.avatar}] : [];
    })
    useEffect(() => {
        props.validate().then((action)=>{
           if(action?.payload?.data?.avatar){
                setFileList([{url:action.payload.data.avatar}]);
           }
           return action;
        },()=>{Toast.show({
            icon: 'fail',
            content: `未登录`
        })})
    }, []);
    let content = null;
    switch (props.loginState) {
        case LOGIN_TYPES.UN_VALIDATE:
            content = <Mask visible={true} />;
            break;
        case LOGIN_TYPES.LOGINED:
            const uploadImage = async (file) => {
                let result = await props.uploadAvatar(props.user.id,file);
                return {url: result.data};
            };
            content = (
                <div className="user-info">
                    <List renderHeader={() => '当前登录用户'}>
                        <List.Item extra={props.user.username}>用户名</List.Item>
                        <List.Item extra={props.user.email}>邮箱</List.Item>
                        <List.Item extra={
                            <ImageUploader
                                maxCount={1}
                                onDelete={() => setFileList([])}
                                accept="image/jpg,image/jpeg,image/png,image/gif"
                                value={fileList}
                                upload={uploadImage}
                                beforeUpload={beforeUpload}
                                imageFit="fill"
                            />
                        }>头像</List.Item>
                    </List>
                    <Button type="primary" onClick={() => props.logout()}>退出登录</Button>
                </div>
            );
            break;
        case LOGIN_TYPES.UNLOGIN:
            content = (
                <Result
                    status='warning'
                    title='亲爱的用户你好，你当前尚未登录，请你选择注册或者登录'
                    description={
                        <div style={{ textAlign: "center", padding: "50px" }}>
                            <Button type="ghost" onClick={() => navigate("/login")}>登录</Button>
                            <Button
                                type="ghost"
                                style={{ marginLeft: "50px" }}
                                onClick={() => navigate("/register")}
                            >注册</Button>
                        </div>
                    }
                />
            )
    }
    return (
        <section>
            <NavHeader >个人中心</NavHeader>
            {content}
        </section>
    );
}
function beforeUpload(file) {
  const isLessThan2M = file.size / 1024 / 1024 < 2;
  if (!isLessThan2M) {
    Toast.show({
        icon: 'fail',
        content: "图片必须小于2MB!"
    })
    return false;
  }
  return file;
}
let mapStateToProps = (state) => state.profile;
export default connect(mapStateToProps, actions)(Profile);
