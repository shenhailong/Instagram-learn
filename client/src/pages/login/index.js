import React, { Component } from 'react';
import Style from './index.scss'
import SignIn from './component/signin/index.js';
import SignUp from './component/signup/index.js';

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isSignUp: true
    }
  }

  // toggleSign = () => {

  // }

  render() {
    return (
      <main className={Style['login']}>
        <article className="login_info">
          <section className="descript">
            <div className="photo"></div>
          </section>
          <section children="login_dialog">
            {
              this.state.isSignUp ? 
              <SignIn /> :
              <SignUp toggleSign={this.toggleSign.bind(this)}/>
            }
          </section>
        </article>
      </main>
    )
  }
};

export default Login;
