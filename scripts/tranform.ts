import "@johnlindquist/kit";

const textCase = await arg("Transform:", [
  { name: "camelToSnake", description: "yarn", value: "yarn" },
  { name: "snakeToCamel", description: "npm", value: "npm" },
]);

switch (textCase) {
  case "camelToSnake": {
    // get selected text and change camel case to snake case
    const selectedText = await getSelectedText();
    const transformedText = String(selectedText).replace(
      /([A-Z])/g,
      (g) => `_${g.toLowerCase()}`
    );
    setSelectedText(transformedText);
  }
  case "snakeToCamel": {
    // get selected text and change snake case to camel case
    const selectedText = await getSelectedText();
    const transformedText = String(selectedText).replace(/(_[a-z])/g, (g) =>
      g.toUpperCase().replace("_", "")
    );
    inspect(transformedText);
    setSelectedText(transformedText);
  }
}

// margin-bottom
