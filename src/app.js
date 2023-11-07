/* @jsx createElement */
import { createElement, render } from "./react";

const Title = () => {
  return <h1>Hi JSX</h1>;
};

const vdom = (
  <div>
    <Title></Title>
    <h1>this is jsx</h1>
  </div>
);

render(document.querySelector("#root"), vdom);
