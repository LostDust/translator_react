import React, { Component } from "react";
import store from "../store.js";
import styles from "./Table.less";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.state.store = this.props.location.search.slice(1).split("=")[1];
    // console.log(this.state.data);
    // this.state.list = this.state.data[this.state.store];
    this.hashchange = this.hashchange.bind(this);
    this.clear = store.subscribe(this.storeUpdate.bind(this));
  }
  componentDidMount() {
    window.addEventListener("hashchange", this.hashchange);
  }
  componentWillUnmount() {
    this.clear();
    window.removeEventListener("hashchange", this.hashchange);
  }
  storeUpdate() {
    this.setState(store.getState());
    this.setState({ list: this.state.data[this.state.store] });
  }
  notFind(index) {
    // $(e.target)
    //   .parent()
    //   .find("[alt=play-circle]")
    //   .css("visibility", "hidden");
    let a = document.querySelector(
      `tbody tr:nth-child(${index + 1}) [alt=play-circle]`
    );
    console.log(a);
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
    const store = this.props.location.search.slice(1).split("=")[1];
    this.setState({
      store,
      list: this.state.data[store]
    });
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
            {this.state.list.map((item, index) => {
              return (
                <tr key={item.from}>
                  <td>{index + 1}</td>
                  <td>{item.from}</td>
                  <td>{item.to}</td>
                  <td>
                    <audio
                      src={`http://203.195.141.131:3100/src/media/${item.from}.mp3`}
                      onError={() => this.notFind(index)}
                    ></audio>
                    <img
                      src="http://203.195.141.131:3100/src/png/play-circle.png"
                      alt="play-circle"
                      onClick={() => this.play(index)}
                    />
                    <img
                      src="http://203.195.141.131:3100/src/png/close-circle.png"
                      alt="close-circle"
                      onClick={() => this.removeItem(index)}
                    />
                    <img
                      src="http://203.195.141.131:3100/src/png/message.png"
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
