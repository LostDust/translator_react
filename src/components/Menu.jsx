import React, { Component } from "react";
import store from "../store.js";
import styles from "./Menu.less";

class Menu extends Component {
  constructor() {
    super();
    this.state = store.getState();
    this.clear = store.subscribe(this.storeUpdate.bind(this));
  }
  storeUpdate() {
    this.setState(store.getState());
  }
  componentWillUnmount() {
    this.clear();
  }
  storeChange(e) {
    const action = {
      type: "update#store",
      value: e.target.value
    };
    store.dispatch(action);
  }
  changeValue(e, key) {
    const action = {
      type: `update#${key}`,
      value: e.target.value
    };
    store.dispatch(action);
  }
  addItem() {
    if (!this.state.input || !this.state.output) return;
    if (this.state.has) return;
    store.dispatch({ type: "add#" });
  }
  render() {
    return (
      <section className={styles.menu}>
        <ul>
          <li>
            <span>收藏到</span>
          </li>
          <li>
            <select
              value={this.state.store}
              onChange={e => this.storeChange(e)}
            >
              {Object.keys(this.state.data).map((item, index) => {
                return <option key={index}>{item}</option>;
              })}
            </select>
          </li>
          <li>
            <img
              src={`http://203.195.141.131:3100/src/png/star${
                this.state.has ? "-active" : ""
              }.png`}
              onClick={() => this.addItem()}
            />
          </li>
          <li>
            <img
              src={`http://203.195.141.131:3100/src/png/delete.png`}
              alt="delete.png"
              onClick={() => localStorage.clear()}
            />
          </li>
        </ul>
      </section>
    );
  }
}

export default Menu;
