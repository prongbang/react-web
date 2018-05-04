import ActionsType from '../../actions/types'

let initialState = {

}

const UserReducer = (state = initialState, action) => {
    let nextState;
    switch(action.type) {
        case ActionsType.USER_UPDATE_PROFILE:
            return {
                ...state,
                ...action.value
            }
        break
        default:
            return state
    }
}

export default UserReducer