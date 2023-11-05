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

const createDom = (node) => {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.tag);

  node.children.map(createDom).forEach((child) => element.appendChild(child));

  return element;
};

document.querySelector("#root").appendChild(createDom(vdom));
