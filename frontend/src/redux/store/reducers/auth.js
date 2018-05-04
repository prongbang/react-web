import ActionsType from '../../actions/types'

let initialState = {
    isAuthenticated: true
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_SUCCESS':
            return {
            ...state,
            isAuthenticated: true
            }
        case 'AUTH_FAIL':
            return {
            ...state,
            isAuthenticated: false
            }
        default:
            return state
    }
}

export default AuthReducer