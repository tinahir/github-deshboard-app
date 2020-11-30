import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Repository } from "models/repository";
import { call, put, takeLatest, all } from "redux-saga/effects";
import * as githubApi from "api/github";

export interface ReposState {
  reposByOrg: Record<string, Repository[]>;
  isLoading: boolean;
  error: string | null;
}

interface ReposLoaded {
  org: string;
  repos: Repository[];
}

const reposInitialState: ReposState = {
  reposByOrg: {},
  isLoading: true,
  error: null,
};

function startLoading(state: ReposState) {
  state.isLoading = true;
  state.error = null;
}

function loadingFailed(state: ReposState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const reposSlice = createSlice({
  name: "repos",
  initialState: reposInitialState,
  reducers: {
    getRepos(state, _: PayloadAction<string>) {
      startLoading(state);
    },
    getReposSuccess(state, action: PayloadAction<ReposLoaded>) {
      const { repos, org } = action.payload;
      state.isLoading = false;
      state.error = null;
      state.reposByOrg[org] = repos;
    },
    getReposFailure: loadingFailed,
  },
});

export const {
  getRepos,
  getReposSuccess,
  getReposFailure,
} = reposSlice.actions;
export default reposSlice.reducer;

function* fetchRepos(action: PayloadAction<string>) {
  try {
    const data = yield call(githubApi.fetchRepos, action.payload);
    if (data && data.message) {
      yield put(getReposFailure(data.message));
    } else {
      yield put(getReposSuccess({ org: action.payload, repos: data }));
    }
  } catch (error) {
    yield put(getReposFailure(error.toString()));
  }
}

export function* watchFetchrepos() {
  yield takeLatest(getRepos, fetchRepos);
}
