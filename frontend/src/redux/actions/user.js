import ActionsType from './types'

export const updateProfile = (value) => {
    return {
        type: ActionsType.USER_UPDATE_PROFILE,
        value
    }
}