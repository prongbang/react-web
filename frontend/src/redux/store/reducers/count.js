import ActionType from '../../actions/types'

const initialState = {
  number: 1
}

export default function CountReducer(state = initialState, action) {
  if(action.type === ActionType.INCREASE) {
    return { number: state.number + action.amount }
  }
  else if(action.type === ActionType.DECREASE) {
    return { number: state.number - action.amount }
  }
  return state
}
