import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "@/utils/history";
import { Result, Todo } from "@/router";

const Loadable = (Component: any): any => (props: any): React.ReactElement => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </React.Suspense>
);

const App = (): React.ReactElement => {
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
