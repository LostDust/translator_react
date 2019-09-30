import React from "react";
import store from "../store.js";
import styles from "./Translate.less";

class Translate extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
    this.clear = store.subscribe(this.storeUpdate.bind(this));
    this.state.fromType = "英文";
    this.state.toType = "中文";
  }
  componentWillUnmount() {
    this.clear();
  }
  storeUpdate() {
    this.setState(store.getState());
  }
  join(json) {
    let str = `${json.appid}${json.q}${json.salt}bR4o8cuH6rqJPyclgxDU`;
    let sign = hex_md5(str);
    return `?q=${json.q}&from=${json.from}&to=${json.to}&appid=${json.appid}&salt=${json.salt}&sign=${sign}`;
  }
  translation() {
    if (!this.state.input) return;
    let from = this.state.fromType;
    let to = this.state.toType;
    switch (from) {
      case "英文":
        from = "en";
        break;
      case "其他":
        from = "auto";
    }
    switch (to) {
      case "中文":
        to = "zh";
        break;
      case "英文":
        to = "en";
    }
    fetch(
      `http://203.195.141.131:3100/api?q=${this.state.input}&from=${from}&to=${to}`
    )
      .then(res => res.text())
      .then(msg => {
        store.dispatch({ type: "update#output", value: msg });
      });
    store.dispatch({ type: "query#has" });
  }
  changeValue(e, key) {
    this.setState({ [key]: e.target.value });
  }
  changeStore(e, key) {
    const action = {
      type: `update#${key}`,
      value: e.target.value
    };
    store.dispatch(action);
  }

  render() {
    return (
      <section className={styles.translate}>
        <textarea
          rows="4"
          value={this.state.input}
          onChange={e => this.changeStore(e, "input")}
        ></textarea>
        <div id={styles["form-group"]}>
          <div>
            <span>From：</span>
            <select
              onChange={e => this.changeValue(e, "fromType")}
              value={this.state.fromType}
            >
              <option>英文</option>
              <option>其他</option>
            </select>
          </div>
          <div>
            <span>To：</span>
            <select
              onChange={e => this.changeValue(e, "toType")}
              value={this.state.toType}
            >
              <option>中文</option>
              <option>英文</option>
            </select>
          </div>
          <div>
            <button onClick={() => this.translation()}>翻译</button>
          </div>
        </div>
        <textarea
          rows="4"
          value={this.state.output}
          onChange={e => this.changeStore(e, "output")}
        ></textarea>
      </section>
    );
  }
}

export default Translate;
