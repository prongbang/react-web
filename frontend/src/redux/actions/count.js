import ActionType from './types'

export const increase = (n) => {
    return {type: ActionType.INCREASE, amount: n}
}

export const decrease = (n) => {
    return {type: ActionType.DECREASE, amount: n}
}