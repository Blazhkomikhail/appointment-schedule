import {takeEvery, put, call, fork} from "redux-saga/effects"
import UserService from "../../api/UserService";
import WorklogService from "../../api/WorklogService";

function getUserData () {
  return UserService.genUserData().then((resp) => {
    return resp.data.value.filter((user) => user.email === "demo3@demo.com")[0]; 
  })
}

function getWorklogData() {
  return WorklogService.getAllData().then((resp) => {
    return resp.data.value;
  })
}

function* loadUserData () {
  const data = yield call(getUserData);

  yield put ({type: "SET_USER_DATA", payload: data});
}

function* loadWorkLogData () {
  const data = yield call(getWorklogData);

  yield put ({type: "SET_WORK_LOG_DATA", payload: data});
}

export function* profileWorkerSaga() {
  yield fork(loadUserData);
  yield fork(loadWorkLogData);
  // yield put ({type: "SET_USER_DATA", payload: data});
} 

export function* watchProfilePage() {
  yield takeEvery("PROFILE_PAGE_LOAD", profileWorkerSaga);
}

export default function* rootSaga () {
  yield watchProfilePage();
}