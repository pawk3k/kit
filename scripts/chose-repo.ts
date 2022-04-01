import "@johnlindquist/kit";

import config from "../config";

let dirs = await readdir(config.homeDirPath);

let selectedDir = await arg(
  "Open Project:",
  dirs.map((dir) => ({
    name: dir,
  }))
);

edit(selectedDir);
