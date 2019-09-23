import { Route, Switch, Redirect } from "react-router-dom";
import React, { Component } from "react";

import Home from "./components/Home.jsx";
import Other from "./components/Other.jsx";
import Child from "./components/Child.jsx";

const routes = [
  {
    path: "/",
    exact: true,
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/other",
    component: Other,
    children: [
      {
        path: "child",
        component: Child
      }
    ]
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
