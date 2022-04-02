import "@johnlindquist/kit";
import config from "../config";

const { homeDirPath } = config;
const projectName = await arg("Project Name:");

exec(`mkdir ${home(homeDirPath, projectName)}`);

edit(home(homeDirPath, projectName));
