import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Toast } from "antd-mobile";
import { UserAddOutlined, LockOutlined } from "@ant-design/icons";
import actions from "@/store/actions/profile";
import { Link } from "react-router-dom";
import NavHeader from "@/components/NavHeader";
import "./index.less";

function Login(props) {
    const onFinish = (values) => {
        props.login(values);
    };
    const onFinishFailed = (errorInfo) => {
        Toast.show({
            icon: "fail",
            content: "表单验证失败! " + errorInfo,
        });
    };
    return (
        <>
            <NavHeader>用户登录</NavHeader>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="login-form"
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: "请输入你的用户名!" }]}
                >
                    <Input prefix={<UserAddOutlined />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: "请输入你的密码!" }]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        登录
                    </Button>
                    或者 <Link to="/register">立刻注册!</Link>
                </Form.Item>
            </Form>
        </>
    );
}

const mapStateToProps = (state) => state.profile;
export default connect(mapStateToProps, actions)(Login);
