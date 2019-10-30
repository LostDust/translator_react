import React from "react";
import store from "../store.js";
import styles from "./Table.less";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    // update store's store name
    const nowStore = this.props.location.search.slice(1).split("=")[1];
    store.dispatch({ type: "update#store", value: nowStore });
    // bind hashChange event
    this.hashchange = this.hashchange.bind(this);
    window.addEventListener("hashchange", this.hashchange);
    this.clear = store.subscribe(this.storeUpdate.bind(this));
  }
  componentWillUnmount() {
    this.clear();
    window.removeEventListener("hashchange", this.hashchange);
  }
  storeUpdate() {
    this.setState(store.getState());
  }
  notFind(index) {
    document.querySelector(
      `tbody tr:nth-child(${index + 1}) [alt=play-circle]`
    ).style.visibility = "hidden";
  }
  play(index) {
    document.querySelector(`tbody tr:nth-child(${index + 1}) audio`).play();
  }
  removeItem(index) {
    const action = {
      type: `remove#${this.state.store}`,
      value: index
    };
    store.dispatch(action);
  }
  alertInfo() {
    alert("Test");
  }
  hashchange() {
    const nowStore = this.props.location.search.slice(1).split("=")[1];
    store.dispatch({ type: "update#store", value: nowStore });
  }
  render() {
    return (
      <section className={styles.table}>
        <table cellSpacing="0">
          <thead>
            <tr>
              <td>No</td>
              <td>From</td>
              <td>To</td>
              <td>Menu</td>
            </tr>
          </thead>
          <tbody>
            {this.state.data[this.state.store] &&
              this.state.data[this.state.store].map((item, index) => {
                return (
                  <tr key={item.from}>
                    <td>{index + 1}</td>
                    <td>{item.from}</td>
                    <td>{item.to}</td>
                    <td>
                      <audio
                        src={`http://203.195.141.131:3100/static/media/${item.from}.mp3`}
                        onError={() => this.notFind(index)}
                      ></audio>
                      <img
                        src="http://203.195.141.131:3100/static/png/play-circle.png"
                        alt="play-circle"
                        onClick={() => this.play(index)}
                      />
                      <img
                        src="http://203.195.141.131:3100/static/png/close-circle.png"
                        alt="close-circle"
                        onClick={() => this.removeItem(index)}
                      />
                      <img
                        src="http://203.195.141.131:3100/static/png/tool.png"
                        alt="message"
                        onClick={e => this.alertInfo(e)}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
    );
  }
}

export default Table;
