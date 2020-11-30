import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contributor } from "models/contributor";
import { call, put, takeLatest } from "redux-saga/effects";
import * as githubApi from "api/github";
import { CurrentRepo } from "types/current-repo";

export interface ContributorsState {
  contributorsByRepo: Record<string, Contributor[] | undefined>;
  isLoading: boolean;
  error: string | null;
}

interface ContributorsLoaded {
  repo: string;
  contributors: Contributor[];
}

const initialState: ContributorsState = {
  contributorsByRepo: {},
  isLoading: true,
  error: null,
};

const contributorsSlice = createSlice({
  name: "contributors",
  initialState,
  reducers: {
    getContributors(state, _: PayloadAction<CurrentRepo>) {
      state.isLoading = true;
      state.error = null;
    },
    getContributorsSuccess(state, action: PayloadAction<ContributorsLoaded>) {
      const { contributors, repo } = action.payload;
      state.contributorsByRepo[repo] = contributors;
      state.isLoading = false;
      state.error = null;
    },
    getContributorsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getContributors,
  getContributorsSuccess,
  getContributorsFailure,
} = contributorsSlice.actions;

export default contributorsSlice.reducer;

function* fetchContributors(action: PayloadAction<CurrentRepo>) {
  try {
    const { repo, org } = action.payload;
    const contributors = yield call(githubApi.fetchContributors, org, repo);

    yield put(getContributorsSuccess({ repo, contributors }));
  } catch (error) {
    yield put(getContributorsFailure(error.toString()));
  }
}

export function* watchFetchContributors() {
  yield takeLatest(getContributors, fetchContributors);
}
