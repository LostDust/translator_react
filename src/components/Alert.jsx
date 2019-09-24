import React, { Component } from "react";
import store from "../store.js";
import "./Alert.less";

class Alert extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }
  clickRemove(index) {
    e.stopPropagation();
    const action = {
      type: "Remove#alertList",
      value: index
    };
    store.dispatch(action);
  }
  render() {
    return (
      <section id="alert">
        <ul>
          {this.state.alertList.map((item, index) => {
            return (
              <li key={item.id}>
                <p>{item.content}</p>
                <img
                  src="http://localhost:9091/static/png/close-circle.png"
                  alt="close-circle"
                  onClick={e => this.clickRemove(e, index)}
                />
              </li>
            );
          })}
        </ul>
        {/* <transition-group tag="ul"> */}
        {/* </transition-group> */}
      </section>
    );
  }
}

export default Alert;
