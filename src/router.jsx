import { Route, Switch, Redirect } from "react-router-dom";
import React, { Component } from "react";

import Main from "./components/Main.jsx";
import Table from "./components/Table.jsx";

const routes = [
  {
    path: "/",
    exact: true,
    redirect: "/main"
  },
  {
    path: "/main",
    component: Main
  },
  {
    path: "/table",
    component: Table
  }
];

class RouteView extends Component {
  constructor({ match, children }) {
    super();
    this.state = {
      routes: children || routes,
      url: match ? `${match.url}/` : ""
    };
  }
  render() {
    return (
      <Switch>
        {this.state.routes.map((item, key) => {
          function routeRender(props) {
            props.children = item.children || null;
            if (item.redirect) return <Redirect to={item.redirect} />;
            else return <item.component {...props} />;
          }
          return (
            <Route
              path={`${this.state.url}${item.path}`}
              key={key}
              exact={item.exact ? true : false}
              render={routeRender}
            />
          );
        })}
      </Switch>
    );
  }
}

export default RouteView;
