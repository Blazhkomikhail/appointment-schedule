import { IWorklogItem } from "../../models/WorklogResponce";

const initial = {
  userData: {} as IWorklogItem,
  workLogData: Array<IWorklogItem>,
};

const ActionTypesEnum = {
  setUserData: "SET_USER_DATA",
  setWorkLogData: "SET_WORK_LOG_DATA",
};

type PropertiesTypes<T> = T extends {[key: string] : infer U} ? U : never;
type ActionTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>;
type ActionsTypesProp = ActionTypes<typeof actions>;

export default function reducer(state = initial, action: ActionsTypesProp) {
  switch (action.type) {
    case ActionTypesEnum.setUserData: {
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        }
      }
    }
    case ActionTypesEnum.setWorkLogData: {
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
};

export const actions = {
  setUserDataAction: (payload: any) => ({
    type: ActionTypesEnum.setUserData,
    payload
  } as const), 

  setWorkLogDataAction: (payload: IWorklogItem[]) => ({
    type: ActionTypesEnum.setWorkLogData,
    payload
  } as const),
}