import { Octokit } from "@octokit/rest";

declare global {
  // eslint-disable-next-line no-var
  var octokit: Octokit | undefined;
}

const octokit =
  global.octokit ||
  new Octokit({
    auth: process.env.GH_TOKEN,
  });

if (process.env.NODE_ENV === "development") global.octokit = octokit;

export default octokit;
