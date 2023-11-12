import App from "./app";
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

const initializeCurrentCompPosition = () => {
  state.currentComponentPosition = 1;
};

const initializeStateList = () => {
  if (state.stateList[state.currentComponentPosition] === undefined)
    setStateListElementValue(null);
  increaseCurrentCompState();
};

const createElement = (tag, props, ...children) => {
  props = props || {};

  initializeStateList();
  // console.log(state.stateList, state.currentComponentPosition);

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

const useState = (defaultState) => {
  let position = state.currentComponentPosition;

  if (state.stateList[position] === undefined) {
    setStateListElementValue(defaultState);
  }

  const updateState = (valueTodBeUpdated) => {
    state.stateList[position] = valueTodBeUpdated;
    updateVdom();
  };
  return [state.stateList[position], updateState];
};

const makeClosureContextFunctions = () => {
  let containerClosure;

  const registerClosure = (container) => {
    containerClosure = container;
  };

  const addVdomOnParentContainer = (vdom) => {
    containerClosure.appendChild(createDom(vdom));
  };

  const render = (container, vdom) => {
    registerClosure(container);
    addVdomOnParentContainer(vdom);
    initializeCurrentCompPosition();
  };

  const updateVdom = () => {
    containerClosure.removeChild(containerClosure.firstChild);
    addVdomOnParentContainer(App());
    initializeCurrentCompPosition();
  };

  return { render, updateVdom };
};

const { render, updateVdom } = makeClosureContextFunctions();

export { useState, render, createElement, createDom };
