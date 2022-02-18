import "@johnlindquist/kit";

const gitRepo = await arg("Git Repo:");
const homeDirPath = "Documents/http/";
const homeDir = home(homeDirPath);
await exec(`cd ${homeDir} && git clone ${gitRepo}`);

let dirnName = gitRepo;
dirnName = dirnName.split("/").at(-1);
dirnName = dirnName.split(".")[0];

edit(home(homeDirPath, dirnName));
