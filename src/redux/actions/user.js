import Axios from "axios";
import { API_URL } from "../../constants/API";
import Cookie from "universal-cookie";
<<<<<<< HEAD
import userTypes from "../types/user"

const {ON_LOGIN_SUCCESS,ON_LOGIN_FAIL,ON_LOGOUT_SUCCESS} = userTypes

const cookieObj = new Cookie();


=======
import userTypes from "../types/user";

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT_SUCCESS } = userTypes;

const cookieObj = new Cookie();

>>>>>>> b3d57fa4d4c7075e9d991868afaa7eaced7bd92e
export const loginHandler = (userData) => {
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
<<<<<<< HEAD
            // {
            //   id,
            //   username,
            //   password,
            //   fullName,
            //   role
            // }
=======
>>>>>>> b3d57fa4d4c7075e9d991868afaa7eaced7bd92e
          });
        } else {
          alert("masuk");
          dispatch({
            type: ON_LOGIN_FAIL,
            payload: "Username atau password salah",
          });
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
<<<<<<< HEAD
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
=======
            type: ON_LOGIN_SUCCESS,
            payload: res.data[0],
          });
        } else {
          dispatch({
            type: ON_LOGIN_FAIL,
>>>>>>> b3d57fa4d4c7075e9d991868afaa7eaced7bd92e
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
<<<<<<< HEAD
    type: "ON_LOGOUT_SUCCESS",
  };
};

export const registerHandler =(userData)=>{
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
                    payload:"Username sudah digunakan "
                })
            } else {
                Axios.post(`${API_URL}/users`, userData)
                .then(res =>{
                    console.log(res);
                    dispatch ({
                        type:ON_LOGIN_SUCCESS,
                        payload: res.data
                    })
                    
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
=======
    type: ON_LOGOUT_SUCCESS,
  };
};

export const registerHandler = (userData) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        username: userData.username,
      },
    })
      .then((res) => {
        if (res.data.length > 0) {
          dispatch({
            type: "ON_REGISTER_FAIL",
            payload: "username sudah digunakan",
          });
        } else {
          Axios.post(`${API_URL}/users`, userData)
            .then((res) => {
              console.log(res.data);
              dispatch({
                type: ON_LOGIN_SUCCESS,
                payload: res.data,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
>>>>>>> b3d57fa4d4c7075e9d991868afaa7eaced7bd92e
