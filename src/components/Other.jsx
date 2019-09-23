import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";
// import { BrowserRouter as Router, Link } from "react-router-dom";
import RouteView from "../router.jsx";

class Other extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section>
        <p>I'm other~</p>
        <Router>
          <Link to="/other/child">child</Link>
          <Link to="/other/null">null</Link>
          <RouteView {...this.props} />
        </Router>
      </section>
    );
  }
}

export default Other;
