import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
// import "@codecademy/gamut-styles/core/index.scss";
import "./index.scss";

ReactDOM.render(<App isExt={false} />, document.getElementById("root"));
registerServiceWorker();
