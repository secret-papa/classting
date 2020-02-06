const SET_USER = 'SET_USER';

export const createSetUserAction = (user) => ({
  type: SET_USER,
  payload: {
    user
  }
})

export default function(state = {}, action) {
  switch(action.type) {
    case [SET_USER]: {
      return {
        ...action.payload.user
      }
    }
    default: return state
  }
}