"use strict";

const cssRequest = fetch(chrome.runtime.getURL("styles.css"));

async function inject() {
  const css = await (await cssRequest).text();

  const styleSheet = new CSSStyleSheet();
  await styleSheet.replace(css);

  const codeExamples = document.querySelectorAll("mdn-code-example");

  for (const element of codeExamples) {
    element.shadowRoot.adoptedStyleSheets.push(styleSheet);
  }
}

window.addEventListener("load", inject);
