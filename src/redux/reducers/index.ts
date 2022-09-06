import { IWorklogItem } from "../../models/WorklogResponce";
import { UserDataType } from "../../models/UserDataResponse";

interface InitialStore {
  userData: UserDataType | object;
  workLogData: Array<IWorklogItem>;
}

const initial: InitialStore = {
  userData: {},
  workLogData: [],
};

enum ActionsTypes {
  SET_USER_DATA = "SET_USER_DATA",
  SET_WORK_LOG_DATA = "SET_WORK_LOG_DATA",
}

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
type ActionTypes<T extends { [key: string]: (...args: any[]) => any }> =
  ReturnType<PropertiesTypes<T>>;
type ActionsTypesProp = ActionTypes<typeof actions>;

export default function reducer(state = initial, action: ActionsTypesProp) {
  switch (action.type) {
    case ActionsTypes.SET_USER_DATA: {
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        },
      };
    }
    case ActionsTypes.SET_WORK_LOG_DATA: {
      return {
        ...state,
        workLogData: [...action.payload],
      };
    }
    default:
      return state;
  }
}

export const actions = {
  setUserDataAction: (payload: UserDataType) =>
    ({
      type: ActionsTypes.SET_USER_DATA,
      payload,
    } as const),

  setWorkLogDataAction: (payload: IWorklogItem[]) =>
    ({
      type: ActionsTypes.SET_WORK_LOG_DATA,
      payload,
    } as const),
};
