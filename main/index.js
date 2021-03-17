// Menu: Main
// Description: The "Main" Script
// Shortcut: cmd ;

//Note: Feel free to edit this file!

let { menu } = await cli("fns")

let script = await arg(
  `Which script do you want to run?`,
  menu,
  true
)
await run(script)