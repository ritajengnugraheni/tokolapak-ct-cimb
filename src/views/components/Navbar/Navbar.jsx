import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logoutHandler, SearchAndFilterHandler } from "../../../redux/actions/user"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/";

import { faUser } from "@fortawesome/free-regular-svg-icons";

import "./Navbar.css";
import ButtonUI from "../Button/Button.tsx";

const CircleBg = ({ children }) => {
  return <div className="circle-bg">{children}</div>;
};

class Navbar extends React.Component {
  state = {
    searchBarIsFocused: false,
    searcBarInput: "",
  };

  inputHandler = (e, field) => {
    this.setState({ [field]: e.target.value })
  }


  onFocus = () => {
    this.setState({ searchBarIsFocused: true });
  };

  onBlur = () => {
    this.setState({ searchBarIsFocused: false });
  };

  render() {
    return (
      <div className="d-flex flex-row justify-content-between align-items-center py-4 navbar-container">
        <div className="logo-text">
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            LOGO
          </Link>
        </div>
        <div style={{ flex: 1 }} className="px-5">
          <input
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            className={`search-bar ${
              this.state.searchBarIsFocused ? "active" : null
              }`}
            type="text"
            placeholder="Cari produk impianmu disini"
            onChange={(e) => this.props.SearchAndFilterHandler(e.target.value)}
          />
        </div>
        <div className="d-flex flex-row align-items-center">
          {this.props.user.id ? (
            <>
              <FontAwesomeIcon icon={faUser} style={{ fontSize: 24 }} />
              <p className="small ml-3 mr-4">{this.props.user.username}</p>
              <Link className="d-flex flex-row" to="/cart" style={{ textDecoration: "none", color: "inherit" }} >
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faShoppingCart}
                  style={{ fontSize: 24 }}
                />
                <CircleBg>
                  <small style={{ color: "#3C64B1", fontWeight: "bold" }}>
                    4
                </small>
                </CircleBg>
              </Link>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <ButtonUI onClick={this.props.logoutHandler} className="ml-4">
                  Logout</ButtonUI>
              </Link>

            </>
          ) : (
              <>
                <ButtonUI className="mr-3" type="textual">
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to="/auth"
                  >
                    Sign in
                </Link>
                </ButtonUI>
                <ButtonUI type="contained">
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to="/auth"
                  >
                    Sign up
                </Link>
                </ButtonUI>
              </>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatcToProps = {
  logoutHandler,
  SearchAndFilterHandler

}

export default connect(mapStateToProps, mapDispatcToProps)(Navbar);
