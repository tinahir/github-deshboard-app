import { combineReducers } from "@reduxjs/toolkit";

import reposReducer from "github/repos-slice";
import contributorsReducer from "github/contributors-slice";
import pullRequestsReducer from "github/pull-requests-slice";
import commitsReducer from "github/commits-slice";

const rootReducer = combineReducers({
  repos: reposReducer,
  contributors: contributorsReducer,
  pullRequests: pullRequestsReducer,
  commits: commitsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
