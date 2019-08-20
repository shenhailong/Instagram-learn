import React, { Component } from 'react';
import { Form, Icon, Input, Button, notification } from 'antd';
import Style from './index.scss'
import API from '@common/api.js'
import { withRouter } from 'react-router';
const FormItem = Form.Item;

class LoginForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      emailEmpty: false,
      passwordEmpty: false
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if(!err) {
        let response = await API.login(values)
        notification['success']({
          message: '登陆成功'
        })
        // let response = await 
      }
      const { history } = this.props;
      setTimeout(() => {
        history.push('/')
      }, 500)
    })
  }

  onChangeHandler(type, event) {
    this.setState({
      [type + 'Empty']: event.target.value !== ''
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <section className={Style.signup}>
        <h1 className="header">
          <span className="instagram"></span>
        </h1>
        <Form onSubmit={this.handleSubmit.bind(this)} className="sign-form">
          <FormItem>
            {
              getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: "请输入邮箱"
                  }
                ]
              })(
                <div className={`form-input ${this.state.emailEmpty && 'active'}`}>
                  <label htmlFor="label-phone">邮箱</label>
                  <Input onChange={this.onChangeHandler.bind(this, 'email')} id="label-phone" type="email"  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)'}}/>}/>
                </div>
              )
            }   
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: "请输入密码"
                  }
                ]
              })(
                <div className={`form-input ${this.state.passwordEmpty && 'active'}`}>
                  <label htmlFor="label-lock">密码</label>
                  <Input onChange={this.onChangeHandler.bind(this, 'email')} id="label-lock" type="password"  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}}/>}/>
                </div>
              )
            }
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="register-form-button">登陆</Button>
          </FormItem>
        </Form>
      </section>
    )
  }
};

const WrappedLoginForm = Form.create()(LoginForm)

export default withRouter(WrappedLoginForm);
