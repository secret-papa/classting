const SET_USER = 'SET_USER';

export const createSetUserAction = (user) => ({
  type: SET_USER,
  payload: {
    user
  }
})

const initState = {
  isLoadedUser: false,
  user: null
}

export default function (state = initState, action) {
  switch(action.type) {
    case SET_USER: {
      return {
        ...state,
        isLoadedUser: true,
        user: action.payload.user
      }
    }
    default: return state;
    
  }
}