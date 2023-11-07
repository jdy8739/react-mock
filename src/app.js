import { createElement, render } from "./react";

const vdom = createElement(
  "div",
  {},
  createElement("h1", { style: "font-size: 50px; color: red;" }, "Hello"),
  createElement(
    "ul",
    {},
    createElement("li", { style: "color:red" }, "first"),
    createElement("li", { style: "color:blue" }, "second"),
    createElement("li", { style: "color:green" }, "third")
  )
);

render(document.querySelector("#root"), vdom);
