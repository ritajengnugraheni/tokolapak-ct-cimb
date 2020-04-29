import Axios from "axios";
import { API_URL } from "../../constants/API";
import Cookie from "universal-cookie";
import userTypes from "../types/user"
import swal from "sweetalert";

const {ON_LOGIN_SUCCESS,ON_LOGIN_FAIL,ON_LOGOUT_SUCCESS} = userTypes

const cookieObj = new Cookie();


export const LoginHandler = (userData) => {
  return (dispatch) => {
    const { username, password } = userData;

    Axios.get(`${API_URL}/users`, {
      params: {
        username,
        password,
      },
    })
      .then((res) => {
        if (res.data.length > 0) {
          dispatch({
            type: ON_LOGIN_SUCCESS,
            payload: res.data[0],
            // {
            //   id,
            //   username,
            //   password,
            //   fullName,
            //   role
            // }
          });
          swal("Welcome", "", "success")
        } else {
          dispatch({
            type: ON_LOGIN_FAIL,
            payload: "",
          });
          swal("Username atau password salah", "", "error")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const userKeepLogin = (userData) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        id: userData.id,
      },
    })
      .then((res) => {
        if (res.data.length > 0) {
          dispatch({
            type: "ON_LOGIN_SUCCESS",
            payload: res.data[0],
            // {
            //   id,
            //   username,
            //   password,
            //   fullName,
            //   role
            // }
          });
        } else {
          dispatch({
            type: "ON_LOGIN_FAIL",
            payload: "Username atau password salah",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const logoutHandler = () => {
  cookieObj.remove("authData");
  return {
    type: "ON_LOGOUT_SUCCESS",
  };
};

export const RegisterHandler =(userData)=>{
    return (dispatch) => {
        Axios.get (`${API_URL}/users`, {
            params : {
                username: userData.username
            }
        })
        .then (res=>{
            if (res.data.length > 0) {
                dispatch ({
                    type :"ON_REGISTER_FAIL",
                    payload:""
                })
                swal("Username sudah digunakan", "", "error")

            } else {
                Axios.post(`${API_URL}/users`, userData)
                .then(res =>{
                    console.log(res);
                    dispatch ({
                        type:ON_LOGIN_SUCCESS,
                        payload: res.data
                    })
                    swal("Akun anda sudah terdaftar", "", "success")
                    
                })
                .catch(err => {
                    console.log(err);
                    
                })
            }
        })
        .catch (err =>{
            console.log(err);
            
        })
     
    }
}
export const cookieChecker = () => {
  return {
    type: "COOKIE_CHECK",
  };
};