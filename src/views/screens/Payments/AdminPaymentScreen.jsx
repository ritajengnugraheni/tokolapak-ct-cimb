import React from "react"
import Axios from "axios"
import { API_URL } from "../../../constants/API"
import { Table } from "reactstrap"
import ButtonUI from "../../components/Button/Button"
import "./AdminPayment.css"
import { connect } from "react-redux";
import swal from "sweetalert"
import { Link } from "react-router-dom"


class AdminPaymentScreen extends React.Component {
    state = {
        transaksiList: [],
        activeTransaksi: [],
        transaksiDetail: []
    }

    componentDidMount() {
        // this.getTransaksiList()
        this.getAllDataTranasaksi()
    }

    getTransaksiList = () => {
        Axios.get(`${API_URL}/transactions`)
            .then((res) => {
                this.setState({ transaksiList: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    getListPending = () => {
        Axios.get(`${API_URL}/transactions`, {
            params: {
                _embed: "transactionDetails",
                status: "pending"
            }
        })
            .then((res) => {
                console.log(res);
                this.setState({
                    transaksiDetail: res.data
                })

            })
            .catch((err) => {
                console.log(err);

            })
    };
    getListDone = () => {
        Axios.get(`${API_URL}/transactions`, {
            params: {
                _embed: "transactionDetails",
                status: "done"
            }
        })
            .then((res) => {
                console.log(res);
                this.setState({
                    transaksiDetail: res.data
                })

            })
            .catch((err) => {
                console.log(err);

            })
    };

    // getAllDataTranasaksi = () => {
    //     Axios.get(`${API_URL}/transactionDetails`, {
    //         params: {
    //             _expand: "transaction"
    //         }
    //     })
    //         .then((res) => {
    //             console.log(res);
    //             this.setState({
    //                 transaksiDetail: res.data
    //             })

    //         })
    //         .catch((err) => {
    //             console.log(err);

    //         })
    // }

    getAllDataTranasaksi = () => {
        Axios.get(`${API_URL}/transactions`, {
            params: {
                _embed: "transactionDetails",
            }
        })
            .then((res) => {
                console.log(res);
                this.setState({
                    transaksiDetail: res.data
                })

            })
            .catch((err) => {
                console.log(err);

            })
    }

    // renderTransaksiDetail = () => {
    //     const { transaksiDetail } = this.state
    //     return transaksiDetail.map((val) => {
    //         return (
    //             <tr>
    //                 <td>{val.transaction.id}</td>
    //                 <td>{val.transaction.userId}</td>
    //                 <td>{val.productName}</td>
    //                 <td>{val.quantity}</td>
    //                 <td>{val.transaction.tgl_belanja}</td>
    //                 <td>{val.transaction.status}</td>
    //             </tr>
    //         )
    //     })
    // }

    deleteHandler = (id) => {
        Axios.delete(`${API_URL}/transactions/${id}`)
            .then((res) => {
                console.log(res);
                // this.getTransaksiList()
                this.getAllDataTranasaksi()
                swal("Delete", "", "success")
            })
            .catch((err) => {
                console.log(err);

            })
    }

    getKonfirmasi = (id) => {
        Axios.patch(`${API_URL}/transactions/${id}`, {

            status: "done",
            tgl_selesai: new Date().toLocaleString()


        })
            .then((res) => {
                console.log(res);
                swal("Success", "", "success")
                // this.getTransaksiList()
                this.getAllDataTranasaksi()
            })
            .catch((err) => {
                console.log(err);

            })
    };

    renderDataTransaction2 = () => {
        const { transaksiDetail } = this.state
        return transaksiDetail.map((val, idx) => {
            // const {id,userId, tgl_belanja, tgl_selesai, metode}
            return (
                <>
                    <tr onClick={() => {
                        if (this.state.activeTransaksi.includes(idx)) {
                            this.setState({
                                activeProducts: [
                                    ...this.state.activeTransaksi.filter((item) => item !== idx),
                                ],
                            });
                        } else {
                            this.setState({
                                activeTransaksi: [...this.state.activeTransaksi, idx],
                            });
                        }
                    }}>
                        <td>{idx + 1}</td>
                        <td>trs-tko-{val.id}</td>
                        <td>{val.userId}</td>
                        <td>{val.tgl_belanja}</td>
                        <td>{val.tgl_selesai}</td>
                        <td>{val.metodePembayaran}</td>
                    </tr>
                    <tr className={`collapse-item ${
                        this.state.activeTransaksi.includes(idx) ? "active" : null
                        }`}>
                        <td className="" colSpan={6}>
                            <div className="d-flex justify-content-around align-items-center">
                                <div className="d-flex flex-column ml-4 justify-content-center">
                                    <h5>{val.username}</h5>
                                    <h6>Total :
                                    <span style={{ fontWeight: "normal" }}>
                                            {" "}
                                            {new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(val.totalprice)}
                                        </span>

                                    </h6>
                                    <h6>Alamat Pengiriman :
                                    <span style={{ fontWeight: "normal" }}> {val.pengiriman}</span>
                                    </h6>
                                    <h6>Data Barang yang di beli</h6>
                                    <h6 className="mt-4">
                                        <Table>
                                            <thead className="text-center" style={{ width: "" }}>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Product Name</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-center">
                                                {
                                                    val.transactionDetails.map((value) => {
                                                        return (
                                                            <tr>
                                                                <td>{value.transactionId}</td>
                                                                <td>{value.productName}</td>
                                                                <td> <span style={{ fontWeight: "normal" }}>
                                                                    {" "}
                                                                    {new Intl.NumberFormat("id-ID", {
                                                                        style: "currency",
                                                                        currency: "IDR",
                                                                    }).format(value.totalPriceProduct)}
                                                                </span></td>
                                                            </tr>
                                                        )
                                                    })
                                                }

                                            </tbody>

                                        </Table>
                                    </h6>
                                    <h6>Status:
                                        {
                                            val.status == "pending" ? (<span style={{ fontWeight: "normal", color: "red" }}> {val.status}</span>) :
                                                (<span style={{ fontWeight: "normal", color: "green" }}> {val.status}</span>)
                                        }

                                    </h6>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <ButtonUI
                                        onClick={(_) => this.getKonfirmasi(val.id)}
                                    // type="contained"
                                    >
                                        Konfirmasi
                                    </ButtonUI>
                                    <ButtonUI className="mt-3" type="textual"
                                        onClick={() => this.deleteHandler(val.id)}
                                    >
                                        Delete
                                     </ButtonUI>

                                </div>
                            </div>
                        </td>

                    </tr>

                </>
            )

        })
    }
    // renderDataTransaction = () => {
    //     const { transaksiList } = this.state
    //     return transaksiList.map((val, idx) => {
    //         return (
    //             <>
    //                 <tr onClick={() => {
    //                     if (this.state.activeTransaksi.includes(idx)) {
    //                         this.setState({
    //                             activeProducts: [
    //                                 ...this.state.activeTransaksi.filter((item) => item !== idx),
    //                             ],
    //                         });
    //                     } else {
    //                         this.setState({
    //                             activeTransaksi: [...this.state.activeTransaksi, idx],
    //                         });
    //                     }
    //                 }}>
    //                     <td>{val.id}</td>
    //                     <td>{val.userId}</td>
    //                     <td>{val.tgl_belanja}</td>
    //                     <td>{val.tgl_selesai}</td>
    //                     <td>{val.metodePembayaran}</td>
    //                 </tr>
    //                 <tr className={`collapse-item ${
    //                     this.state.activeTransaksi.includes(idx) ? "active" : null
    //                     }`}>
    //                     <td className="" colSpan={2}>
    //                         <div className="d-flex justify-content-around align-items-center">
    //                             <div className="d-flex flex-column ml-4 justify-content-center">
    //                                 <h6>Total :
    //                                 <span style={{ fontWeight: "normal" }}>
    //                                         {" "}
    //                                         {new Intl.NumberFormat("id-ID", {
    //                                             style: "currency",
    //                                             currency: "IDR",
    //                                         }).format(val.totalprice)}
    //                                     </span>

    //                                 </h6>
    //                                 <h6>Alamat :
    //                                 <span style={{ fontWeight: "normal" }}> {val.pengiriman}</span>
    //                                 </h6>
    //                                 <h6>Status:
    //                                 <span style={{ fontWeight: "normal" }}> {val.status}</span>
    //                                 </h6>
    //                             </div>
    //                             <div className="d-flex flex-column align-items-center">
    //                                 <ButtonUI
    //                                     onClick={(_) => this.getKonfirmasi(val.id)}
    //                                 // type="contained"
    //                                 >
    //                                     Konfirmasi
    //                                 </ButtonUI>
    //                                 <ButtonUI className="mt-3" type="textual"
    //                                     onClick={() => this.deleteHandler(val.id)}
    //                                 >
    //                                     Delete
    //                                  </ButtonUI>

    //                             </div>
    //                         </div>
    //                     </td>

    //                 </tr>

    //             </>
    //         )

    //     })
    // }
    render() {
        return (
            <div className="container">
                <div className="dashboard">
                    <div className="d-flex mt-4 ">
                        <Link to="/admin/payment" style={{ color: "inherit" }} onClick={this.getListPending}>
                            <h6 className="mx-4 font-weight-bold">PENDING</h6>
                        </Link>
                        <Link to="/admin/payment" style={{ color: "inherit" }} onClick={this.getListDone}>
                            <h6 className="mx-4 font-weight-bold">DONE</h6>
                        </Link>
                        <Link to="/admin/payment" style={{ color: "inherit" }} onClick={this.getAllDataTranasaksi}>
                            <h6 className="mx-4 font-weight-bold">ALL</h6>
                        </Link>
                    </div>

                    <caption className="mt-4 ml-4">
                        <h4>Action</h4>
                    </caption>
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>ID Transaksi</th>
                                <th>User Id</th>
                                <th>Tanggal Pembelian</th>
                                <th>Tanggal Selesai</th>
                                <th>Metode Pembayaran</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderDataTransaction2()}
                        </tbody>

                    </table>
                    {/* <caption className="mt-4 ml-4">
                        <h4>Data</h4>
                    </caption>
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Transaksi ID</th>
                                <th>User ID</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Tanggal Selesai</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTransaksiDetail()}
                        </tbody>

                    </table> */}
                </div>
            </div>
        )
    }

}


export default AdminPaymentScreen