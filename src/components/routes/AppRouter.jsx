import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ProtectedPage from "./ProtectedPage";
import NotFound from "./NotFound";
import paths from "../../constants/paths";
import Logout from "../logout/Logout";
import Review from "../admin/review/Review";
import Partner from "../admin/partner/Partner";
import LoginAdmin from "../admin/login/LoginAdmin";

const AppRouter = ({ children }) => {
  return (
    <Router basename={"/onboardingAdmin"}>
      {/* <Router> */}
      {children}
      <Switch>
        <Route exact path={paths.LOGIN_IN} component={LoginAdmin}></Route>
        <Route extact path={paths.INVALID} component={ProtectedPage}></Route>
        <PrivateRoute
          exact
          path={paths.LOGOUT}
          component={Logout}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path={paths.ADMIN_PARTNER}
          component={Partner}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path={paths.ADMIN_REVIEW}
          component={Review}
        ></PrivateRoute>
        <PrivateRoute path="/admin/*" component={Partner}></PrivateRoute>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
