import React from "react";
import { connect, shallowEqual } from "react-redux";
import "./Cart.css";
import swal from "sweetalert";

import { Table, Alert } from "reactstrap"


import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { NotificationHandler } from "../../../redux/actions"

class Cart extends React.Component {
  state = {
    listProductCart: [],
    kondidiCheckout: false,
    subTotalFix: 0,
    // itemTransaksi: [],
    userId: 0,
    status: "pending",
    checkoutItems: [],
    tgl_selesai: "",
    tgl_belanja: "",
    pengiriman: "",
    metodePembayaran: "Credit",
    quantity: 0,

  }



  componentDidMount() {
    this.getDataCart()

  }

  getDataCart = () => {
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "product",
      },
    })
      .then((res) => {

        this.setState({
          listProductCart: res.data,
        })
        console.log(res.data);


      })
      .catch((err) => {
        console.log(err);
      });
  }
  deletedata = (id) => {
    // const{listProductCart}=this.state
    Axios.delete(`${API_URL}/carts/${id}`)
      .then((res) => {
        console.log(res);
        swal("Delete to cart", "", "success")
        this.getDataCart()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  checkoutHandler = (e, idx) => {
    const { checked } = e.target;

    if (checked) {
      this.setState({ checkoutItems: [...this.state.checkoutItems, idx] })
    } else {
      this.setState({
        checkoutItems: [
          ...this.state.checkoutItems.filter((val) => val !== idx)
        ]
      })
    }
  }

  renderCartData = () => {
    const { listProductCart } = this.state;
    return listProductCart.map((val, idx) => {
      return (
        <tr>
          <td> {idx + 1} </td>
          <td><img className=" justify-content-center text-center" style={{ width: "30%", height: "30%" }} src={val.product.image} alt="" /></td>
          <td> {val.product.productName} </td>
          <td>{new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(val.product.price)}</td>
          <td> {val.quantity} </td>
          <td><ButtonUI className="btn-delete" onClick={() => this.deletedata(val.id)}>Delete</ButtonUI></td>
          <td>
            <input type="checkbox"
              onChange={(e) => this.checkoutHandler(e, idx)}
              className="form-control"
            />
          </td>
        </tr>

      );
    });
  };

  render() {
    return (
      <div className="container py-4">
        {
          this.state.listProductCart.length > 0 ? (
            <>
              <Table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Image</th>
                    <th>Nama Produk</th>
                    <th>Harga</th>
                    <th>Quantity</th>
                    <th colSpan={2}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderCartData()}
                </tbody>
              </Table>
              <center>
                <Link to="/checkout">
                  <ButtonUI type="contained">
                    Checkout
                </ButtonUI>
                </Link>
              </center>
            </>
          ) : (
              <Alert className="alert-danger">Kosong silahkan berbelanja klik link {" "}
                <Link to="/">Go shopping</Link>
              </Alert>
            )
        }
      </div>

    );
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  NotificationHandler,
}
export default connect(mapStateToProps)(Cart);