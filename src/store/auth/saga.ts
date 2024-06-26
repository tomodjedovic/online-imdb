import { SagaIterator } from "redux-saga";

import { takeLatest, call, put } from "redux-saga/effects";
import {
  performUserLogin,
  performRegisterUser,
  performGetUserProfile,
  setUser,
} from "./slice";
import authService from "../../services/AuthService";

function* userLogin(action: { payload: any }): SagaIterator {
  try {
    const response = yield call(authService.login, action.payload);
    console.log("pokusaj logovanja : ", response);

    yield put(setUser(response));
  } catch (error) {
    console.log(error);
  }
}

function* getUserProfile(): SagaIterator {
  try {
    const response = yield call(authService.getUserProfile);
    yield put(setUser(response));
  } catch (error) {
    console.log(error);
  }
}

export function* watchUserLogin(): SagaIterator {
  yield takeLatest(performUserLogin.type, userLogin as () => SagaIterator);
}

function* registerUser(action: { payload: any }): SagaIterator {
  try {
    const response = yield call(authService.register, action.payload);
    yield put(setUser(response));
  } catch (error) {
    console.log(error);
  }
}

export function* watchRegisterUser(): SagaIterator {
  yield takeLatest(
    performRegisterUser.type,
    registerUser as () => SagaIterator
  );
}

export function* watchGetUserProfile(): SagaIterator {
  yield takeLatest(
    performGetUserProfile.type,
    getUserProfile as () => SagaIterator
  );
}
