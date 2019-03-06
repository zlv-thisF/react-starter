import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "@/utils/history";
import { Todo, Result } from "@/router";

const Loadable = Component => props => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </React.Suspense>
);

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Loadable(Todo)} />
        <Route path="/result" exact component={Loadable(Result)} />
      </Switch>
    </Router>
  );
};

export default App;
