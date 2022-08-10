import {takeEvery, put} from "redux-saga/effects"
import UserService from "../../api/UserService";


function getUserData () {
  // console.log("hello from there")
  return UserService.genUserData().then((resp) => {
    return resp.data.value.filter((user) => user.email === "demo3@demo.com")[0]; 
  })
}

export function* workerSaga() {
  const data = yield getUserData();

  yield put ({type: "SET_USER_DATA", payload: data});
} 

export function* watchProfilePage() {
  yield takeEvery("PROFILE_PAGE_LOAD", workerSaga);
}

export default function* rootSaga () {
  yield watchProfilePage();
}