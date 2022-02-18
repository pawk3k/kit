import "@johnlindquist/kit"


const homeDirPath = "Documents/http";
let dirs = await readdir(home(homeDirPath));

let selectedDir = await arg(
  "Open Project:",
  dirs.map((dir) => ({
    name: dir,
    description: home(homeDirPath, dir),
    value: home(homeDirPath, dir),
  }))
);

edit(selectedDir)