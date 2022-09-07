import { takeEvery, put, call, fork } from "redux-saga/effects";
import UserService from "../../api/UserService";
import WorklogService from "../../api/WorklogService";
import { actions } from "../reducers/index";
import { UserDataType } from "../../models/UserDataResponse";
import { IWorklogItem } from "../../models/WorklogResponce";

async function getUserData(): Promise<UserDataType | null> {
  const response = await UserService.genUserData();
  return (
    response.data.value.find((user) => user.email === "demo3@demo.com") || null
  );
}

async function getWorklogData(): Promise<IWorklogItem[] | []> {
  const response = await WorklogService.getAllData();
  return response?.data.value || [];
}

function* loadUserData() {
  try {
    const data: UserDataType = yield call(getUserData);
    yield put(actions.setUserDataAction(data));
  } catch {
    yield console.log("Error. Do something");
  }
}

function* loadWorkLogData() {
  try {
    const data: IWorklogItem[] = yield call(getWorklogData);
    yield put(actions.setWorkLogDataAction(data));
  } catch {
    yield console.log("Error. Do something");
  }
}

export function* profileWorkerSaga() {
  yield fork(loadUserData);
  yield fork(loadWorkLogData);
}

export function* watchProfilePage() {
  yield takeEvery("PROFILE_PAGE_LOAD", profileWorkerSaga);
}

export default function* rootSaga() {
  yield watchProfilePage();
}
