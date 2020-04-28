// import React from "react"
// import TextField from "../../components/TextField/TextField"
// import ButtonUI from "../../components/Button/Button"
// import { RegisterHandler, LoginHandler } from '../../../redux/actions'
// import { connect } from 'react-redux'


// class AuthScreen extends React.Component {
//     state = {
//         username: "",
//         fullName: "",
//         password: "",
//         address: "",
//         condition: true,
//     }
//     inputHandler = (e, field) => {
//         this.setState({ [field]: e.target.value });
//     }
//     conditionFormLogin = () => {
//         this.setState({ condition: true });
//     }
//     conditionFormRegister = () => {
//         this.setState({ condition: false });
//     }

//     LoginUserHandler = () => {
//         const { username, password } = this.state
//         const userData = {
//             username,
//             password,
//         };
//         this.props.onLogin(userData)
//         this.setState({
//             usernameInput: "",
//             passwordInput: "",
//         })

//     }
//     RegisterUserHandler = () => {
//         const { username, fullName, password, address } = this.state
//         const userData = {
//             username,
//             password,
//             fullName,
//             address,
//         };
//         this.props.onRegister(userData)
//         this.setState({
//             usernameInput: "",
//             passwordInput: "",
//             fullNameInput: "",
//             addressInput: "",
//         })
//     }
//     render() {
//         const {
//             usernameInput,
//             passwordInput,
//             fullNameInput,
//             addressInput

//         } = this.state;
//         return (
//             <div className="container">
//                 <div className="row mt-5">
//                     <div className="col-5">
//                         {
//                             (this.state.condition) ? (<div className="d-flex flex-row justify-content-center">
//                                 <ButtonUI type="auth button" className="mt-5 mb-5" onClick={this.conditionFormRegister}  >Register</ButtonUI>
//                                 <ButtonUI type="auth button" className="mt-5 mb-5" onClick={this.conditionFormLogin} style={{ backgroundColor: "#373F41", color: "white" }}  >Login</ButtonUI>
//                             </div>) : (<div className="d-flex flex-row justify-content-center">
//                                 <ButtonUI type="auth" className="mt-5 mb-5" onClick={this.conditionFormRegister} style={{ backgroundColor: "#373F41", color: "white" }} >Register</ButtonUI>
//                                 <ButtonUI type="auth" className="mt-5 mb-5" onClick={this.conditionFormLogin}>Login</ButtonUI>
//                             </div>)
//                         }

//                         {
//                             (this.state.condition) ? ((!this.props.user.id) ? (
//                                 <div>

//                                     <h3 >Log In</h3>
//                                     <p className="mt-4">
//                                         Welcome Back.
//                                 <br />Please, Login to your account</p>
//                                     <TextField
//                                         placeholder="Username"
//                                         className="mt-5"
//                                         value={usernameInput}
//                                         onChange={(e) => this.inputHandler(e, "username")}
//                                     />
//                                     <TextField
//                                         placeholder="Password"
//                                         className="mt-2"
//                                         value={passwordInput}
//                                         onChange={(e) => this.inputHandler(e, "password")}
//                                     />
//                                     <div className="d-flex justify-content-center">
//                                         <ButtonUI type="contained" className="mt-4" onClick={this.LoginUserHandler}>
//                                             Login
//                                     </ButtonUI>
//                                     </div>
//                                 </div>
//                             ) : (
//                                     <div>ANDA SUDAH MASUK</div>
//                                 )

//                             ) : (
//                                     <div>

//                                         <h3>Register</h3>
//                                         <p className="mt-4">
//                                             You will get the best recommendation for rent
//                                     <br />house in near of you</p>
//                                         <TextField
//                                             value={usernameInput}
//                                             placeholder="Username"
//                                             className="mt-5" onChange={(e) => this.inputHandler(e, "username")} />
//                                         <TextField
//                                             value={fullNameInput}
//                                             placeholder="Fullname"
//                                             className="mt-2"
//                                             onChange={(e) => this.inputHandler(e, "fullName")} />
//                                         <TextField
//                                             value={passwordInput}
//                                             placeholder="Password"
//                                             className="mt-2"
//                                             onChange={(e) => this.inputHandler(e, "password")} />
//                                         <TextField
//                                             value={addressInput}
//                                             placeholder="Address"
//                                             className="mt-2"
//                                             onChange={(e) => this.inputHandler(e, "address")} />
//                                         <div className="d-flex justify-content-center">
//                                             <ButtonUI type="contained" className="mt-4" onClick={this.RegisterUserHandler}>
//                                                 Register
//                                             </ButtonUI>
//                                         </div>
//                                     </div>
//                                 )
//                         }
//                     </div>
//                     <div className="col-7">Picture</div>
//                 </div>
//             </div>
//         )
//     }
// }
// const mapStateToProps = state => {
//     return {
//         user: state.user
//     }
// }
// const mapDispatchToProps = {
//     onLogin: LoginHandler,
//     onRegister: RegisterHandler,
// }
// export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)

import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

import TextField from "../../components/TextField/TextField";
import ButtonUI from "../../components/Button/Button";
import "./AuthScreen.css";

// actions
import { RegisterHandler, LoginHandler } from "../../../redux/actions";

class AuthScreen extends React.Component {
    state = {
        activePage: "register",
        loginForm: {
            username: "",
            password: "",
            showPassword: false,
        },
        registerForm: {
            username: "",
            fullName: "",
            email: "",
            password: "",
            showPassword: false,
        },
    };

    componentDidUpdate() {
        if (this.props.user.id) {
            const cookie = new Cookies();
            cookie.set("authData", JSON.stringify(this.props.user));
        }
    }

    inputHandler = (e, field, form) => {
        const { value } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            },
        });

        // this.setState({ loginForm: {
        //   ...this.state.loginForm,
        //   [fieldYangDiganti]: value
        // }})
    };

    registerBtnHandler = () => {
        const { username, fullName, password, email } = this.state.registerForm;
        let newUser = {
            username,
            fullName,
            password,
            email,
        };

        this.props.onRegister(newUser);
    };

    loginBtnHandler = () => {
        const { username, password } = this.state.loginForm;
        let newUser = {
            username,
            password,
        };

        this.props.onLogin(newUser);
    };

    checkBoxHandler = (e, from) => {
        const { checked } = e.target;
        this.setState({
            [from]: {
                ...this.state[from],
                showPassword: checked
            }
        })
    }

    renderAuthComponent = () => {
        const { activePage } = this.state;
        if (activePage == "register") {
            return (
                <div className="mt-5">
                    <h3>Register</h3>
                    <p className="mt-4">
                        You will get the best recommendation for rent house in near of you
          </p>
                    <TextField
                        value={this.state.registerForm.username}
                        onChange={(e) => this.inputHandler(e, "username", "registerForm")}
                        placeholder="Username"
                        className="mt-5"
                    />
                    <TextField
                        value={this.state.registerForm.fullName}
                        onChange={(e) => this.inputHandler(e, "fullName", "registerForm")}
                        placeholder="Name"
                        className="mt-2"
                    />
                    <TextField
                        value={this.state.registerForm.email}
                        onChange={(e) => this.inputHandler(e, "email", "registerForm")}
                        placeholder="Email"
                        className="mt-2"
                    />
                    <TextField
                        value={this.state.registerForm.password}
                        onChange={(e) => this.inputHandler(e, "password", "registerForm")}
                        placeholder="Password"
                        className="mt-2"
                        type={this.state.registerForm.showPassword ? "text" : "password"}
                    />
                    <input type="checkbox" className="mt-3" name="ShowPasswordRegister" id="" onChange={e => this.checkBoxHandler(e, "registerForm")} />{""} Show Password
          <div className="d-flex justify-content-center">
                        <ButtonUI
                            type="contained"
                            onClick={this.registerBtnHandler}
                            className="mt-4"
                        >
                            Register
            </ButtonUI>

                    </div>
                </div>
            );
        } else {
            return (
                <div className="mt-5">
                    <h3>Log In</h3>
                    <p className="mt-4">
                        Welcome back.
            <br /> Please, login to your account
          </p>
                    <TextField
                        value={this.state.loginForm.username}
                        onChange={(e) => this.inputHandler(e, "username", "loginForm")}
                        placeholder="Username"
                        className="mt-5"
                    />
                    <TextField
                        value={this.state.loginForm.password}
                        onChange={(e) => this.inputHandler(e, "password", "loginForm")}
                        placeholder="Password"
                        className="mt-2"
                    />
                    <input type="checkbox" className="mt-3" name="ShowPasswordLogin" id="" />{""} Show Password
          <div className="d-flex justify-content-center">
                        <ButtonUI
                            onClick={this.loginBtnHandler}
                            type="contained"
                            className="mt-4"
                        >
                            Login
            </ButtonUI>
                    </div>
                </div>
            );
        }
    };

    render() {
        if (this.props.user.id > 0) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-5">
                        <div className="d-flex flex-row">
                            <ButtonUI
                                className={`auth-screen-btn ${
                                    this.state.activePage == "register" ? "active" : null
                                    }`}
                                type="outlined"
                                onClick={() => this.setState({ activePage: "register" })}
                            >
                                Register
              </ButtonUI>
                            <ButtonUI
                                className={`ml-3 auth-screen-btn ${
                                    this.state.activePage == "login" ? "active" : null
                                    }`}
                                type="outlined"
                                onClick={() => this.setState({ activePage: "login" })}
                            >
                                Login
              </ButtonUI>
                        </div>
                        {this.props.user.errMsg ? (
                            <div className="alert alert-danger mt-3">
                                {this.props.user.errMsg}
                            </div>
                        ) : null}
                        {this.renderAuthComponent()}
                    </div>
                    <div className="col-7">Picture</div>
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
    onRegister: RegisterHandler,
    onLogin: LoginHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);