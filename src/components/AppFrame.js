import React, { Component } from "react"
import { Link } from 'react-router-dom'
import { Icon, Menu, Sidebar } from "semantic-ui-react"
import LoginPanelContainer from 'containers/LoginPanelContainer'
import Footer from 'components/Footer'

const NavBarMobile = ({
    children,
    slideMenu,
    onToggle,
    visible
  }) => (
    <div>
        <Sidebar as={Menu} animation="overlay" icon="labeled" inverted vertical visible={visible} width="thin">
          { slideMenu.map( (item, key) => (
            <Link key={key} to={item.link} onClick={onToggle}>
              <Menu.Item name={item.name} >
                <Icon name={item.icon} />
                {item.name}
              </Menu.Item>
            </Link>
          ))}
          <Footer/>
        </Sidebar>
      <div onClick={visible ? onToggle : null}>
        <Menu fixed="top" borderless>
          <Menu secondary>
          <Menu.Item onClick={onToggle}>
            <Icon name="sidebar" />
          </Menu.Item>
          <Menu.Item>
            <h3>Steem Pay</h3>
          </Menu.Item>
          </Menu>
          <Menu.Menu position="right" style={{padding: '10px'}}>
            <Menu.Item fitted={true}>
              <LoginPanelContainer />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        {children}
      </div>
      </div>
  );
  
const NavBarChildren = ({ children }) => (
  <div style={{ display: 'inline-block', marginTop: '70px'}}>{children}</div>
);

const slideMenu = [
  { name: 'Home', link: '/', icon: 'home' },
  { name: 'Sell', link: '/sell', icon: 'tag' },
  { name: 'Instant Sell', link: '/invoice', icon: 'clipboard' },
  { name: 'Scan to Pay', link: '/pay', icon: 'payment' },
  { name: 'Steempay API', link: '/api', icon: 'plug' },
  { name: 'Setting', link: '/setting', icon: 'setting' },
];

class AppFrame extends Component {
  state = {
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children, rightItems } = this.props;
    const { visible } = this.state;

    return (
      <div style={{textAlign: 'center'}}>
          <NavBarMobile
            slideMenu={slideMenu}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            rightItems={rightItems}
            visible={visible}>
            <NavBarChildren>{children}</NavBarChildren>
          </NavBarMobile>
      </div>
    );
  }
}

export default AppFrame;