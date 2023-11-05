import { createDom } from "./react";

const vdom = {
  tag: "div",
  props: {},
  children: [
    {
      tag: "h1",
      props: {},
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

document.querySelector("#root").appendChild(createDom(vdom));
