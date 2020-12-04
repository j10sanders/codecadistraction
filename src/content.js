/*global chrome*/
/* src/content.js */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Frame, { FrameContextConsumer } from "react-frame-component";
import App from "./App";

// export const getCurrentTabUrl = (callback) => {
//   console.log("tab");
//   const queryInfo = { active: true, lastFocusedWindow: true };
//   console.log(chrome.tabs, "chrome.tabs", chrome);
//   chrome.tabs &&
//     chrome.tabs.query(queryInfo, (tabs) => {
//       console.log(tabs[0], "tabs of 0");
//       callback(tabs[0].url);
//     });
// };

const Main = () => {
  // const [display, setDisplay] = useState("block");
  // useEffect(() => {
  //   console.log("effect");
  //   getCurrentTabUrl((url) => {
  //     // setUrl(url || "undefined");
  //     console.log(url, "URL");
  //     if (url === "https://www.netflix.com/browse") {
  //       console.log("IT IS NETFLIX");
  //       setDisplay("block");
  //       // chrome.tabs.update({ url: "https://codecademy.com" });
  //     }
  //   });
  // }, []);
  // chrome.runtime.onMessage.addListener(function (
  //   request,
  //   sender,
  //   sendResponse
  // ) {
  //   console.log(
  //     sender.tab
  //       ? "from a content script:" + sender.tab.url
  //       : "from the extension"
  //   );
  //   // if (request.url == "hello") sendResponse({ farewell: "goodbye" });
  //   console.log(request, "REQWUREHILUFAIHLUAEHGIUY");
  // });
  return (
    <Frame
      // style={{ display: display }}
      head={[
        <link
          type="text/css"
          rel="stylesheet"
          href={chrome.runtime.getURL("/static/css/content.css")}
        ></link>,
      ]}
    >
      <FrameContextConsumer>
        {({ document, window }) => {
          return (
            <App
              document={document}
              window={window}
              isExt={true}
              // style={{ display: display }}
            />
          );
        }}
      </FrameContextConsumer>
    </Frame>
  );
};

const app = document.createElement("div");
app.id = "my-extension-root";

document.body.appendChild(app);
ReactDOM.render(<Main />, app);

app.style.display = "none";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "clicked_browser_action") {
    // toggle();
  }
  if (request.tab === "https://developer.chrome.com/extensions/messaging")
    toggle();
  console.log(request.greeting, "GREETING");
  console.log(request, "REQUESRT");
});

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log(
//     sender.tab
//       ? "from a content script:" + sender.tab.url
//       : "from the extension"
//   );
// });

function toggle() {
  if (app.style.display === "none") {
    app.style.display = "block";
  } else {
    app.style.display = "none";
  }
}
