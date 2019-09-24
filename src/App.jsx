import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";
// import { BrowserRouter as Router, Link } from "react-router-dom";
import RouteView from "./router.jsx";
import Navbar from "./components/Navbar.jsx";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navbar></Navbar>
        <RouteView></RouteView>
      </Router>
    );
  }
}

export default App;
