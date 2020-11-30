import { Contributor } from "./contributor";

export interface PullRequest {
  id: number;
  title: string;
  state: string;
  number: number;
  user: Contributor;
}
