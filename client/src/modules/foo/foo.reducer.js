import { INCREASE_COUNT, DECREASE_COUNT } from './foo.actions'

const initialState = {
  count: 0
}

export default function fooReducer(state = initialState, action = {}) {
  switch (action.type) {
    case INCREASE_COUNT:
      return { count: state.count + 1 }

    case DECREASE_COUNT:
      return { count: Math.max(0, state.count - 1) }

    default:
      return state
  }
}
