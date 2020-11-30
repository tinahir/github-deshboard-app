/** @jsxImportSource @emotion/react */
import * as React from "react";
import css from "@styled-system/css";
import { Repository } from "models/repository";
import { HiOutlineUser, HiOutlineStar } from "react-icons/hi";
import { GoGitPullRequest } from "react-icons/go";
import moment from "moment";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import PullRequests from "@components/PullRequests";
import { RootState } from "app/rootReducer";
import { CommitAndAuthor } from "models/commit";
import { getCommits } from "github/commits-slice";
import Modal from "@components/Modal";
import IconButton from "./IconButton";
import Contributors from "@components/Contributors";

type Props = {
  repo: Repository;
  org: string;
};

const selectLastCommit = createSelector(
  (state: RootState) => state.commits,
  (_: any, repo: string) => repo,
  (commits, repo) => {
    let currentCommits = commits.CommitsByRepo[repo];
    let commit: CommitAndAuthor | undefined;
    if (Array.isArray(currentCommits)) {
      [commit] = currentCommits;
    }
    return {
      isLoading: commits.isLoading,
      error: commits.error,
      commit: commit,
    };
  }
);

const RepoCard: React.FunctionComponent<Props> = ({ repo, org }) => {
  const [showContributorsModal, setShowContributorsModal] = React.useState(
    false
  );
  const [showPullRequestsModal, setShowPullRequestsModal] = React.useState(
    false
  );

  const dispatch = useDispatch();
  const { commit } = useSelector((state: RootState) =>
    selectLastCommit(state, repo.name)
  );

  React.useEffect(() => {
    dispatch(getCommits({ repo: repo.name, org }));
  }, [repo.name, org]);

  const closeContributorsModal = React.useCallback(() => {
    setShowContributorsModal(false);
  }, []);

  const closePullRequestsModal = React.useCallback(() => {
    setShowPullRequestsModal(false);
  }, []);

  return (
    <article
      css={css({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        borderWidth: 1,
        borderColor: "gray.200",
        borderRadius: "medium",
        color: "rgba(0,0,0,1)",
        bg: "white",
        minHeight: "200px",
      })}
    >
      <div
        css={css({
          p: 3,
          height: "100%",
        })}
      >
        <h3
          css={css({
            mb: 3,
            color: "blue.600",
          })}
        >
          {repo.name}
        </h3>
        <p
          css={css({
            mb: 2,
            color: "gray.600",
          })}
        >
          {repo.description}
        </p>
        <p
          css={css({
            mb: 2,
            color: "gray.600",
          })}
        >
          Updated {moment(repo.pushed_at).fromNow()}
        </p>

        {commit && (
          <div
            css={css({
              display: "flex",
              mb: 2,
            })}
          >
            <div
              css={css({
                flexShrink: 0,
                height: 6,
                width: 6,
                mr: 2,
              })}
            >
              <img
                css={css({
                  height: 6,
                  width: 6,
                  borderRadius: "round",
                })}
                loading="lazy"
                src={commit?.author.avatar_url}
              ></img>
            </div>
            <div
              css={css({
                lineHeight: "default",
              })}
            >
              {commit?.author.login}{" "}
              <span
                css={css({
                  color: "gray.600",
                })}
              >
                {commit?.commit.message}
                {" - "}
                {moment(commit?.commit.author.date).fromNow()}
              </span>
            </div>
          </div>
        )}

        <Modal
          isOpen={!!showContributorsModal}
          onDismiss={closeContributorsModal}
          title="Contributors"
        >
          <Contributors repo={repo.name} org={org}></Contributors>
        </Modal>
        <Modal
          isOpen={!!showPullRequestsModal}
          onDismiss={closePullRequestsModal}
          title="Pull Requests"
        >
          <PullRequests repo={repo.name} org={org}></PullRequests>
        </Modal>
      </div>
      <div
        css={css({
          bg: "gray.200",
          p: 3,
          display: "flex",
          justifyContent: "space-between",
        })}
      >
        <IconButton>
          <HiOutlineStar />
          <span
            css={css({
              fontWeight: 500,
              ml: 1,
              lineHeight: "compact",
            })}
          >
            {repo.stargazers_count}
          </span>
        </IconButton>
        <IconButton onClick={() => setShowPullRequestsModal(true)}>
          <GoGitPullRequest />
        </IconButton>
        <IconButton onClick={() => setShowContributorsModal(true)}>
          <HiOutlineUser />
        </IconButton>
      </div>
    </article>
  );
};

export default RepoCard;
