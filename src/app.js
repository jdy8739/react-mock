/* @jsx createElement */
import { createElement, render } from "./react";

const elements = Array.from({ length: 9 }, (_, i) => i + 1);

const Title = ({ color = "grey", children }) => {
  return <h1 style={`color: ${color}`}>{children}</h1>;
};

const List = () => {
  return (
    <ul>
      {elements.map((el) => (
        <l1 key={el} style={`display: block;`}>
          {el}
        </l1>
      ))}
    </ul>
  );
};

const Greetings = ({ isBold }) => (
  <h1 style={`font-weight: ${isBold ? "bold" : "normal"}`}>Hello</h1>
);

const App = (
  <div>
    <Greetings isBold={true} />
    <Title color="red">
      Hi JSX
      <h2>sub title</h2>
      <h3>test</h3>
    </Title>
    <List />
  </div>
);

render(document.querySelector("#root"), <App />);
