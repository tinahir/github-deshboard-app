/** @jsxImportSource @emotion/react */
import * as React from "react";
import { createSelector } from "@reduxjs/toolkit";
import css from "@styled-system/css";
import { useDispatch, useSelector } from "react-redux";

import { GoGitPullRequest } from "react-icons/go";
import { RootState } from "app/rootReducer";
import {
  getPullRequests,
  PullRequestsState,
} from "../github/pull-requests-slice";
import MessageBox from "./MessageBox";

type Props = {
  repo: string;
  org: string;
};

const selectPullrequests = createSelector(
  (state: RootState) => state.pullRequests,
  (_: any, repo: string) => repo,
  (pullRequests: PullRequestsState, repo: string) => {
    return {
      isLoading: pullRequests.isLoading,
      error: pullRequests.error,
      pullRequests: pullRequests.pullRequestsByRepo[repo],
    };
  }
);

const PullRequests: React.FunctionComponent<Props> = ({ repo, org }) => {
  const dispatch = useDispatch();
  const { isLoading, error, pullRequests } = useSelector((state: RootState) =>
    selectPullrequests(state, repo)
  );

  React.useEffect(() => {
    dispatch(getPullRequests({ repo, org }));
  }, [repo, org]);

  if (isLoading) {
    return <MessageBox>Please wait, we are loading pull request...</MessageBox>;
  }

  if (error) {
    return <MessageBox>{error}</MessageBox>;
  }

  if (Array.isArray(pullRequests) && pullRequests.length === 0) {
    return (
      <MessageBox>Contributors did not create any pull request.</MessageBox>
    );
  }

  return (
    <article
      css={css({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        pb: 5,
        borderColor: "transparent",
        color: "gray.900",
      })}
    >
      <ol
        css={css({
          p: 0,
          m: 0,
          listStyle: "none",
          width: "100%",
        })}
      >
        {pullRequests &&
          pullRequests.map((pullRequest) => (
            <li key={pullRequest.id}>
              <div
                css={css({
                  display: "flex",
                  alignItems: "center",
                  py: 2,
                  borderWidth: 1,
                  borderColor: "gray.200",
                  borderTopWidth: 0,
                })}
              >
                <div
                  css={css({
                    flexShrink: 0,
                    mx: 2,
                    display: "flex",
                    height: 9,
                  })}
                >
                  <GoGitPullRequest size={18} color="green"></GoGitPullRequest>
                </div>
                <div
                  css={css({
                    py: 2,
                    flex: 1,
                  })}
                >
                  <p
                    css={css({
                      fontWeight: 900,
                      fontSize: 3,
                      m: 0,
                    })}
                  >
                    {pullRequest.title} <br />
                  </p>
                  <p
                    css={css({
                      m: 0,
                      mt: 2,
                      fontSize: 2,
                      fontWeight: 500,
                      color: "grays.700",
                    })}
                  >
                    opened by: {pullRequest.user.login}
                  </p>
                </div>
                <div
                  css={css({
                    px: 4,
                    py: 2,
                    bg: "green.200",
                    mr: 2,
                    borderRadius: 4,
                    color: "green.900",
                    textTransform: "capitalize",
                  })}
                >
                  {pullRequest.state}
                </div>
              </div>
            </li>
          ))}
      </ol>
    </article>
  );
};

export default PullRequests;
