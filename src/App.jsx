import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Cookie from "universal-cookie";
import { connect } from "react-redux";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./views/screens/Home/Home";
import Navbar from "./views/components/Navbar/Navbar";
import AuthScreen from "./views/screens/Auth/AuthScreen";
import ProductDetails from "./views/screens/ProductDetails/ProductDetails";
import Cart from "./views/screens/Cart/Cart";
import AdminDashboard from "./views/screens/Admin/AdminDashboard";
import { userKeepLogin, cookieChecker } from "../src/redux/actions/user"
import MemberScreen from "./views/screens/Members/MemberScreen";
import CheckoutScreen from "./views/screens/CheckoutScreen/CheckoutScreen";
import HistoryScreen from "./views/screens/History/HistoryScreen";
import AdminPaymentScreen from "./views/screens/Payments/AdminPaymentScreen";
import WishList from "./views/screens/WishList/WishList";
import NotFound from "./views/screens/NotFound/NotFound";
import PageReport from "./views/screens/Admin/PageReport";



const cookieObj = new Cookie();

class App extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      let cookieResult = cookieObj.get("authData", { path: "/" });
      if (cookieResult) {
        this.props.keepLogin(cookieResult);
      } else {
        this.props.cookieChecker();
      }
    }, 2000);
  }

  renderAdminRoutes = () => {
    if (this.props.user.role === "admin") {
      return (
        <Switch>
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <Route exact path="/admin/member" component={MemberScreen} />
          <Route exact path="/admin/payment" component={AdminPaymentScreen} />
          <Route exact path="/admin/report" component={PageReport} />

        </Switch>
      )
    }
  }

  render() {
    if (this.props.user.cookieChecked) {
      return (
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth" component={AuthScreen} />
            <Route exact path="/checkout" component={CheckoutScreen} />
            <Route exact path="/history" component={HistoryScreen} />
            <Route exact path="/wishlist" component={WishList} />


            <Route
              exact
              path="/product/:productId"
              component={ProductDetails}
            />
            <Route exact path="/cart" component={Cart} />

            {this.renderAdminRoutes()}
            <Route exact path="/*" component={NotFound} />
          </Switch>
          <div style={{ height: "120px" }} />
        </>
      );
    } else {
      return <div>Loading ...</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  keepLogin: userKeepLogin,
  cookieChecker,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

/**
 * PR
 * 1. Add to cart, jika barang double, qty yg akan bertambah
 * 2. Di Home, ketika click PHONE/LAPTOP/TAB/DESKTOP
 * 3. Di navbar, ketika ketik, secara otomatis filter products
 * 4. Di cart, buat button checkout, serta dengan proses checkout
 * 5. Ketika confirm checkout, lakukan POST request ke db.json ke transaction
 *    -> lalu cart harus kosong
 */
