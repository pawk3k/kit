import "@johnlindquist/kit";

const port = await arg("Port to expose:");

await exec(`npx ngrok http ${port}`);
