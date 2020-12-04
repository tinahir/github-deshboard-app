/** @jsxImportSource @emotion/react */
import * as React from "react";
import { createSelector } from "@reduxjs/toolkit";
import css from "@styled-system/css";

import { RootState } from "app/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  getContributors,
  ContributorsState,
} from "../github/contributors-slice";
import MessageBox from "./MessageBox";

type Props = {
  repo: string;
  org: string;
};

const selectContributors = createSelector(
  (state: RootState) => state.contributors,
  (_: any, repo: string) => repo,
  (contributors: ContributorsState, repo: string) => {
    return {
      isLoading: contributors.isLoading,
      error: contributors.error,
      contributors: contributors.contributorsByRepo[repo],
    };
  }
);

const Contributors: React.FunctionComponent<Props> = ({ repo, org }) => {
  const dispatch = useDispatch();
  const { isLoading, error, contributors } = useSelector((state: RootState) =>
    selectContributors(state, repo)
  );

  React.useEffect(() => {
    dispatch(getContributors({ repo, org }));
  }, [repo, org]);

  if (isLoading) {
    return <MessageBox>Please wait, we are loading contributors...</MessageBox>;
  }

  if (error) {
    return <MessageBox>{error}</MessageBox>;
  }

  if (Array.isArray(contributors) && contributors.length === 0) {
    return <MessageBox>Not able to found any contributors.</MessageBox>;
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
        maxHeight: "100vh",
        overflow: "auto",
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
        {contributors &&
          contributors.map((contributor) => (
            <li key={contributor.id}>
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
                    height: 12,
                    width: 12,
                    mx: 3,
                  })}
                >
                  <img
                    css={css({
                      height: 12,
                      width: 12,
                      borderRadius: "round",
                    })}
                    loading="lazy"
                    src={contributor.avatar_url}
                  ></img>
                </div>
                <div>{contributor.login}</div>
              </div>
            </li>
          ))}
      </ol>
    </article>
  );
};

export default Contributors;
