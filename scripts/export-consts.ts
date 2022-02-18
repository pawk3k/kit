import "@johnlindquist/kit";

let withImports = await arg("make imports", ["Yes", "No"]);

let selectedText = await getSelectedText();
// replace const with export const
const exportedText = selectedText.replaceAll("const", "export const ");
// Styled-components names

if (withImports === "Yes") {
  const regex = /(?<=const ).*(?= =)/g;
  copy(`import {${selectedText.match(regex).join(",")}}`);
} else {
  copy(exportedText);
}
