import { KIT_FIRST_PATH } from "../core/utils.js"

let file = JSON.parse(
  await readFile(kenvPath("package.json"), {
    encoding: "utf8",
  })
)

let packages = (await arg(
  chalk`Which packages do you want to {red uninstall}`,
  [
    ...Object.keys(file?.dependencies || []),
    ...Object.keys(file?.devDependencies || []),
  ]
)) as string[]

//grab all the args you used `kit un jquery react`
if (typeof packages == "string") {
  packages = [packages, ...args]
}

let isYarn = await isFile(kenvPath("yarn.lock"))
let [tool, command] = (
  isYarn
    ? `yarn${global.isWin ? `.cmd` : ``} remove`
    : `npm${global.isWin ? `.cmd` : ``} un`
).split(" ")

if (global.isWin) {
  let contents = `## Uninstalling ${packages.join(
    " "
  )}...\n\n`

  let progress = ``
  let divP = div(md(contents))
  let { stdout, stderr } = exec(
    `${tool} ${command} ${packages.join(
      " "
    )} --loglevel verbose`,
    {
      env: {
        ...global.env,
        PATH: KIT_FIRST_PATH,
      },
      cwd: kenvPath(),
    }
  )
  let writable = new Writable({
    write(chunk, encoding, callback) {
      progress += chunk.toString()
      setDiv(md(contents + `~~~bash\n${progress}\n~~~`))
      callback()
    },
  })
  stdout.pipe(writable)
  stderr.pipe(writable)
  await divP
} else {
  let cwd = kenvPath()

  if (process.env.SCRIPTS_DIR) {
    cwd = kenvPath(process.env.SCRIPTS_DIR)
  }

  await term({
    command: `${tool} ${command} ${packages.join(
      " "
    )}`.trim(),
    shortcuts: [
      {
        name: "Continue",
        key: `ctrl+c`,
        bar: "right",
      },
    ],
    env: {
      ...global.env,
      PATH: KIT_FIRST_PATH,
    },
    cwd,
  })
}

await mainScript()

export {}
