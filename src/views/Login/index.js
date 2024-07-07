import { Form, Input, Button ,Toast} from 'antd-mobile'
import { connect } from 'react-redux';
import actionCreators from '@/store/actionCreators/profile';
import NavHeader from "@/components/NavHeader";
import { Link } from 'react-router-dom';
import { LockOutlined, UserAddOutlined } from '@ant-design/icons';
import './index.less';
function Login(props) {
    //提交表单且数据验证成功后触发
    const onFinish = (values) => {
        //如果参数校验 成功，则调用注册方法，来自actionCreators
        props.login(values);
    }
    //提交表单且数据验证失败后触发
    const onFinishFailed = () => {
        Toast.show({
            icon: 'fail',
            content: '表单验证失败'
        });
    }
    return (
        <>
            <NavHeader>用户登录</NavHeader>
            <Form
                className='login-form'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input prefix={<UserAddOutlined />} placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input prefix={<LockOutlined />} placeholder="请输入密码名" clearable type='password'/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType="submit">登录</Button>
                    或者<Link to="/register">立即注册</Link>
                </Form.Item>
            </Form>
        </>
    )

}
export default connect(
    state => state.profile,
    actionCreators
)(Login);