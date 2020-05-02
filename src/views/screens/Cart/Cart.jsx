import React from "react";
import { connect, shallowEqual } from "react-redux";
import "./Cart.css";
import swal from "sweetalert";

import { Table, Alert } from "reactstrap"


import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import { Link } from "react-router-dom";

class Cart extends React.Component {
  state = {
    listProductCart: [],
    kondidiCheckout: false,
    subTotalFix: 0,
    itemTransaksi: [],
    userId: 0,
    status: "pending"
  }

  componentDidMount() {
    this.getDataCart()
  }

  getDataCart = () => {
    let subTotal = 0
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "product",
      },
    })
      .then((res) => {
        res.data.map((val) => {
          subTotal += val.quantity * val.product.price

        })
        this.setState({
          listProductCart: res.data,
          subTotalFix: subTotal,
          items: res.data[0].product,
        })
        console.log(res.data);


      })
      .catch((err) => {
        console.log(err);
      });
  }



  postTransactionHandler = () => {
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "product",
      },
    })
      .then((res) => {
        res.data.map(val => {
          { this.deletedata(val.id) }
          this.setState({
            itemTransaksi: [...this.state.itemTransaksi, val.product],
          })
        })
        console.log(res.data);
        Axios.post(`${API_URL}/transactions`, {
          userId: this.props.user.id,
          totalprice: this.state.subTotalFix,
          status: this.state.status,
          items: this.state.itemTransaksi
        })
          .then((res) => {
            this.setState({ listProductCart: "" })
            console.log(res);
            swal("Sukses", "Terima kasih telah melakukan konfirmasi", "success")

          })
          .catch((err) => {
            console.log(err);

          })

      })
      .catch((err) => {
        console.log(err);

      })
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

  renderCartData = () => {
    const { listProductCart } = this.state;
    return listProductCart.map((val, idx) => {
      return (
        <tr>
          <td> {idx + 1} </td>
          <td><img className=" justify-content-center text-center" style={{ width: "20%", height: "50%" }} src={val.product.image} alt="" /></td>
          <td> {val.product.productName} </td>
          <td>{new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(val.product.price)}</td>
          <td> {val.quantity} </td>
          <td><ButtonUI className="btn-delete" onClick={() => this.deletedata(val.id)}>Delete</ButtonUI></td>
        </tr>

      );
    });
  };

  totalprice = () => {
    const { subTotalFix } = this.state;
    return (
      <>
        <h6 style={{ color: "black" }}> {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(subTotalFix)}</h6>
      </>
    )


  }

  dataCheckout = () => {
    this.setState({
      kondidiCheckout: true
    })
  }

  renderCheckoutData = () => {
    const { listProductCart } = this.state;
    return listProductCart.map((val, idx) => {
      return (
        <>
          <tr>
            <td> {idx + 1} </td>
            <td><img className="text-center" style={{ width: "20%", objectFit: "contain" }} src={val.product.image} alt="" /></td>
            <td> {val.product.productName} </td>
            <td>  {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(val.product.price)}</td>
            <td> {val.quantity} </td>
            <td> {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(val.quantity * val.product.price)}</td>
          </tr>
        </>
      );
    });
  }
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderCartData()}
                </tbody>
              </Table>
              <center>
                <ButtonUI onClick={() => this.dataCheckout()} type="contained">
                  Checkout
                </ButtonUI>
              </center>
              {
                this.state.kondidiCheckout ? (
                  <div className="py-4">
                    <Table>
                      <thead>
                        <th>No</th>
                        <th>Image</th>
                        <th>Nama Produk</th>
                        <th>Harga</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </thead>
                      <tbody>
                        {this.renderCheckoutData()}
                      </tbody>
                    </Table>
                    <div>
                      <h5 style={{ color: "red" }}>{`Status : ${this.state.status}`}</h5>
                      <p>Silahkan cek data diri anda dan segera lakukan konfirmasi</p>
                      <p>{`Alamat  : ${this.props.user.address}`}</p>
                      <p>{`Email   : ${this.props.user.email}`}</p>
                    </div>
                    <center>
                      <h6 className="d-flex flex-row totalFix">Total price : {this.totalprice()} </h6>
                      <ButtonUI onClick={() => this.postTransactionHandler()}>Konfirmasi</ButtonUI>
                    </center>
                  </div>
                ) : null
              }

            </>
          ) : (
              <Alert className="alert-danger">Kosong silahkan berbelanja klik link
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

export default connect(mapStateToProps)(Cart);
