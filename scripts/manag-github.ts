// import "@johnlindquist/kit";

import { keyCodeFromKey } from "@johnlindquist/kit/core/keyboard";
import { Octokit } from "@octokit/rest";
import config from "../config";

// from template or fresh repository
const freshRepo = await arg("fresh repository?:", [
  { name: "fresh", description: "fresh", value: "fresh" },
  { name: "fromTemplate", description: "not fresh", value: "not-fresh" },
]);

const repositoryName = await arg("Repository Name:");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// await octokit.request("DELETE /repos/pawk3k/test", {
//   owner: "octocat",
//   repo: "test",
// });

// await octokit.request("POST /user/repos", {
//   name: repositoryName,
//   description: repositoryName,
//   private: true,
// });

// await exec(
//   `cd ${config.homeDirPath} && git clone https://github.com/pawk3k/${repositoryName}.git `
// );

// edit(`${config.homeDirPath}/${repositoryName}`);
// if (freshRepo === "not-fresh") {
//   // create new repository using  template

//   // await octokit.request(
//   //   "POST /repos/ryansonshine/typescript-npm-package-template/generate",
//   //   {
//   //     template_owner: "ryansonshine",
//   //     template_repo: "typescript-npm-package-template",
//   //     name: repositoryName,
//   //   }
//   // );
//   // await octokit.repos.createUsingTemplate({
//   //   template_owner: "ryansonshine",
//   //   template_repo: "typescript-npm-package-template",
//   //   name: repositoryName,
//   //   private: true,
//   // });

//   // await octokit.request(
//   //   "POST /repos/pawk3k/typescript-npm-package-template/generate",
//   //   {
//   //     template_owner: "pawk3k",
//   //     template_repo: "typescript-npm-package-template",
//   //     name: repositoryName,
//   //     headers: {},
//   //   }
//   // );
//   // clone https://github.com/pawk3k/test-3.git repository using  octokit
// }

await octokit.request("GET /repos/{owner}/{repo}", {
  owner: "pawk3k",
  repo: "test-3.git",
});
