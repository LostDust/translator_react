import React, { Component } from "react";
import { HashRouter as Router, Link } from "react-router-dom";
// import { BrowserRouter as Router, Link } from "react-router-dom";
import store from "./store.js";
import RouteView from "./router.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = store.getState();
    this.clear = store.subscribe(this.storeUpdate.bind(this)); // 订阅
  }
  storeUpdate() {
    this.setState(store.getState());
  }
  componentWillUnmount() {
    this.clear();
  }
  change(e) {
    const action = {
      type: "update#msg",
      value: e.target.value
    };
    store.dispatch(action);
  }
  render() {
    return (
      <section id="app">
        <input
          value={this.state.msg || ""}
          onChange={e => this.change(e)}
        ></input>
        <br/>
        <Router>
          <Link to="/home">home</Link>
          <Link to="/other">other</Link>
          <RouteView></RouteView>
          {/* <RouteView {...this.props} /> 子路由 */}
        </Router>
      </section>
    );
  }
}

export default App;
