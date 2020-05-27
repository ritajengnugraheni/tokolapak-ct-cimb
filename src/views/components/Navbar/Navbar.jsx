import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logoutHandler, SearchAndFilterHandler } from "../../../redux/actions/user"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import { faUser } from "@fortawesome/free-regular-svg-icons";

import "./Navbar.css";
import ButtonUI from "../Button/Button";
import Axios from "axios";
import { API_URL } from "../../../constants/API";


const CircleBg = ({ children }) => {
  return <div className="circle-bg">{children}</div>;
};

class Navbar extends React.Component {
  state = {
    searchBarIsFocused: false,
    searcBarInput: "",
    dropdownOpen: false,
    notifikasi: 0,
    user: [],
    barang: [],
    tampil: 0,
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

  logoutBtnHandler = () => {
    this.props.onLogout();
    // this.forceUpdate();
  };

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  componentDidMount() {
    let notif = 0
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
      }
    })
      .then((res) => {
        res.data.map((val) => {
          notif += val.quantity
        })
        console.log(res);
        this.setState({
          notifikasi: notif,
          tampil: res.data.length
        })
      })
      .catch((err) => {
        console.log(err);

      })
    this.getBarangUnik()
  }

  getBarangUnik = () => {
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "product"
      }
    })
      .then((res) => {
        console.log(res);
        this.setState({
          barang: res.data
        })

      })
      .catch((err) => {
        console.log(err);

      })
  }
  renderBarangUnik = () => {
    const { barang } = this.state
    return barang.map((val) => {
      return (
        <div className="d-flex mt-2">
          <p>{val.product.productName}</p>
        </div>
      )
    })
  }


  render() {
    return (
      <div>
        <div className="d-flex flex-row justify-content-between align-items-center py-4 navbar-container">
          <div className="logo-text">
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
              LOGO
          </Link>
          </div>
          <div
            style={{ flex: 1 }}
            className="px-5 d-flex flex-row justify-content-start"
          >
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
                <>
                  <Dropdown
                    toggle={this.toggleDropdown}
                    isOpen={this.state.dropdownOpen}
                  >

                    <DropdownToggle tag="div" className="d-flex">
                      <FontAwesomeIcon icon={faUser} style={{ fontSize: 24 }} />
                      <p className="small ml-3 mr-4">{this.props.user.username}</p>
                    </DropdownToggle>
                    {
                      (this.props.user.role === "admin") ? (
                        <DropdownMenu className="mt-2">
                          <DropdownItem>
                            <Link
                              style={{ color: "inherit", textDecoration: "none" }}
                              to="/admin/dashboard"
                            >
                              Dashboard
                      </Link>
                          </DropdownItem>
                          <DropdownItem>
                            <Link
                              style={{ color: "inherit", textDecoration: "none" }}
                              to="/admin/member"
                            >
                              Members
                      </Link>
                          </DropdownItem>
                          <DropdownItem>
                            <Link
                              style={{ color: "inherit", textDecoration: "none" }}
                              to="/admin/payment"
                            >
                              Payments
                      </Link>
                          </DropdownItem>
                          <DropdownItem>
                            <Link
                              style={{ color: "inherit", textDecoration: "none" }}
                              to="/admin/report"
                            >
                              Report
                      </Link>
                          </DropdownItem>
                        </DropdownMenu>
                      ) : (
                          <DropdownMenu className="mt-2">
                            <DropdownItem>
                              <Link
                                style={{ color: "inherit", textDecoration: "none" }}
                                to="/history"
                              >
                                History
                      </Link>
                            </DropdownItem>
                            <DropdownItem>
                              <Link
                                style={{ color: "inherit", textDecoration: "none" }}
                                to="/wishlist"
                              >
                                Wishlist
                      </Link>
                            </DropdownItem>
                            {/* <DropdownItem>Payments</DropdownItem> */}
                          </DropdownMenu>
                        )
                    }

                  </Dropdown>
                  <Link
                    className="d-flex flex-row"
                    to="/cart"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={faShoppingCart}
                      style={{ fontSize: 24 }}
                    />
                    <CircleBg>
                      <small style={{ color: "#3C64B1", fontWeight: "bold" }}>
                        {this.state.notifikasi}
                        {/* {this.props.user.qty} */}
                      </small>
                    </CircleBg>
                  </Link>
                  <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <ButtonUI onClick={this.props.logoutHandler} className="ml-4">
                      Logout</ButtonUI>
                  </Link>

                </>

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
        <div className="d-flex justify-content-center flex-row align-items-center my-1">

          {/* {this.renderBarangUnik()} {""} */}
          {this.state.tampil}

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
