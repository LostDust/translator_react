import React, { Component } from "react";
import Translate from "./Translate.jsx";
import Menu from "./Menu.jsx";

class Main extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <section className="main" style={{ marginTop: "30px" }}>
        <Translate></Translate>
        <Menu></Menu>
      </section>
    );
  }
}

export default Main;
