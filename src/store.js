import { createStore } from "redux";

const defaultState = {
  input: "hello",
  output: "",
  store: "default",
  has: false,
  data: {},
  list: []
};

function reducer(state = defaultState, action) {
  const [directive, key] = action.type.split("#");
  switch (directive) {
    case "update":
      return Object.assign({}, state, {
        [key]: action.value
      });
    case "add": {
      let newState = Object.assign({}, state);
      newState.data[state.store].push({ from: state.input, to: state.output });
      return newState;
    }
    case "remove": {
      let newState = Object.assign({}, state);
      newState.data[state.store].splice(action.value, 1);
      return newState;
    }
  }
  return state;
}

const store = createStore(reducer);
fetch(`http://203.195.141.131:3100/database/`)
  .then(res => res.json())
  .then(msg => {
    defaultState.data = msg;
    store.dispatch({ type: "update#data", value: msg });
  });

export default store;
