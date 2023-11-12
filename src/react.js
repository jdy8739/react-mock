import state from "./state";

const checkIsTextNode = (node) => {
  const nodeType = typeof node;

  if (nodeType !== "function" && nodeType !== "object") {
    return true;
  } else if (node === null) {
    return true;
  }
  return false;
};

const addEventListenerOnNode = (key, func, element) => {
  switch (key) {
    case "onClick": {
      element.addEventListener("click", func);
      break;
    }
    case "onChange": {
      element.addEventListener("change", func);
      break;
    }
    default: {
      break;
    }
  }
};

/**
 * The function below is needed to be developed.
 */
const removeEventListenerOnNode = () => {
  //
};

const createDom = (node) => {
  const isTextNode = checkIsTextNode(node);

  if (isTextNode) {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.tag);

  Object.entries(node.props).forEach(([key, value]) => {
    if (typeof value === "function") {
      addEventListenerOnNode(key, value, element);
    } else {
      element.setAttribute(key, value);
    }
  });

  node.children.map(createDom).forEach((child) => element.appendChild(child));

  return element;
};

const setStateListElementValue = (value) => {
  state.stateList[state.currentComponentPosition] = value;
};

const increaseCurrentCompState = () => {
  state.currentComponentPosition = state.currentComponentPosition + 1;
};

const initializeStateList = () => {
  setStateListElementValue(null);
  increaseCurrentCompState();
};

const createElement = (tag, props, ...children) => {
  props = props || {};

  initializeStateList();

  if (typeof tag === "function") {
    return tag({
      ...props,
      children: children.length === 1 ? children[0] : children,
    });
  }

  return {
    tag,
    props,
    children: children.flat(),
  };
};

const insertStateInCurrentCompPosition = (defaultState) => {
  setStateListElementValue(defaultState);
  increaseCurrentCompState();
};

const useState = (defaultState) => {
  if (state.stateList[state.currentComponentPosition] === undefined) {
    insertStateInCurrentCompPosition(defaultState);
  }
  const updateState = (valueTodBeUpdate) => {
    updateVdom();
    setStateListElementValue(valueTodBeUpdate);
  };
  return [state.stateList[state.currentComponentPosition - 1], updateState];
};

const makeClosureContextFunctions = () => {
  let containerClosure;
  let vdomClosure;

  const registerClosure = (container, vdom) => {
    containerClosure = container;
    vdomClosure = vdom;
  };

  const render = (container, vdom) => {
    registerClosure(container, vdom);
    container.appendChild(createDom(vdom));
  };

  const updateVdom = () => {
    containerClosure.removeChild(containerClosure.firstChild);
    containerClosure.appendChild(createDom(vdomClosure));
  };

  return { render, updateVdom };
};

const { render, updateVdom } = makeClosureContextFunctions();

export { useState, render, createElement, createDom };
