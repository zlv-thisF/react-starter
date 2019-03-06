import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "@/utils/history";
import { Goods, Users, Dashboard } from "@/router";

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/users" exact component={Users} />
        <Route path="/goods" exact component={Goods} />
      </Switch>
    </Router>
  );
};

export default App;
