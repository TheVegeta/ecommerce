import React, { Suspense, lazy, useContext } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Loader from "./component/Loader";
import { AppContext } from "./context/app.context";
import Redireact from "./component/Redirect";
const Home = lazy(() => import("./component/Home"));
const Details = lazy(() => import("./component/Details/Details"));
const Cart = lazy(() => import("./component/Cart"));
const Login = lazy(() => import("./component/auth/Login"));
const Register = lazy(() => import("./component/auth/Register"));
const Payments = lazy(() => import("./component/Payments"));
const AddProduct = lazy(() => import("./component/admin/AddProduct"));
const ManageProducts = lazy(() => import("./component/admin/ManageProduct"));
const EditProduct = lazy(() => import("./component/admin/EditProduct"));
const ManagePayments = lazy(() => import("./component/admin/Payments"));

const Routes = () => {
  const { isAdmin, isLogin } = useContext(AppContext);

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={Details} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/register" component={Register} />
        <Route
          exact
          path="/checkouts"
          component={isLogin ? Payments : Redireact}
        />
        <Route
          exact
          path="/admin/addproduct"
          component={isAdmin ? AddProduct : Redireact}
        />
        <Route
          exact
          path="/admin/products"
          component={isAdmin ? ManageProducts : Redireact}
        />
        <Route
          exact
          path="/admin/products/:id"
          component={isAdmin ? EditProduct : Redireact}
        />
        <Route
          exact
          path="/admin/payments"
          component={isAdmin ? ManagePayments : Redireact}
        />
        <Route exact component={Home} />{" "}
      </Switch>
    </Suspense>
  );
};

export default withRouter(Routes);
