import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "@/utils/history";
import { Goods, Users, Dashboard } from "@/router";

const Loadable = (Component: any) => (props: any) => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </React.Suspense>
);

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Loadable(Dashboard)} />
        <Route path="/users" exact component={Loadable(Users)} />
        <Route path="/goods" exact component={Loadable(Goods)} />
      </Switch>
    </Router>
  );
};

export default App;
