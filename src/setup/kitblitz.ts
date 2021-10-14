#!/bin/env node

import { outputFile } from "fs-extra"

async function run() {
  let $PROJECT = path.resolve(process.cwd())
  let contents = `{
        "installDependencies": true,
        "startCommand": "kitblitz",
        "env": {
          "PATH": "${$PROJECT}:/bin:/usr/bin:/usr/local/bin"
        }
      }`

  let sbrcPath = path.resolve($PROJECT, ".stackblitzrc")
  await outputFile(sbrcPath, contents)
}

run()