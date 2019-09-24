import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.less";

export default class Vavbar extends React.Component {
  constructor() {
    super();
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
              <li>
                <Link to="/table?store=default">默认</Link>
              </li>
              <li>
                <Link to="/table?store=other">其他</Link>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    );
  }
}
