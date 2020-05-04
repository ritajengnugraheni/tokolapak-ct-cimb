import React from "react";
import { Table } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { connect } from "net";

class History extends React.Component {
    state = {
        listTransaksi: []
    }

    getDataTransaksi = () => {
        Axios.get(`${API_URL}/transactions`, {
            params: {
                userId: this.props.user.id,
                _expand: "transactionDetail"
            }
        })
            .then((res) => {
                console.log(res);
                this.setState({
                    listTransaksi: res.data
                })

            })
            .catch((err) => {
                console.log(err);

            })
    }
    renderDataTransaksi = () => {
        const { listTransaksi } = this.state
        return listTransaksi.map((val, idx) => {
            return (
                <tr>
                    <td>{idx + 1}</td>
                    <td>{val.transactionDetail.productId}</td>
                    <td>{val.transactionDetail.productName}</td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div className="container">
                <caption>
                    <h4>History</h4>
                </caption>
                <Table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>

                </Table>
                <h4>
                    Status : {' '}
                </h4>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(History)