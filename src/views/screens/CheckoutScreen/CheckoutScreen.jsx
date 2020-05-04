import React from "react";
import { connect, shallowEqual } from "react-redux";
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
        subTotalFix: 0,
        // itemTransaksi: [],
        userId: 0,
        status: "pending",
        tgl_selesai: "",
        tgl_belanja: "",
        pengiriman: "",
        metodePembayaran: "Credit",
        quantity: 0,
        productName: "",

    }

    getDate = () => {
        let arrbulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
        let tanggal = new Date().getDate()
        let bulan = new Date().getMonth()
        let tahun = new Date().getFullYear()

        let hasil = tanggal + "-" + arrbulan[bulan] + "-" + tahun
        this.setState({
            tgl_belanja: hasil
        })

    }

    componentDidMount() {
        // this.getDataCart()
        this.getDataCart2()
        this.getDate()
    }

    inputHandler = (e, field) => {
        this.setState({ [field]: e.target.value })
    }

    // getDataCart = () => {
    //     Axios.get(`${API_URL}/carts`, {
    //         params: {
    //             userId: this.props.user.id,
    //             _expand: "product",
    //         },
    //     })
    //         .then((res) => {

    //             this.setState({
    //                 listProductCart: res.data,
    //             })
    //             console.log(res.data);


    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    getDataCart2 = () => {
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
                    // this.setState({
                    //     productId: val.product.id,
                    //     price: val.product.price,
                    //     quantity: val.quantity,
                    //     totalPriceProduct: val.quantity * val.product.price,
                    //     productName: val.product.productName
                    // })

                })
                console.log(res.data);
                Axios.post(`${API_URL}/transactions`, {
                    userId: this.props.user.id,
                    totalprice: this.state.subTotalFix,
                    status: this.state.status,
                    tgl_selesai: this.state.tgl_selesai,
                    tgl_belanja: this.state.tgl_belanja,
                    pengiriman: this.props.user.address,
                    metodePembayaran: this.state.metodePembayaran,
                })
                    .then((res) => {
                        this.state.listProductCart.map((val) => {
                            Axios.post(`${API_URL}/transactionDetails`, {
                                transactionId: res.data.id,
                                productId: val.productId,
                                price: val.product.price,
                                quantity: val.quantity,
                                totalPriceProduct: val.product.price * val.quantity,
                                productName: val.product.productName,
                            })
                                .then((res) => {
                                    console.log(res);

                                })
                                .catch((err) => {
                                    console.log(err);

                                })
                        })

                        console.log(res);
                        swal("Sukses", "Please check your history transaction", "success")

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
                this.getDataCart2()
            })
            .catch((err) => {
                console.log(err);
            });
    }

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
                <caption>
                    <h3>Checkout</h3>
                </caption>
                {
                    this.state.listProductCart.length > 0 ? (
                        <div className="py-4">
                            <h4>Hai {' '} {this.props.user.fullName}</h4>
                            <p>Segera buat pesanan mu kami akan segera memprosesnya dan dapatkan</p>
                            <p>barang impianmu &#128512; </p>
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
                            <div className="mt-6">
                                <h5 style={{ color: "red" }}>{`Status : ${this.state.status}`}</h5>
                                <p>Silahkan cek data diri anda dan segera lakukan konfirmasi</p>
                                <p>{`Alamat  : ${this.props.user.address}`}</p>
                                <p>{`Email   : ${this.props.user.email}`}</p>
                                <p>{`Tanggal : ${this.state.tgl_belanja}`}</p>
                                <h6>Metode Pembayaran :</h6>

                                <select
                                    value={this.state.metodePembayaran}
                                    onChange={(e) => this.inputHandler(e, "metodePembayaran")}
                                >
                                    <option value="Credit">Credit</option>
                                    <option value="Debit">Debit</option>
                                    <option value="Transfer">Transfer Bank</option>

                                </select>

                            </div>
                            <center>
                                <h6 className="d-flex flex-row totalFix">Total price : {this.totalprice()} </h6>
                                <ButtonUI onClick={() => this.postTransactionHandler()}>Buat Pesanan</ButtonUI>
                            </center>
                        </div>


                    ) : (
                            <Alert className="alert-info">Pesanan Anda sedang kami proses silahkan lihat history {' '}
                                <Link to="/">History</Link>
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