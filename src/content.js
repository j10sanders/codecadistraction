/*global chrome*/
/* src/content.js */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";

const Main = ({ data }) => {
  const [codeLater, setCodeLater] = useState(false);
  useEffect(() => {
    if (codeLater) {
      chrome.storage.local.set(
        { snoozeTill: new Date().getTime() + 60000 * 60 },
        function () {
          console.log("1 minute snooze");
        }
      );
      document
        .getElementById("my-extension-root")
        .setAttribute("style", "display: none;");
    }
  }, [codeLater]);
  return (
    <App
      document={document}
      window={window}
      isExt={true}
      codeLater={codeLater}
      setCodeLater={setCodeLater}
      data={data}
    />
  );
};

const distractions = [
  "https://www.facebook.com/",
  "https://www.netflix.com/browse",
  "https://news.ycombinator.com/",
];

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // chrome.storage.local.get("lastValidCompletion", function (result) {
  //   console.log("Value currently is " + result.lastValidCompletion);
  //   if (
  //     new Date(result.lastValidCompletion) < new Date(new Date().toDateString())
  //   ) {
  //     console.log("EARLEIR THAN TODAY");
  //   } else {
  //     console.log(
  //       new Date(result.lastValidCompletion) <
  //         new Date(new Date().toDateString())
  //     );
  //   }
  // });

  if (distractions.includes(request.tab)) {
    chrome.storage.local.get("snoozeTill", function (result) {
      console.log(result.snoozeTill, new Date(result.snoozeTill) > new Date());
      if (result.snoozeTill && new Date(result.snoozeTill) > new Date()) {
        return;
      } else {
        chrome.storage.local.get("lastValidCompletion", function (result) {
          const app = document.createElement("div");
          app.id = "my-extension-root";

          document.body.appendChild(app);
          ReactDOM.render(<Main data={result.lastValidCompletion} />, app);
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
      }
    });
  }

  if (request.tab === "https://www.codecademy.com/learn") {
    // Use to convert .getDay's return number to match the index in listed days (everything's off by 1 since .getDay() has Sunday as 0)
    console.log("AT CODECADEMY");
    const indexToDays = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 0 };
    const weekEl = document.getElementById("target-week");
    const dayEls = [...weekEl.children];
    const daysCompleted = dayEls.reduce((a, c, idx) => {
      return c.ariaLabel ? [...a, indexToDays[idx]] : [...a];
    }, []);

    function checkTodaysCompletion() {
      const today = new Date().getDay();
      return daysCompleted[daysCompleted.length - 1] === today;
    }

    const counterValues = document.getElementById("target-counter").children;
    const target = Number(counterValues[0].innerHTML);
    const goal = Number(counterValues[1].innerHTML.match(/\d/)[0]);
    const weeklyStreakCompleted = target >= goal;

    const stats = {
      daysCompleted: daysCompleted,
      todayCompleted: checkTodaysCompletion(),
      weeklyStreakCompleted: weeklyStreakCompleted,
    };

    chrome.storage.local.set({ lastValidCompletion: stats }, function () {
      console.log(
        "Value is set to " + stats.daysCompleted,
        stats.todayCompleted,
        stats.weeklyStreakCompleted
      );
    });
  }
  console.log(request.greeting, "GREETING");
  console.log(request, "REQUESRT");
});
