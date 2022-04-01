// import "@johnlindquist/kit";

import { keyCodeFromKey } from "@johnlindquist/kit/core/keyboard";
import { Octokit } from "octokit";
import config from "../config";

const repositoryName = await arg("Repository Name:");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// await octokit.request("DELETE /repos/pawk3k/test", {
//   owner: "octocat",
//   repo: "test",
// });

// await octokit.request("POST /user/repos", {
//   name: repositoryName,
//   description: repositoryName,
// });

await exec(
  `cd ${config.homeDirPath} && git clone https://github.com/pawk3k/${repositoryName}.git `
);

edit(`${config.homeDirPath}/${repositoryName}`);
