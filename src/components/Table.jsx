import React, { Component } from "react";
import store from "../store.js";
import "./Table.less";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.state.store = this.props.location.search.slice(1).split("=")[1];
    this.state.list = this.state.json[this.state.store];
    this.hashchange = this.hashchange.bind(this);
    this.clear = store.subscribe(this.storeUpdate.bind(this));
  }
  storeUpdate() {
    this.setState(store.getState());
  }
  notFind(e) {
    $(e.target)
      .parent()
      .find("[alt=play-circle]")
      .css("visibility", "hidden");
  }
  play(e) {
    $(e.target)
      .parent()
      .find("audio")[0]
      .play();
  }
  removeItem(index) {
    const action = {
      type: `Remove#${this.state.store}`,
      value: index
    };
    store.dispatch(action);
  }
  alertInfo() {
    alert("Test");
  }
  hashchange() {
    this.state.store = this.props.location.search.slice(1).split("=")[1];
    this.setState({ list: this.state.json[this.state.store] });
  }
  componentDidMount() {
    window.addEventListener("hashchange", this.hashchange);
  }
  componentWillUnmount() {
    this.clear();
    window.removeEventListener("hashchange", this.hashchange);
  }
  render() {
    return (
      <section id="table">
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
                      src={`http://localhost:9091/static/media/${item.from}.mp3`}
                      onError={e => this.notFind(e)}
                    ></audio>
                    <img
                      src="http://localhost:9091/static/png/play-circle.png"
                      alt="play-circle"
                      onClick={e => this.play(e)}
                    />
                    <img
                      src="http://localhost:9091/static/png/close-circle.png"
                      alt="close-circle"
                      onClick={() => this.removeItem(index)}
                    />
                    <img
                      src="http://localhost:9091/static/png/message.png"
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
