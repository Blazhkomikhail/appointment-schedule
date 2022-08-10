
const initial = {
  userData: {}
}

export default function reducer(state = initial, action) {
  switch (action.type) {
    case "SET_USER_DATA": {
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        }
      }
    }
    default: 
      return state;
  }
}