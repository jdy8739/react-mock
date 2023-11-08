export const createDom = (node) => {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.tag);

  Object.entries(node.props).forEach(([key, value]) =>
    element.setAttribute(key, value)
  );

  node.children.map(createDom).forEach((child) => element.appendChild(child));

  return element;
};

export const createElement = (tag, props, ...children) => {
  props = props || {};

  if (typeof tag === "function") {
    return tag({
      ...props,
      children: children.length === 1 ? children[0] : children,
    });
  }

  return { tag, props, children };
};

export const render = (container, vdom) => {
  container.appendChild(createDom(vdom));
};
