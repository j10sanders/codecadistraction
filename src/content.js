/*global chrome*/
/* src/content.js */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Frame, { FrameContextConsumer } from "react-frame-component";
import App from "./App";

const Main = () => {
  return (
    // <Frame
    //   head={[
    //     <link
    //       type="text/css"
    //       rel="stylesheet"
    //       href={chrome.runtime.getURL("/static/css/content.css")}
    //     ></link>,
    //   ]}
    // >
    // <FrameContextConsumer>
    //   {({ document, window }) => {
    // return (
    <App document={document} window={window} isExt={true} toggle={() => {}} />
  );
  //     }}
  //   </FrameContextConsumer>
  // </Frame>
  // );
};

// app.style.display = "block";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // if (request.message === "clicked_browser_action") {
  //   // toggle();
  // }
  chrome.storage.local.get("lastValidCompletion", function (result) {
    console.log("Value currently is " + result.lastValidCompletion);
    if (
      new Date(result.lastValidCompletion) < new Date(new Date().toDateString())
    ) {
      console.log("EARLEIR THAN TODAY");
      // toggle();
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
        // toggle();
      } else {
        console.log(
          new Date(result.lastValidCompletion) <
            new Date(new Date().toDateString())
        );
      }
    });
  }
  
  if (request.tab === "https://www.codecademy.com/learn" ) {
    // Use to convert .getDay's return number to match the index in listed days (everything's off by 1 since .getDay() has Sunday as 0)
    console.log('AT CODECADEMY')
    const indexToDays = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 0 }
    const weekEl = document.getElementById('target-week')
    const dayEls = [...weekEl.children]
    const daysCompleted = dayEls.reduce((a, c, idx) => {
      return c.ariaLabel ? [...a, indexToDays[idx]] : [...a]
    }, [])

    function checkTodaysCompletion() {
      const today = new Date().getDay()
      return daysCompleted[daysCompleted.length - 1] === today
    }
    
    const counterValues = document.getElementById('target-counter').children
    const target = Number(counterValues[0].innerHTML)
    const goal = Number(counterValues[1].innerHTML.match(/\d/)[0])
    const weeklyStreakCompleted = target >= goal

    const stats = {
      daysCompleted: daysCompleted,
      todayCompleted: checkTodaysCompletion(),
      weeklyStreakCompleted: weeklyStreakCompleted
    } 

    chrome.storage.local.set({ lastValidCompletion: stats }, function () {
        console.log("Value is set to " + stats.daysCompleted, stats.todayCompleted, stats.weeklyStreakCompleted);
      }
    );
    
  }
  console.log(request.greeting, "GREETING");
  console.log(request, "REQUESRT");
});

// function toggle() {
//   if (app.style.display === "none") {
//     app.style.display = "block";
//   } else {
//     app.style.display = "none";
//   }
// }
