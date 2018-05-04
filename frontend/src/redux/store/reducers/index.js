import {combineReducers} from 'redux'
import routerReducer from '../../../routes/routerReducer'

import UserReducer from './user'
import AuthReducer from './auth'
import CountReducer from './count'

const AppReducer = combineReducers({
    user: UserReducer,
    auth: AuthReducer,
    count: CountReducer,
    routing: routerReducer
})

export default AppReducer