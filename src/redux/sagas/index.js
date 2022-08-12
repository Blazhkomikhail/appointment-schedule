import {takeEvery, put, call, fork} from "redux-saga/effects"
import UserService from "../../api/UserService";
import WorklogService from "../../api/WorklogService";

async function getUserData () {
  return UserService.genUserData().then((resp) => {
    return resp.data.value.filter((user) => user.email === "demo3@demo.com")[0] || []; 
  });
}

async function getWorklogData() {
  return WorklogService.getAllData().then((resp) => {
    return resp.data.value || [];
  });
}

function* loadUserData () {
  try {
  const data = yield call(getUserData);
  // console.log("user: ", data);
  yield put ({type: "SET_USER_DATA", payload: data});
} catch {
  yield console.log('Error. Do something')
}
}

function* loadWorkLogData () {
  try {
  const data = yield call(getWorklogData);
  // console.log("workLog: ", data);
  yield put ({type: "SET_WORK_LOG_DATA", payload: data});
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