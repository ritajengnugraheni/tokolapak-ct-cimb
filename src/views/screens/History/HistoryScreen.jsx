import React from "react";
import { Table } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { connect, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import "./History.css"
import ButtonUI from "../../components/Button/Button";

class HistoryScreen extends React.Component {
    state = {
        listTransaksi: [],
        listDetail: [],
        status: "",
        transactionId: "",
        detail: false
    }

    componentDidMount() {
        this.getDataTransaksi2()
    }


    lihatDetail = () => {
        this.setState({
            detail: true
        })
    }
    // getDetailTransaksi = () => {
    //     Axios.get(`${API_URL}/transactionDetails`, {
    //         params: {
    //             userId: this.props.user.id
    //         }
    //     })
    //         .then((res) => {
    //             console.log(res);
    //             this.setState({
    //                 listDetail: res.data
    //             })
    //         })
    //         .catch((err) => {
    //             console.log(err);

    //         })

    // }
    // getDataTransaksi = () => {
    //     Axios.get(`${API_URL}/transactionDetails`, {
    //         params: {
    //             userId: this.props.user.id,
    //             _expand: "transaction",
    //         },
    //     })
    //         .then((res) => {
    //             res.data.map((val) => {
    //                 this.setState({
    //                     status: val.transaction.status,
    //                 })
    //             })

    //             this.setState({
    //                 listTransaksi: res.data,
    //             })
    //             console.log(res.data);


    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }
    getDataTransaksi2 = () => {
        Axios.get(`${API_URL}/transactions`, {
            params: {
                userId: this.props.user.id,
                status: "done",
                _embed: "transactionDetails",
            },
        })
            .then((res) => {
                // res.data.map((val) => {
                //     this.setState({
                //         status: val.transaction.status,
                //     })
                // })

                this.setState({
                    listTransaksi: res.data,
                })
                console.log(res.data);


            })
            .catch((err) => {
                console.log(err);
            });
    }

    renderDataTransaksi = () => {
        const { listTransaksi } = this.state
        return listTransaksi.map((val, idx) => {
            return (
                <tr>
                    <td>{idx + 1}</td>
                    <td>trs-tko-{val.id}</td>
                    <td>{val.metodePembayaran}</td>
                    <td>{val.totalprice}</td>
                    <td>{val.tgl_selesai}</td>
                    <td>{val.tgl_belanja}</td>
                    {
                        val.status === "pending" ? (<td style={{ color: "red" }}> <input className="icon-red" type="button" value={val.status} /></td>) : (
                            <td style={{ color: "green" }}> <input className="icon-green" type="button" value={val.status} /></td>
                        )
                    }
                    <td>{val.metodePembayaran}</td>
                    <td> <ButtonUI className="text-center" onClick={this.lihatDetail} >
                        Detail
                    </ButtonUI>

                        {
                            (this.state.detail) ? (
                                <Table className="mt-3">
                                    <thead>
                                        <tr>
                                            <th>Nama Produk</th>
                                            <th>Quantity</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            val.transactionDetails.map((value) => {
                                                return (
                                                    <tr>
                                                        <td>{value.productName}</td>
                                                        <td>{value.quantity}</td>
                                                        <td><span style={{ fontWeight: "normal" }}>
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
                            ) : (null)
                        }

                    </td>

                </tr>
            )
        })
    }

    render() {
        return (
            <div className="container">
                <div className="d-flex justify-content-center flex-row align-items-center my-3">
                    {/* <Link to="/history" style={{ color: "inherit" }} >
                        <h6 className="mx-4 font-weight-bold">Pending</h6>
                    </Link> */}
                    {/* <Link to="/history" style={{ color: "inherit" }} onClick={() => this.getStatus("done")} >
                        <h6 className="mx-4 font-weight-bold">Done</h6>
                    </Link>
                    <Link to="/history" style={{ color: "inherit" }} onClick={() => this.getDataTransaksi()} >
                        <h6 className="mx-4 font-weight-bold">All</h6>
                    </Link> */}
                </div>
                <caption>
                    <h4>History</h4>
                </caption>
                <h3>Hallo, {' '} {this.props.user.fullName}</h3>
                <p>Ini merupakan history belanja kamu</p>
                <Table className="mt-4 text-center align-items-center my-3">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>ID Transaksi</th>
                            <th>Metode Pembayaran</th>
                            <th>Total Harga</th>
                            <th>Tanggal Selesai</th>
                            <th>Tanggal Belanja</th>
                            <th>Metode Pembayaran</th>
                            <th>Status</th>
                            <th>Detail Transaksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderDataTransaksi()}
                    </tbody>

                </Table>
                <h4>
                    {/* Status : {' '} {this.state.status} */}
                </h4>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(HistoryScreen);
