import React from "react"
import Axios from "axios"
import { API_URL } from "../../../constants/API"
import { Table } from "reactstrap"

class PageReport extends React.Component {
    state = {
        transaksiDone: [],
        totalShop: 0
    }

    componentDidMount() {
        this.getTransaksiDone()
    }
    getTransaksiDone = () => {
        let totalBelanja = 0
        Axios.get(`${API_URL}/transactions`, {
            params: {
                status: "done",
                _embed: "transactionDetails"
            }
        })
            .then((res) => {

                console.log(res);
                this.setState({
                    transaksiDone: res.data,
                })


            })
            .catch((err) => {
                console.log(err);

            })
    }

    renderDataTransaksi = () => {
        const { transaksiDone, } = this.state
        return transaksiDone.map((val) => {
            return (
                <tr>
                    <td>trs-tko-{val.id}</td>
                    <td>
                        {
                            val.transactionDetails.map((value) => {
                                return (
                                    <Table>
                                        <tr>
                                            <td>{value.productName}</td>
                                            <td>{value.quantity}</td>
                                        </tr>
                                    </Table>
                                )

                            })
                        }
                    </td>
                </tr>
            )
        })
    }
    renderDataTransaksi2 = () => {
        let totalquantity = 0
        const { transaksiDone, } = this.state
        return transaksiDone.map((val) => {
            return (
                <tr>
                    <td>{val.userId}</td>
                    <td>
                        {
                            val.transactionDetails.map((value) => {
                                totalquantity += value.quantity
                                return (
                                    <Table>
                                        <tr>
                                            <td>{value.productName}</td>
                                            <td>{totalquantity}</td>
                                        </tr>
                                    </Table>
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
                <Table>
                    <thead>
                        <tr>
                            <th>ID Transaksi</th>
                            <th>Produk</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderDataTransaksi()}
                    </tbody>
                </Table>
                <caption className="mt-4">
                    <h3>Produk Report</h3>
                </caption>
                <Table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Produk</th>
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