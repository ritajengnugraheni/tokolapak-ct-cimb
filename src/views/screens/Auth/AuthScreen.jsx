import React from "react"
import TextField from "../../components/TextField/TextField"
import ButtonUI from "../../components/Button/Button"



class AuthScreen extends React.Component {

    showLogin = () => {
        return (
            <div>
                <h3>Log In</h3>
                <p className="mt-4">Welcome back. <br />
                    Please, login in your account</p>
                <TextField placeholder="Username" className="mt-5" />
                <TextField placeholder="Password" className="mt-2" />
                <div className="d-flex justify-content-center">
                    <ButtonUI type="contained" className="mt-4">Login</ButtonUI>
                </div>
            </div>
        )
    }
    showRegister = () => {
        return (
            <div>
                <h3>Register</h3>
                <p className="mt-4">You will get the best recommendation for rent <br />
                    house in near of you</p>
                <TextField placeholder="Name" className="mt-5" />
                <TextField placeholder="Email" className="mt-2" />
                <TextField placeholder="Password" className="mt-2" />
                <TextField placeholder="Confrim password" className="mt-2" />
                <div className="d-flex justify-content-center">
                    <ButtonUI type="contained" className="mt-4">Register</ButtonUI>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-5">
                        <div className="d-flex justify-content-center">
                            <ButtonUI type="auth" className="mt-5 mb-5" onClick={this.showRegister}>Register</ButtonUI> <br />
                            <ButtonUI type="auth" className="mt-5 mb-5" onClick={this.showLogin}>Login</ButtonUI>
                        </div>
                        {this.showLogin()}
                        {/* <div>
                            <h3>Log In</h3>
                            <p className="mt-4">Welcome back. <br />
                                Please, login in your account</p>
                            <TextField placeholder="Username" className="mt-5" />
                            <TextField placeholder="Password" className="mt-2" />
                            <div className="d-flex justify-content-center">
                                <ButtonUI type="contained" className="mt-4">Login</ButtonUI>
                            </div>
                        </div> */}
                    </div>
                    <div className="col-7">picture</div>

                    <div className="row mt-5">
                        <div className="col-5">
                           
                            {this.showRegister()}
                            {/* <div>
                                <h3>Register</h3>
                                <p className="mt-4">You will get the best recommendation for rent <br />
                                    house in near of you</p>
                                <TextField placeholder="Name" className="mt-5" />
                                <TextField placeholder="Email" className="mt-2" />
                                <TextField placeholder="Password" className="mt-2" />
                                <TextField placeholder="Confrim password" className="mt-2" />
                                <div className="d-flex justify-content-center">
                                    <ButtonUI type="contained" className="mt-4">Register</ButtonUI>
                                </div>
                            </div> */}
                        </div>
                        <div className="col-7">picture</div>
                    </div>
                </div>

            </div>
        )
    }
}

export default AuthScreen
