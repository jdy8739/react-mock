class State {
  stateList = [];
  currentComponentPosition = 0;

  get stateList() {
    return this.stateList;
  }
  get currentComponentPosition() {
    return this.currentComponentPosition;
  }

  /**
   * @param {number} nextPosition
   */
  set currentComponentPosition(nextPosition) {
    if (typeof nextPosition === "number")
      this.currentComponentPosition = nextPosition;
  }
}

const state = new State();

export default state;
