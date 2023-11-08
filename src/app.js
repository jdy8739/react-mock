/* @jsx createElement */
import { createElement, render } from "./react";

const Title = ({ color = "grey", children }) => {
  return <h1 style={`color: ${color}`}>{children}</h1>;
};

const vdom = (
  <div>
    <Title color="blue">
      Hi JSX
      <p>sub title</p>
    </Title>
    <h1>this is jsx</h1>
    ...
  </div>
);

render(document.querySelector("#root"), vdom);
