import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import {
    Layout,
    Menu,
    Icon,
    Breadcrumb,
    LocaleProvider,
    Row,
    Col
} from 'antd';
import {push} from 'react-router-redux'
import th_TH from 'antd/lib/locale-provider/th_TH';
import 'moment/locale/th';
import PropTypes from 'prop-types';
import createHistory from 'history/createBrowserHistory'
import {NavLink, withRouter} from 'react-router-dom';

const {SubMenu} = Menu;
const {Header, Sider, Content, Footer} = Layout;

const AuthButton = withRouter(({history}) => history.push("/"));

const history = createHistory()

class WebLayout extends Component {

    state = {
        collapsed: false,
        current: 'home'
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    }

    static propTypes = {
        location: PropTypes.object.isRequired
    }

    render() {

        const {location} = this.props;

        console.log(location)

        return (
            <LocaleProvider locale={th_TH}>
                <Layout style={{
                    minHeight: '100vh'
                }}>
                    <Sider
                        breakpoint="lg"
                        onCollapse={this.onCollapse}
                        collapsible
                        collapsed={this.state.collapsed}
                        style={{
                        overflow: 'auto'
                    }}>
                        <div className="logo"/>
                        <Menu
                            theme="dark"
                            mode="inline"
                            selectedKeys={[location.pathname]}
                            defaultSelectedKeys={['/']}>
                            <Menu.Item key="/">
                                <NavLink to="/">
                                    <Icon type="user"/>
                                    <span>Web</span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/home">
                                <NavLink to="/home">
                                    <Icon type="home"/>
                                    <span>Home</span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/foo">
                                <NavLink to="/foo">
                                    <Icon type="video-camera"/>
                                    <span>Foo</span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/bar">
                                <NavLink to="/bar">
                                    <Icon type="upload"/>
                                    <span>Bar</span>
                                </NavLink>
                            </Menu.Item>
                            <SubMenu
                                key="sub1"
                                title={<span><Icon type="appstore"/><span>Navigation Three</span></span>}>
                                <Menu.Item key="3">Option 3</Menu.Item>
                                <Menu.Item key="4">Option 4</Menu.Item>
                                <SubMenu key="sub1-2" title="Submenu">
                                    <Menu.Item key="5">Option 5</Menu.Item>
                                    <Menu.Item key="6">Option 6</Menu.Item>
                                </SubMenu>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header
                            style={{
                            background: '#fff',
                            padding: 0
                        }}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed
                                ? 'menu-unfold'
                                : 'menu-fold'}
                                onClick={this.toggle}/>
                        </Header>
                        <Content
                            style={{
                            overflow: 'initial',
                            margin: '0 16px'
                        }}>
                            <Breadcrumb
                                style={{
                                margin: '16px 0'
                            }}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <div
                                style={{
                                padding: 24,
                                background: '#fff',
                                minHeight: 360
                            }}>
                                {this.props.children}
                            </div>
                        </Content>
                        <Footer
                            style={{
                            textAlign: 'center'
                        }}>
                            Ant Design ©2016 Created by Ant UED
                        </Footer>
                    </Layout>
                </Layout>
            </LocaleProvider>
        )
    }

}

export default withRouter(WebLayout)