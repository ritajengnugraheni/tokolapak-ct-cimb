import React from "react"
import Axios from "axios"
import { API_URL } from "../../../constants/API"
import { connect, shallowEqual } from "react-redux";
import { Table } from "reactstrap";
import ButtonUI from "../../components/Button/Button";
import swal from "sweetalert";
import { Link } from "react-router-dom";

class WishList extends React.Component {
    state = {
        listWishList: []
    }

    componentDidMount() {
        this.getWishList()
    }
    getWishList = () => {
        Axios.get(`${API_URL}/wishlists`, {
            params: {
                userId: this.props.user.id,
                _expand: "product"
            }
        })
            .then((res) => {
                console.log(res);
                this.setState({
                    listWishList: res.data
                })

            })
            .catch((err) => {
                console.log(err);

            })
    }
    deleteFromWishlist = (id) => {
        // const{listProductCart}=this.state
        Axios.delete(`${API_URL}/wishlists/${id}`)
            .then((res) => {
                console.log(res);
                swal("Delete", "Delete from wishlist", "success")
                this.getWishList()
            })
            .catch((err) => {
                console.log(err);
            });
    }
    renderWishList = () => {
        const { listWishList } = this.state
        return listWishList.map((val, idx) => {
            return (
                <tr className="text-center">
                    <td>{idx + 1}</td>
                    <td><img className=" justify-content-center text-center" style={{ width: "30%", height: "30%" }} src={val.product.image} alt="" /></td>
                    <td>{val.product.productName}</td>
                    <td>{val.product.category}</td>
                    <td className="d-flex  align-items-center">
                        <ButtonUI style={{ backgroundColor: "red", border: "none" }} onClick={() => { this.deleteFromWishlist(val.id) }}>Delete</ButtonUI>
                        <Link to={`/product/${val.product.id}`}>
                            <ButtonUI style={{ marginLeft: "10px" }}>Detail</ButtonUI>
                        </Link>
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div className="container">
                <caption className="mt-3">
                    <h4>Wishlist</h4>
                </caption>
                <h5>Hai {' '} {this.props.user.fullName}</h5>
                <p>Segera lihat detail barang impianmu jangan sampai kehabisan!! sungkuy!!</p>
                <Table className="mt-5">
                    <thead>
                        <tr className="text-center">
                            <th>No</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th colSpan={8}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderWishList()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(WishList)