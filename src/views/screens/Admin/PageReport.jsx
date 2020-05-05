import React from "react"
import Axios from "axios"
import { API_URL } from "../../../constants/API"
import { Table } from "reactstrap"

class PageReport extends React.Component {
    state = {
        transaksiDone: [],
        totalShop: 0,
        transaksiUSer: []
    }

    componentDidMount() {
        this.getTransaksiDone()
        this.getUserTransaksi()
    }
    getTransaksiDone = () => {
        Axios.get(`${API_URL}/products`, {
            params: {
                _embed: "transactionDetails",

            }
        })
            .then((res) => {
                console.log(res);
                res.data.map((val) => {
                    return val.transactionDetails.map((value) => {
                        Axios.get(`${API_URL}/transactions`, {
                            params: {
                                id: value.transactionId,
                                status: "done",
                                _embed: "transactionDetails"

                            }
                        })
                            .then((res) => {
                                res.data.map((val) => {
                                    return val.transactionDetails.map((value) => {
                                        Axios.get(`${API_URL}/products`, {
                                            params: {
                                                id: value.productId,
                                                _embed: "transactionDetails"
                                            }
                                        })
                                            .then((res) => {
                                                console.log(res);
                                                this.setState({
                                                    transaksiDone: res.data
                                                })

                                            })
                                            .catch((err) => {
                                                console.log(err);

                                            })
                                    })
                                })

                                // console.log(res);

                            })
                            .catch((err) => {
                                console.log(err);

                            })
                    })
                })
                // this.setState({
                //     transaksiDone: res.data
                // })

            })
            .catch((err) => {
                console.log(err);

            })
    }

    // getTransaksiDone = () => {
    //     Axios.get(`${API_URL}/products`)
    //         .then((res) => {
    //             console.log(res);
    //             this.setState({
    //                 transaksiDone: res.data
    //             })
    //             this.state.transaksiDone.map((val) => {
    //                 Axios
    //             })

    //         })
    //         .catch((err) => {
    //             console.log(err);

    //         })
    // }


    getUserTransaksi = () => {
        let totalharga = 0
        Axios.get(`${API_URL}/users`, {
            params: {
                _embed: "transactions"
            }
        })
            .then((res) => {
                // console.log(res);
                // res.data.map((val) => {
                //     return val.transactions.map((value) => {
                //         totalharga += value.totalprice
                //     })
                // })
                this.setState({
                    transaksiUSer: res.data,
                    // totalShop: totalharga

                })

            })
            .catch((err) => {
                console.log(err);

            })
    }
    // getUserTransaksi = () => {
    //     let totalharga = 0
    //     Axios.get(`${API_URL}/users`)
    //         .then((res) => {
    //             console.log(res);
    //             this.setState({
    //                 transaksiUSer: res.data,
    //             })
    //             res.data.map((val) => {
    //                 Axios.get(`${API_URL}/transactions`, {
    //                     params: {
    //                         userId: val.id,
    //                         status: "done"
    //                     }
    //                 })
    //                     .then((res) => {
    //                         console.log(res);
    //                         res.data.map((val) => {
    //                             totalharga += val.totalprice
    //                         })
    //                         this.setState({
    //                             totalShop: totalharga
    //                         })
    //                     })
    //             })

    //         })
    //         .catch((err) => {
    //             console.log(err);

    //         })
    // }

    renderDataTransaksi = () => {
        let totaldah = 0
        const { transaksiUSer } = this.state
        return transaksiUSer.map((val) => {
            return (
                <tr>
                    <td>{val.fullName}</td>
                    <td>
                        {/* {this.state.totalShop} */}
                        {
                            val.transactions.map((value) => {
                                totaldah += value.totalprice
                                if (value.status == "done") {
                                    return (
                                        <div>{totaldah}</div>


                                    )
                                }
                            })
                        }
                    </td>
                    <td>

                    </td>
                </tr>
            )
        })
    }
    renderDataTransaksi2 = () => {
        let totalquantity = 0
        const { transaksiDone } = this.state
        return transaksiDone.map((val) => {
            return (
                <tr>
                    <td>{val.productName}</td>
                    <td>
                        {
                            val.transactionDetails.map((value) => {
                                totalquantity += value.quantity

                                return (
                                    <div>{totalquantity}</div>
                                )

                            })
                        }
                    </td>

                </tr>
            )
        })
    }
    render() {
        return (
            <div className="container">
                <caption>
                    <h3>User Report</h3>

                </caption>
                <p style={{ color: "red" }}>Masih terdapat bug yaitu yang ditampilkan dalam total iterasinya</p>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>Nama User</th>
                            <th>Total Pembelian</th>

                        </tr>
                    </thead>
                    <tbody>

                        {this.renderDataTransaksi()}
                    </tbody>
                </Table>
                <caption className="mt-4">
                    <h3>Produk Report</h3>

                </caption>
                <p style={{ color: "red" }}>masih menampilkan iterasi penjumlahan dan perlu refresh untuk melihat product lain yang done</p>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>Nama produk</th>
                            <th>jumlah terbeli</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.renderDataTransaksi2()}
                    </tbody>
                </Table>
            </div>
        )
    }

}
export default PageReport