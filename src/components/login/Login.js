import React from 'react'
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import './login.css'
import logo from '../homenvi.svg'

class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {/*<span className={"login-form-title"}>Homenvi IEMS</span>*/}
                    <img className="login-form-logo" src={logo} alt={"logo"}/>
                    <br/>
                    <span className="login-form-title">登录</span>
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: '请输入用户名!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户名"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="密码"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox className={"login-form-remember"}>记住我</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">忘记密码？</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    Or <a href="" className={"login-form-register"}>立即注册!</a>
                </Form.Item>
            </Form>
        );
    }
}

const NormalLogin = Form.create({name: 'normal_login'})(NormalLoginForm);
export default NormalLogin;