
const initial = {
  userData: {},
  workLogData: []
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
    case "SET_WORK_LOG_DATA": {
      return {
        ...state,
        workLogData: [
          ...action.payload,
        ]
      }
    }
    default: 
      return state;
  }
}