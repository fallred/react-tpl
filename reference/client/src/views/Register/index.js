import React from "react";
import { connect } from "react-redux";
import actions from "../../store/actions/profile";
import { Link } from "react-router-dom";
import NavHeader from "../../components/NavHeader";
import { Form, Input, Button, Toast } from "antd-mobile";
import { UserAddOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import "./index.less";

function Register(props) {
    const onFinish = (values) => {
        props.register(values);
    };
    const onFinishFailed = (errorInfo) => {
        Toast.show({
            icon: "fail",
            content: "表单验证失败! " + errorInfo,
        });
    };
    return (
        <>
            <NavHeader>用户注册</NavHeader>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="register-form"
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
                <Form.Item
                    label="确认密码"
                    name="confirmPassword"
                    rules={[{ required: true, message: "请输入你的确认密码!" }]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="确认密码"
                    />
                </Form.Item>
                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[{ required: true, message: "请输入你的邮箱!" }]}
                >
                    <Input prefix={<MailOutlined />} type="email" placeholder="邮箱" />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        注册
                    </Button>
                    或者 <Link to="/login">立刻登录!</Link>
                </Form.Item>
            </Form>
        </>
    );
}

let mapStateToProps = (state) => state.profile;
export default connect(mapStateToProps, actions)(Register);
