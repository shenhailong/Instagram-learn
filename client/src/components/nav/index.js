import React, { Component } from 'react';
import { Menu, Dropdown , notification} from 'antd';
import { Link } from 'react-router-dom';
import Style from './index.scss'

class Nav extends Component {
  render () {
    const aboutMenu = (
      <Menu>
        <Menu.Item>
          关于
        </Menu.Item>
        <Menu.Item>
          退出
        </Menu.Item>
      </Menu>
    )

    return (
      <nav className={Style['page-header']}>
        <div className={`${Style['header']} ${Style['toggle']}`}>
          <div className={Style['navigate']}>
            <Dropdown overlay={aboutMenu}>
              {/* <Link to={'/about'} className="user"/> */}
              <a  className={Style['user']}></a>
            </Dropdown>
          </div>
        </div>
      </nav>
    )
  }
}

export default Nav
