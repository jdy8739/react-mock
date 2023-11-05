export const createDom = (node) => {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.tag);

  node.children.map(createDom).forEach((child) => element.appendChild(child));

  return element;
};
