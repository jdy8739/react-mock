import { render } from "./react";

const vdom = {
  tag: "div",
  props: {},
  children: [
    {
      tag: "h1",
      props: { style: "color:red" },
      children: ["Hello"],
    },
    {
      tag: "ul",
      props: {},
      children: [
        {
          tag: "li",
          props: {},
          children: ["first"],
        },
        {
          tag: "li",
          props: {},
          children: ["second"],
        },
        {
          tag: "li",
          props: {},
          children: ["third"],
        },
      ],
    },
  ],
};

render(document.querySelector("#root"), vdom);
