import React from "react";
import { connect } from "react-redux";
import swal from "sweetalert";

import "./ProductDetails.css";
import ButtonUI from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import Axios from "axios";
import { API_URL } from "../../../constants/API";

import { NotificationHandler } from "../../../redux/actions"

class ProductDetails extends React.Component {
  state = {
    productData: {
      image: "",
      productName: "",
      price: 0,
      desc: "",
      category: "",
      id: 0,
    },

  };

  addToWishListHandler = () => {
    // POST method ke /cart
    // Isinya: userId, productId, quantity
    // console.log(this.props.user.id);
    // console.log(this.state.productData.id);
    Axios.get(`${API_URL}/wishlists`, {
      params: {
        userId: this.props.user.id,
        productId: this.state.productData.id,
      }
    })
      .then((res) => {
        if (res.data.length == 0) {
          Axios.post(`${API_URL}/wishlists`, {
            userId: this.props.user.id,
            productId: this.state.productData.id
          })
            .then((res) => {
              console.log(res);
              swal("Add to wishlist", "", "success");
            })
            .catch((err) => {
              console.log(err);

            })

        } else {
          return swal("sorry!", "This product all ready in your wishlist", "warning");
        }
        console.log(res);

      })
      .catch((err) => {
        console.log(err);
      })
  }
  addToCartHandler = () => {
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        productId: this.state.productData.id
      }
    })
      .then((res) => {
        if (res.data.length == 0) {
          Axios.post(`${API_URL}/carts`, {
            userId: this.props.user.id,
            productId: this.state.productData.id,
            quantity: 1,
          })
            .then((res) => {
              console.log(res);
              // const { qty } = this.props.user
              // this.props.NotificationHandler(res.data.id, qty + 1)
              swal("", "Your item has been add to your cart", "success")
            })
            .catch((err) => {
              console.log(err);
            })

        } else {
          Axios.patch(`${API_URL}/carts/${res.data[0].id}`, {
            quantity: res.data[0].quantity + 1,
          })
            .then((res) => {
              // const { qty } = this.props.user
              // this.props.NotificationHandler(res.data.id, qty + 1)
              console.log(res);
              swal("", "Your item has been add to your cart", "success")
            })
            .catch((err) => {
              console.log(err);
            })
        }
      })
      .catch((err) => {
        console.log(err);
        swal('gagal', "", "error")

      })
    // this.props.NotificationHandler(this.props.user.id)

  }

  componentDidMount() {
    Axios.get(`${API_URL}/products/${this.props.match.params.productId}`)
      .then((res) => {
        this.setState({ productData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      productName,
      image,
      price,
      desc,
      category,
      id,
    } = this.state.productData;
    return (
      <div className="container">
        <div className="row py-4">
          <div className="col-6 text-center">
            <img
              style={{ width: "100%", objectFit: "contain", height: "550px" }}
              src={image}
              alt=""
            />
          </div>
          <div className="col-6 d-flex flex-column justify-content-center">
            <h3>{productName}</h3>
            <h4>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(price)}
            </h4>
            <p className="mt-4">{desc}</p>
            {/* <TextField type="number" placeholder="Quantity" className="mt-3" /> */}
            <div className="d-flex flex-row mt-4">
              <ButtonUI onClick={this.addToCartHandler}>Add To Cart</ButtonUI>
              <ButtonUI className="ml-4" type="outlined" onClick={this.addToWishListHandler}>
                Add To Wishlist
              </ButtonUI>
            </div>
          </div>
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
const mapDispatchToProps = {
  NotificationHandler,
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
