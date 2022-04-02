import "@johnlindquist/kit";

import config from "../config";
const { homeDirPath } = config;

let dirs = await readdir(homeDirPath);

let selectedDir = await arg(
  "Open Project:",
  dirs.map((dir) => ({
    name: dir,
    description: home(homeDirPath, dir),
    value: home(homeDirPath, dir),
  }))
);

edit(selectedDir);
