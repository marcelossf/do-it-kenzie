// @ts-nocheck
import Dashboard from "pages/Dashboard/index.jsx";
import Login from "pages/Login/index.jsx";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home/index.jsx";
import SignUp from "../pages/SignUp/index.jsx";

function Routes() {
  const [authenticated, setAuthenticaded] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@Doit:token"));

    if (token) {
      return setAuthenticaded(true);
    }
  }, [authenticated]);

  return (
    <Switch>
      <Route exact path="/">
        <Home authenticated={authenticated} />
      </Route>
      <Route path="/signup">
        <SignUp authenticated={authenticated} />
      </Route>
      <Route path="/login">
        <Login
          authenticated={authenticated}
          setAuthenticaded={setAuthenticaded}
        />
      </Route>
      <Route path="/dashboard">
        <Dashboard authenticated={authenticated} />
      </Route>
    </Switch>
  );
}

export default Routes;
