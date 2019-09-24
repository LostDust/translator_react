import { createStore } from "redux";

const defaultState = {
  input: "hello",
  output: ""
};
function reducer(state = defaultState, action) {
  const [directive, key] = action.type.split("#");
  switch (directive) {
    case "update":
      return Object.assign({}, state, {
        [key]: action.value
      });
  }
  return state;
}

export default createStore(reducer);
