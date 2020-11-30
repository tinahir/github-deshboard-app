import { Contributor } from "./contributor";

export interface CommitAndAuthor {
  author: Contributor;
  commit: Commit;
  sha: string;
}

export interface Commit {
  message: string;
  author: Author;
}

export interface Author {
  date: string;
  email: string;
  name: string;
}
