import ActionsType from './types'

export const setLogedIn = (isLogedIn, loginWith) => {
    return {
        type: ActionsType.USER_LOGEDIN,
        value: {
            isLogedIn: isLogedIn,
            loginWith: loginWith
        }
    }
}

export const authSuccess = () => ({type: 'AUTH_SUCCESS'})

export const authFail = () => ({type: 'AUTH_FAIL'})