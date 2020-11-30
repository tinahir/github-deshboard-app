import { all } from "redux-saga/effects";

import { watchFetchContributors } from "github/contributors-slice";
import { watchFetchPullRequests } from "github/pull-requests-slice";
import { watchFetchrepos } from "github/repos-slice";
import { watchFetchCommits } from "github/commits-slice";

export default function* rootSaga() {
  yield all([
    watchFetchrepos(),
    watchFetchContributors(),
    watchFetchPullRequests(),
    watchFetchCommits(),
  ]);
}
