import { fetcher } from "shared/fetcher";

const baseUrl = "https://api.github.com";

export async function fetchRepos(org: string) {
  return await fetcher(`${baseUrl}/orgs/${org}/repos?sort=pushed`);
}

export async function fetchMostRecentCommits(
  org: string,
  repo: string,
  perPage = 1
) {
  return await fetcher(
    `${baseUrl}/repos/${org}/${repo}/commits?per_page=${perPage}`
  );
}

export async function fetchContributors(org: string, repo: string) {
  return await fetcher(`${baseUrl}/repos/${org}/${repo}/contributors`);
}

export async function fetchPullRequests(org: string, repo: string) {
  return await fetcher(`${baseUrl}/repos/${org}/${repo}/pulls`);
}

export default { fetchRepos };
