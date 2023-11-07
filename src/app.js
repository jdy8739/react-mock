import { createElement, render } from "./react";

const vdom = createElement("div", {}, [
  createElement("h1", { style: "color:red" }, ["Hello"]),
  createElement("ul", {}, [
    createElement("li", {}, ["first"]),
    createElement("li", {}, ["second"]),
    createElement("li", {}, ["third"]),
  ]),
]);

console.log(vdom);

render(document.querySelector("#root"), vdom);
