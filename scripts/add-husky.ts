import "@johnlindquist/kit";
// inspect to get current value

const homeDirPath = "Documents/http/foh-bohm/";
let dirs = await readdir(home(homeDirPath));

let selectedDir = await arg(
  "Open Project:",
  dirs.map((dir) => ({
    name: dir,
    description: home(homeDirPath, dir),
    value: home(homeDirPath, dir),
  }))
);
const packageManager = await arg("Package Manager:", [
  { name: "yarn", description: "yarn", value: "yarn" },
  { name: "npm", description: "npm", value: "npm" },
]);

// await exec(
//   `echo "module.exports = {extends: ['@commitlint/config-conventional']}" > ${selectedDir}/commitlint.config.js`
// );${selectedDir}"
const lintStaged = [
  "#!/bin/sh",
  `. "\'$(dirname "$0")\'/_/husky.sh"`,
  "npx lint-staged",
].join("\n");

if (packageManager === "npm") {
  await exec(` npm install --save-dev husky@6.0.0 lint-staged@11.1.2 `);

  await exec(`cd ${selectedDir} && npx husky install`);

  // const commitLint = [
  //   "#!/bin/sh",
  //   `. "\'$(dirname "$0")\'/_/husky.sh"`,
  //   "npx --no-install commitlint --edit",
  // ].join("\n");

  // await exec(`echo "${commitLint}" > ${selectedDir}/.husky/commit-msg`);
  await exec(`echo "${lintStaged}" > ${selectedDir}/.husky/pre-commit`);
  // await exec(`chmod +x ${selectedDir}/.husky/commit-msg`);
  await exec(`chmod +x ${selectedDir}/.husky/pre-commit`);

  await exec(`cd ${selectedDir} && npx husky install`);
} else if (packageManager === "yarn") {
  // install husky with yarn
  // await exec(
  //   `cd ${selectedDir} && yarn add --dev husky@6.0.0 lint-staged@11.1.2`
  // );
  await exec(`cd ${selectedDir} && npx husky install`);

  await exec(`echo "${lintStaged}" > ${selectedDir}/.husky/pre-commit`);

  await exec(`chmod +x ${selectedDir}/.husky/pre-commit`);

  await exec(`cd ${selectedDir} && npx husky install`);

  const packageJson = await readJson(`${selectedDir}/package.json`);

  const packageObject = JSON.parse(JSON.stringify(packageJson));

  const packageObjectScripts = packageObject.scripts;
  packageObjectScripts["prepare"] = "npx husky install";
  const newJsonObject = {
    ...packageObject,
    scripts: { ...packageObjectScripts },
  };

  await writeJson(`${selectedDir}/package.json`, newJsonObject);
}
