import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.less";
import store from "../store.js";

export default class Vavbar extends React.Component {
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
      <section className={styles.navbar}>
        <ul>
          <li>
            <Link to="/main">翻译</Link>
          </li>
          <li>
            <span>收藏夹</span>
            <ul>
              {Object.keys(this.state.data).map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={`/table?store=${item}`}>{item}</Link>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </section>
    );
  }
}
