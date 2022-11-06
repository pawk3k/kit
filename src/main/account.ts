// Name: Login to GitHub
// Description: Authenticate to Enable Features
import { authenticate } from "../api/kit.js"
import { getUserDb } from "../core/db.js"
import { cmd, userDbPath } from "../core/utils.js"
setChoices([])

let sponsorUrl = `https://github.com/sponsors/johnlindquist`
let userDb = await getUserDb()
if (userDb.login) {
  await arg("Account", ["Sign Out"])
  await rm(userDbPath)
  await replace({
    files: kenvPath(".env"),
    from: /GITHUB_SCRIPTKIT_TOKEN=.*/g,
    to: ``,
  })
  process.env.GITHUB_SCRIPTKIT_TOKEN =
    env.GITHUB_SCRIPTKIT_TOKEN = ``
  await mainScript()
} else {
  let topPane = md(
    `# Become a Script Kit Pro`,
    "px-5 pt-5 prose dark:prose-dark prose-sm"
  )
  let leftPane = md(`
## Free Account Features

- Create Gists

## Pro Account Features

- Debugger
- Separate Log Window
- Custom Themes

## Upcoming Pro Features
- Sync Scripts to GitHub Repo
- Run Script Remotely as GitHub Actions
- Advanced Widgets
- Screenshots
- Screen Recording
- Audio Recording
- Webcam Capture
- Desktop Color Picker
- Measure Tool
            `)
  let rightPane = md(`
> Select the [Script Kit Pro](${sponsorUrl}) Tier on the sponsor page to unlock all features`)

  await arg(
    {
      placeholder: "Account",
      enter: "Sign In",
      shortcuts: [
        {
          name: `Scroll`,
          key: `${cmd}+down`,
          bar: "right",
          onPress: async (input, { focused }) => {},
        },
        {
          name: "Open Sponsor Page",
          key: `${cmd}+o`,
          bar: "right",
          onPress: async (input, { focused }) => {
            open(sponsorUrl)
          },
        },
      ],
    },
    `
<div class="flex flex-col">
${topPane}
<div class="flex flex-row -mt-6">
  <div class="flex-1">${leftPane}</div>
  <div class="flex-1">${rightPane}</div>
</div>
</div>`
  )

  await authenticate()

  await mainScript()
}
