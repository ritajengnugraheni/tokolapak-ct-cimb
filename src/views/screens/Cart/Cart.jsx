import React from "react";
import { connect, shallowEqual } from "react-redux";
import "./Cart.css";
import swal from "sweetalert";

import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";

class Cart extends React.Component {
  state = {
    listProductCart: []

  }



  componentDidMount() {


  this.getDataCart()

    // Axios.get(`${API_URL}/products/1`, {
    //   params: {
    //     _embed: "carts",
    //   },
    // })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
   getDataCart = ()=> {
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "product",
      },
    })
      .then((res) => {
        console.log(res.data);
        this.setState({ listProductCart: res.data })
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
    

   
    // alert("masuk")
    // const { listProductCart } = this.state;
    // if (listProductCart.length > 0) {
    //   let data = listProductCart.findIndex(val => val.id == listProductCart)
    //   listProductCart.slice(data, 1)
    // }
    // this.renderCartData()
  }
  renderCartData = () => {
    const { listProductCart } = this.state;
    return listProductCart.map((val, idx) => {
      return (
        <tr>
          <td> {idx + 1} </td>
          <td style={{ width: "20%", height: "120px" }}><img className="justify-content-center" style={{ width: "20%", objectFit: "contain" }} src={val.product.image} alt="" /></td>
          <td> {val.product.productName} </td>
          <td>{val.product.price}</td>
          <td> {val.quantity} </td>
          <td><ButtonUI onClick={()=>this.deletedata(val.id)}>Delete</ButtonUI></td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div className="container">
        <table>
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

        </table>

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
