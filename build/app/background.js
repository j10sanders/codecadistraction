// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function (tab) {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      message: "clicked_browser_action",
      tab: tabs[0].url,
    });
  });
});

// chrome.runtime.onStartup.addListener(() => {
//   console.log("[background.js] onStartup");
//   console.log("HHHEELLLOOOO");
//   alert("[background.js] onInstalled");
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.sendMessage(
//       tabs[0].id,
//       { greeting: "hello" },
//       function (response) {
//         console.log(response.farewell);
//       }
//     );
//   });
// });

// chrome.runtime.onConnect.addListener((port) => {
//   console.log("[background.js] onConnect", port);
//   alert("[background.js] onInstalled");
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     console.log(tabs[0].url);
//     chrome.tabs.sendMessage(
//       tabs[0].id,
//       { greeting: tabs[0].url },
//       function (response) {
//         console.log(response.farewell);
//       }
//     );
//   });
// });

chrome.tabs.onUpdated.addListener((activeInfo) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      message: "listener",
      tab: tabs[0].url,
    });
  });
});
