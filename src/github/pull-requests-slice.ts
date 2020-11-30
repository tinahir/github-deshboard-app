import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PullRequest } from "models/pull-request";
import { call, put, takeLatest } from "redux-saga/effects";
import * as githubApi from "api/github";
import { CurrentRepo } from "types/current-repo";

export interface PullRequestsState {
  pullRequestsByRepo: Record<string, PullRequest[] | undefined>;
  isLoading: boolean;
  error: string | null;
}

interface PullRequestsLoaded {
  repo: string;
  pullRequests: PullRequest[];
}

const initialState: PullRequestsState = {
  pullRequestsByRepo: {},
  isLoading: true,
  error: null,
};

const pullRequestsSlice = createSlice({
  name: "pullRequests",
  initialState,
  reducers: {
    getPullRequests(state, _: PayloadAction<CurrentRepo>) {
      state.isLoading = true;
      state.error = null;
    },
    getPullRequestsSuccess(state, action: PayloadAction<PullRequestsLoaded>) {
      const { pullRequests, repo } = action.payload;
      state.pullRequestsByRepo[repo] = pullRequests;
      state.isLoading = false;
      state.error = null;
    },
    getPullRequestsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getPullRequests,
  getPullRequestsSuccess,
  getPullRequestsFailure,
} = pullRequestsSlice.actions;
export default pullRequestsSlice.reducer;

function* fetchPullRequests(action: PayloadAction<CurrentRepo>) {
  try {
    const { repo, org } = action.payload;
    const pullRequests = yield call(githubApi.fetchPullRequests, org, repo);

    yield put(getPullRequestsSuccess({ repo, pullRequests }));
  } catch (error) {
    yield put(getPullRequestsFailure(error.toString()));
  }
}

export function* watchFetchPullRequests() {
  yield takeLatest(getPullRequests, fetchPullRequests);
}
