/** @jsxImportSource @emotion/react */
import * as React from "react";
import css from "@styled-system/css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { getRepos, ReposState } from "github/repos-slice";
import { RootState } from "app/rootReducer";
import RepoCard from "@components/RepoCard";
import MessageBox from "@components/MessageBox";

const selectRepos = createSelector(
  (state: RootState) => state.repos,
  (_: any, org: string) => org,
  (repos: ReposState, org: string) => {
    return {
      isLoading: repos.isLoading,
      error: repos.error,
      repos: repos.reposByOrg[org],
    };
  }
);

const Dashboard: React.FunctionComponent = () => {
  let { org } = useParams();
  const dispatch = useDispatch();
  const { isLoading, error, repos } = useSelector((state: RootState) =>
    selectRepos(state, org)
  );

  React.useEffect(() => {
    dispatch(getRepos(org));
  }, [org]);

  if (isLoading) {
    return <MessageBox>Please wait, we are loading repositories...</MessageBox>;
  }

  if (error) {
    return <MessageBox>{error}</MessageBox>;
  }

  if (Array.isArray(repos) && repos.length === 0) {
    return (
      <MessageBox>{`Not able to find the repositoroes for ${org}`}</MessageBox>
    );
  }

  return (
    <article
      css={css({
        display: "grid",
        gap: [2, 3],
        gridTemplateColumns: [
          "repeat(1,minmax(0,1fr))",
          "repeat(1,minmax(0,1fr))",
          "repeat(2,minmax(0,1fr))",
        ],
      })}
    >
      {repos && repos.map((r) => <RepoCard key={r.id} repo={r} org={org} />)}
    </article>
  );
};

export default Dashboard;
