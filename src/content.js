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

  if (
    request.tab === "https://www.codecademy.com/learn" &&
    parseInt(
      document.getElementById("target-counter").firstElementChild.textContent
    ) > 0
  ) {
    chrome.storage.local.set(
      { lastValidCompletion: new Date().toDateString() },
      function () {
        console.log("Value is set to " + new Date());
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
