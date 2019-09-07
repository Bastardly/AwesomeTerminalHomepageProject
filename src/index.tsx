import React from "react";
import ReactDom from "react-dom";
import App from "src/App";
import "src/styles/index.css";

function init() {
    ReactDom.render(<App />, document.getElementById("app"));
}

document.addEventListener("DOMContentLoaded", init, false);
