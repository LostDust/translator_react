import React from "react";
import store from "../store.js";
import styles from "./Alert.less";

class Alert extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
    this.clear = store.subscribe(this.storeUpdate.bind(this));
  }
  componentWillUnmount() {
    this.clear();
  }
  storeUpdate() {
    this.setState(store.getState());
  }
  render() {
    return (
      <section className={styles.alert}>
        <ul>
          {this.state.alertList.map(item => {
            return (
              <li key={item.id}>
                <p>{item.content}</p>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default Alert;
