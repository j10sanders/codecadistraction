/*global chrome*/
/* src/content.js */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";

const Main = () => {
  const [codeLater, setCodeLater] = useState(false);
  useEffect(() => {
    if (codeLater)
      document
        .getElementById("my-extension-root")
        .setAttribute("style", "display: none;");
  }, [codeLater]);
  return (
    <App
      document={document}
      window={window}
      isExt={true}
      codeLater={codeLater}
      setCodeLater={setCodeLater}
    />
  );
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.storage.local.get("lastValidCompletion", function (result) {
    console.log("Value currently is " + result.lastValidCompletion);
    if (
      new Date(result.lastValidCompletion) < new Date(new Date().toDateString())
    ) {
      console.log("EARLEIR THAN TODAY");
    } else {
      console.log(
        new Date(result.lastValidCompletion) <
          new Date(new Date().toDateString())
      );
    }
  });

  if (request.tab === "https://developer.chrome.com/extensions/messaging") {
    const app = document.createElement("div");
    app.id = "my-extension-root";

    document.body.appendChild(app);
    ReactDOM.render(<Main />, app);
    chrome.storage.local.get("lastValidCompletion", function (result) {
      console.log("Value currently is " + result.lastValidCompletion);
      if (
        new Date(result.lastValidCompletion) <=
        new Date(new Date().toDateString())
      ) {
        console.log("EARLEIR THAN TODAY");
      } else {
        console.log(
          new Date(result.lastValidCompletion) <
            new Date(new Date().toDateString())
        );
      }
    });
    if (request.tab === "https://www.codecademy.com/learn") {
      // Use to convert .getDay's return number to match the index in listed days (everything's off by 1 since .getDay() has Sunday as 0)
      console.log("AT CODECADEMY");
      const daysToIndices = { 0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5 };
      const weekEl = document.getElementById("target-week");
      const dayEls = [...weekEl.children];
      const today = new Date().getDay();
      let streakIndicator = dayEls[daysToIndices[today]].ariaLabel;

      // document.getElementById('target-counter')​
      // let vals = document.getElementById('target-counter').children
      // vals[0].innerHTML
      // vals[1].innerHTML.match(/\d/)[0]

      if (streakIndicator !== "") {
        chrome.storage.local.set(
          { lastValidCompletion: new Date().toDateString() },
          function () {
            console.log("Value is set to " + new Date());
          }
        );
      }
    }
    console.log(request.greeting, "GREETING");
    console.log(request, "REQUESRT");
  }
});
