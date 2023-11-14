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
  targetValue: 0,
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

  const element = document.createElement(node.tag);

  // console.log(node);
  if (node.componentPosition === TARGET_DATA_FOR_RERENDER.targetValue) {
    console.log(node);
    // console.log(node.componentPosition);
    // TARGET_DATA_FOR_RERENDER.targetElement = element;

    // 중복 감지 방지를 위해 초기화 필요
    TARGET_DATA_FOR_RERENDER.targetCompPosition = 0;
    TARGET_DATA_FOR_RERENDER.targetValue = 0;
  }

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
  state.currentComponentPosition = 0;
};

const createElement = (tag, props, ...children) => {
  props = props || {};

  // console.log(state.stateList)

  if (typeof tag === "function") {

    TARGET_DATA_FOR_RERENDER.targetCompPosition++;

    return tag({
      ...props,
      children: children.length === 1 ? children[0] : children,
    });
  }

  return {
    tag,
    props,
    children: children.flat(),
    componentPosition: TARGET_DATA_FOR_RERENDER.targetCompPosition,
  };
};

const useState = (defaultState) => {
  let position = state.currentComponentPosition;


  let aaa = TARGET_DATA_FOR_RERENDER.targetCompPosition;

  if (state.stateList[position] === undefined) {
    setStateListElementValue(defaultState ?? null);
  }

  increaseCurrentCompState();

  const updateState = (stateTodBeUpdated) => {
    const currentState = state.stateList[position];

    if (currentState !== stateTodBeUpdated) {
      state.stateList[position] = stateTodBeUpdated;

      TARGET_DATA_FOR_RERENDER.targetValue = aaa;

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
    console.log(vdom);
    addVdomOnParentContainer(vdom);
    initializeCurrentCompPosition();

    TARGET_DATA_FOR_RERENDER.targetCompPosition = 1;
  };

  const reRender = () => {
    containerClosure.removeChild(containerClosure.firstChild);
    addVdomOnParentContainer(App());
    initializeCurrentCompPosition();

    TARGET_DATA_FOR_RERENDER.targetCompPosition = 1;
  };

  return { render, reRender };
};

const { render, reRender } = makeClosureContextFunctions();

export { useState, render, createElement, createDom };
