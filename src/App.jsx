import React from "react";
import { HashRouter as Router } from "react-router-dom";
// import { BrowserRouter as Router } from "react-router-dom";
import RouteView from "./router.jsx";
import Navbar from "./components/Navbar.jsx";
import Alert from "./components/Alert.jsx";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navbar></Navbar>
        <RouteView></RouteView>
        <Alert></Alert>
      </Router>
    );
  }
}

export default App;
