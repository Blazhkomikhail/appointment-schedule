import {takeEvery, put, call, fork} from "redux-saga/effects"
import UserService from "../../api/UserService";
import WorklogService from "../../api/WorklogService";
import { actions } from "../reducers/index";

async function getUserData () {
  return UserService.genUserData().then((resp) => {
    return resp.data.value.find((user) => user.email === "demo3@demo.com")[0] || []; 
  });
}

async function getWorklogData() {
  const response = await WorklogService.getAllData();
  return response?.data.value || [];
}

function* loadUserData () {
  try{
    const data = yield call(getUserData);
    yield put (actions.setUserDataAction(data));
  } catch {
    yield console.log('Error. Do something')
  }
}

function* loadWorkLogData () {
  try{
    const data = yield call(getWorklogData);
    yield put (actions.setWorkLogDataAction(data));
  } catch {
    yield console.log('Error. Do something')
  }
}

export function* profileWorkerSaga() {
  yield fork(loadUserData);
  yield fork(loadWorkLogData);
} 

export function* watchProfilePage() {
  yield takeEvery("PROFILE_PAGE_LOAD", profileWorkerSaga);
}

export default function* rootSaga () {
  yield watchProfilePage();
}