import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommitAndAuthor } from "models/commit";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import * as githubApi from "api/github";
import { CurrentRepo } from "types/current-repo";

export interface CommitsState {
  CommitsByRepo: Record<string, CommitAndAuthor[] | undefined>;
  isLoading: boolean;
  error: string | null;
}

interface CommitsLoaded {
  repo: string;
  Commits: CommitAndAuthor[];
}

const initialState: CommitsState = {
  CommitsByRepo: {},
  isLoading: true,
  error: null,
};

const commitsSlice = createSlice({
  name: "Commits",
  initialState,
  reducers: {
    getCommits(state, _: PayloadAction<CurrentRepo>) {
      state.isLoading = true;
      state.error = null;
    },
    getCommitsSuccess(state, action: PayloadAction<CommitsLoaded>) {
      const { Commits, repo } = action.payload;
      state.CommitsByRepo[repo] = Commits;
      state.isLoading = false;
      state.error = null;
    },
    getCommitsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getCommits,
  getCommitsSuccess,
  getCommitsFailure,
} = commitsSlice.actions;

export default commitsSlice.reducer;

function* fetchCommits(action: PayloadAction<CurrentRepo>) {
  try {
    const { repo, org } = action.payload;
    const Commits = yield call(githubApi.fetchMostRecentCommits, org, repo);

    yield put(getCommitsSuccess({ repo, Commits }));
  } catch (error) {
    yield put(getCommitsFailure(error.toString()));
  }
}

export function* watchFetchCommits() {
  yield takeEvery(getCommits, fetchCommits);
}
