// Name: format markdown

import "@johnlindquist/kit";

let selectedText = await getSelectedText();
const prettier = await npm("prettier");

const prettyMd = await prettier.format(selectedText, {
  parser: "markdown",
  arrowParens: "avoid",
  bracketSpacing: false,
  embeddedLanguageFormatting: "auto",
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 80,
  proseWrap: "always",
  quoteProps: "as-needed",
  requirePragma: false,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
  vueIndentScriptAndStyle: false,
});

await setSelectedText(prettyMd);
