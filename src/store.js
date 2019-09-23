import { createStore } from "redux";

const defaultState = {
  msg: "Hello~"
};
function reducer(state = defaultState, action) {
  const [directive, key] = action.type.split("#");
  switch (directive) {
    case "update":
      return {
        ...state,
        [key]: action.value
      };
  }
  return state;
}

export default createStore(reducer);
