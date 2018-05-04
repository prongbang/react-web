import React, {Component} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {Route, Switch} from 'react-router'
import {Provider, connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import configureStore from '../redux/store';
import * as actionsCreator from '../redux/actions'

import App from '../components/App';
import Home from '../components/Home';
import AuthRoute from './auth-route'
import PrivateRoute from './private-route'
import Foo from '../components/Foo';
import Bar from '../components/Bar';
import WebLayout from '../components/layout'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Let the reducers handle initial state
const initialState = {}
const store = configureStore(initialState, history)

class Routes extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        console.log(this.props)

        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={App}/>
                        <Route path="/home" component={Home}/>
                        <PrivateRoute path="/foo" component={Foo}/>
                        <PrivateRoute path="/bar" component={Bar}/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default Routes