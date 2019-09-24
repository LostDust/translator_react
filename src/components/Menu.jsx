import React, { Component } from "react";
import store from "../store.js";
import "./Menu.less";

class Menu extends Component {
  constructor() {
    super();
    this.state = store.getState();
    this.clear = store.subscribe(this.storeUpdate.bind(this));
  }
  storeUpdate() {
    this.setState(store.getState());
  }
  selectChange(e) {
    const action = {
      type: "Update#store",
      value: e.target.value
    };
    store.dispatch(action);
  }
  addItem() {
    const action = {
      type: "Add#",
      value: ""
    };
    store.dispatch(action);
  }
  componentWillUnmount() {
    this.clear();
  }
  render() {
    return (
      <section id="menu">
        <ul>
          <li>
            <span>收藏到</span>
          </li>
          <li>
            <select
              value={this.state.store}
              onChange={e => this.selectChange(e)}
            >
              <option value="default">default</option>
              <option value="other">other</option>
            </select>
          </li>
          <li>
            <img
              src={`http://localhost:9091/static/png/star${
                this.state.has ? "-active" : ""
              }.png`}
              onClick={() => this.addItem()}
            />
          </li>
        </ul>
      </section>
    );
  }
}

export default Menu;
