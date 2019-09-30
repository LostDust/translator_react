import { createStore } from "redux";

const defaultState = {
  input: "hello",
  output: "",
  store: "default",
  has: false,
  data: {},
  alertList: []
};

function save(data, info) {
  console.log(data);
  fetch(`http://203.195.141.131:3100/save/`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" }
  })
    .then(res => res.text())
    .then(msg => {
      console.log(msg);
      store.dispatch({
        type: "alert#",
        value: info
      });
    });
}

function reducer(state = defaultState, action) {
  const [directive, key] = action.type.split("#");
  const newState = Object.assign({}, state);
  switch (directive) {
    case "update": {
      newState[key] = action.value;
      if (key != "store") break;
      if (!state.data[newState.store]) break;
      const result = state.data[newState.store].some(item => {
        return item.from == state.input;
      });
      newState.has = result ? true : false;
      break;
    }
    case "query": {
      const result = state.data[state.store].some(item => {
        return item.from == state.input;
      });
      newState[key] = result ? true : false;
      break;
    }
    case "add":
      newState.data[state.store].push({ from: state.input, to: state.output });
      newState.has = true;
      save(newState.data, "添加成功");
      break;
    case "remove":
      newState.data[state.store].splice(action.value, 1);
      save(newState.data, "删除成功");
      break;
    case "shift":
      newState.alertList.shift();
      break;
    case "alert": {
      console.log(`alert: ${action.value}`);
      // const id = new Date().getTime();
      // newState.alertList.push({ content: action.value, id });
      // setTimeout(() => {
      //   newState.alertList.shift();
      // }, 2000);
    }
  }
  return newState;
}

const store = createStore(reducer);
fetch(`http://203.195.141.131:3100/database/`)
  .then(res => res.json())
  .then(msg => {
    defaultState.data = msg;
    store.dispatch({ type: "update#data", value: msg });
  });

export default store;
