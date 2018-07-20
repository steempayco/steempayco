import React, { Component } from "react"
import { Link } from 'react-router-dom'
import { Icon, Menu, Sidebar } from "semantic-ui-react"
import LoginPanelContainer from 'containers/LoginPanelContainer'
import Footer from 'components/Footer'
import globalConfig from 'config';

let menuStyleTransparent = {
    background: 'rgba(0,0,0,0)',
    boxShadow: 'none',
    border: 0
}

const NavBarMobile = ({
    children,
    slideMenu,
    onToggle,
    visible,
    overlay
}) => {
    return <div className="wrapper">
            <Sidebar as={Menu} animation="overlay" icon="labeled" inverted vertical visible={visible} width="thin">
                {slideMenu.map((item, key) => (
                    <Link key={key} to={item.link} onClick={onToggle}>
                        <Menu.Item name={item.name} >
                            <Icon name={item.icon} />
                            {item.name}
                        </Menu.Item>
                    </Link>
                ))}
                <Footer />
            </Sidebar>
            <div className="wrapper" onClick={visible ? onToggle : null}>
                <Menu fixed="top" borderless style={overlay ? menuStyleTransparent : {}}>
                    <Menu secondary>
                        <Menu.Item onClick={onToggle}>
                            <Icon name="sidebar" />
                        </Menu.Item>
                        <Menu.Item>
                            <h3>{globalConfig.brandName}</h3>
                        </Menu.Item>
                    </Menu>
                    <Menu.Menu position="right" style={{ padding: '10px' }}>
                        <Menu.Item fitted={true}>
                            <LoginPanelContainer />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                {children}
            </div>
        </div>
};

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
        const topMargin = this.props.overlay ? "0px" : "70px";

        return (
            <div className="wrapper" style={{ textAlign: 'center' }}>
                <NavBarMobile
                    slideMenu={slideMenu}
                    onPusherClick={this.handlePusher}
                    onToggle={this.handleToggle}
                    rightItems={rightItems}
                    visible={visible}
                    overlay={this.props.overlay}>
                    <div className="wrapper" style={{ display: 'inline-block', marginTop: topMargin }}>{children}</div>
                </NavBarMobile>
            </div>
        );
    }
}

export default AppFrame;