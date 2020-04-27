import React from "react"
import TextField from "../../components/TextField/TextField"
import ButtonUI from "../../components/Button/Button"
import { RegisterHandler, LoginHandler } from '../../../redux/actions'
import { connect } from 'react-redux'


class AuthScreen extends React.Component {
    state = {
        username: "",
        fullName: "",
        password: "",
        address: "",
        condition: true,
    }
    inputHandler = (e, field) => {
        this.setState({ [field]: e.target.value });
    }
    conditionFormLogin = () => {
        this.setState({ condition: true });
    }
    conditionFormRegister = () => {
        this.setState({ condition: false });
    }

    LoginUserHandler = () => {
        const { username, password } = this.state
        const userData = {
            username,
            password,
        };
        this.props.onLogin(userData)
        this.setState({
            usernameInput: "",
            passwordInput: "",
        })

    }
    RegisterUserHandler = () => {
        const { username, fullName, password, address } = this.state
        const userData = {
            username,
            password,
            fullName,
            address,
        };
        this.props.onRegister(userData)
        this.setState({
            usernameInput: "",
            passwordInput: "",
            fullNameInput: "",
            addressInput: "",
        })
    }
    render() {
        const {
            usernameInput,
            passwordInput,
            fullNameInput,
            addressInput

        } = this.state;
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-5">
                        <div className="d-flex justify-content-center">
                            <ButtonUI type="auth" className="mt-5 mb-5" onClick={this.conditionFormRegister} >Register</ButtonUI>
                            <ButtonUI type="auth" className="mt-5 mb-5" onClick={this.conditionFormLogin}>Login</ButtonUI>
                        </div>
                        {
                            (this.state.condition) ? ((!this.props.user.id) ? (
                                <div>
                                    <h3 >Log In</h3>
                                    <p className="mt-4">
                                        Welcome Back.
                                <br />Please, Login to your account</p>
                                    <p>{this.props.user.errMsg}</p>
                                    <TextField
                                        placeholder="Username"
                                        className="mt-5"
                                        value={usernameInput}
                                        onChange={(e) => this.inputHandler(e, "username")}
                                    />
                                    <TextField
                                        placeholder="Password"
                                        className="mt-2"
                                        value={passwordInput}
                                        onChange={(e) => this.inputHandler(e, "password")}
                                    />
                                    <div className="d-flex justify-content-center">
                                        <ButtonUI type="contained" className="mt-4" onClick={this.LoginUserHandler}>
                                            Login
                                    </ButtonUI>
                                    </div>
                                </div>
                            ) : (
                                    <div>ANDA SUDAH MASUK</div>
                                )

                            ) : (
                                    <div>
                                        <h3>Register</h3>
                                        <p className="mt-4">
                                            You will get the best recommendation for rent
                                    <br />house in near of you</p>
                                        <TextField
                                            value={usernameInput}
                                            placeholder="Username"
                                            className="mt-5" onChange={(e) => this.inputHandler(e, "username")} />
                                        <TextField
                                            value={fullNameInput}
                                            placeholder="Fullname"
                                            className="mt-2"
                                            onChange={(e) => this.inputHandler(e, "fullName")} />
                                        <TextField
                                            value={passwordInput}
                                            placeholder="Password"
                                            className="mt-2"
                                            onChange={(e) => this.inputHandler(e, "password")} />
                                        <TextField
                                            value={addressInput}
                                            placeholder="Address"
                                            className="mt-2"
                                            onChange={(e) => this.inputHandler(e, "address")} />
                                        <div className="d-flex justify-content-center">
                                            <ButtonUI type="contained" className="mt-4" onClick={this.RegisterUserHandler}>
                                                Register
                                            </ButtonUI>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                    <div className="col-7">Picture</div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = {
    onLogin: LoginHandler,
    onRegister: RegisterHandler,
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)