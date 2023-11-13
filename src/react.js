import App from "./app";
import state from "./state";

/**
 * 설계 수정 방안
 * 1. currentComponentPosition이 증가되는 기점을 컴포넌트(함수가)가 바뀌거나 useState가 호출되는 경우에만으로 교체.
 * 2. 이후에 해당 값을 가지고 배열 내의 state를 참조
 * 3. 해당 방안으로 state가 업데이트되는 컴포넌트를 재렌더링
 */

const TARGET_DATA_FOR_RERENDER = {
  targetCompPosition: 0,
  targetElement: null,
};

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

  // console.log(node);
  if (node.componentPosition === TARGET_DATA_FOR_RERENDER.targetCompPosition) {
    // console.log(node.componentPosition);
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
  // console.log(state.stateList, props, state.currentComponentPosition - 1);

  if (typeof tag === "function") {
    return tag({
      ...props,
      children: children.length === 1 ? children[0] : children,
    });
  }

  console.log(tag, children, state.currentComponentPosition - 1);

  return {
    tag,
    props,
    children: children.flat(),
    componentPosition: state.currentComponentPosition - 1,
  };
};

const useState = (defaultState) => {
  let position = state.currentComponentPosition;

  if (state.stateList[position] === undefined) {
    setStateListElementValue(defaultState);
  }

  const updateState = (stateTodBeUpdated) => {
    const currentState = state.stateList[position];

    if (currentState !== stateTodBeUpdated) {
      state.stateList[position] = stateTodBeUpdated;

      TARGET_DATA_FOR_RERENDER.targetCompPosition = position;
      console.log("position", position);

      reRender();
    }
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
    // console.log(vdom);
    addVdomOnParentContainer(vdom);
    initializeCurrentCompPosition();
  };

  const reRender = () => {
    containerClosure.removeChild(containerClosure.firstChild);
    addVdomOnParentContainer(App());
    initializeCurrentCompPosition();
  };

  return { render, reRender };
};

const { render, reRender } = makeClosureContextFunctions();

export { useState, render, createElement, createDom };
