import React from "react";
import { Switch, Route } from "react-router-dom";
import listCompany from "./content/company/listCompany";
import listUser from "./content/user/listUser";
import listMenu from "./content/menu/listMenu";
import { Redirect } from "react-router";
import apiconfig from "../config/api.config.json";

const DashboardSwitcher = () => {
  return (
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt3 px-4">
      <Switch>
        <PrivateRoute path="/company" component={listCompany} />
        <PrivateRoute path="/user" component={listUser} />
        <PrivateRoute path="/menu" component={listMenu} />
      </Switch>
    </main>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem(apiconfig.LS.TOKEN) != null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default DashboardSwitcher;
