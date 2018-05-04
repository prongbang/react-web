import React, {Component} from 'react'
import {Route, Redirect} from 'react-router'

function AuthRoute ({component: Component, authen, ...rest}) {
    console.log("authen",authen, rest)
    return (
        <Route
            {...rest}
            render={(props) => authen === true
            ?<Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    )
}

export default AuthRoute