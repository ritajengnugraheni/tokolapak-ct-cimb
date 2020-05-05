import userTypes from "../types/user";

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT_SUCCESS, ON_SEARCHFILTER_SUCCESS, ON_NOTIFICATION } = userTypes;

const init_state = {
  id: 0,
  username: "",
  fullName: "",
  address: {},
  role: "",
  errMsg: "",
  cookieChecked: false,
  searchInput: "",
  email: "",
  qty: 5
};

export default (state = init_state, action) => {
  switch (action.type) {
    case ON_LOGIN_SUCCESS:
      const { username, fullName, role, id, address, email, qty } = action.payload;
      return {
        ...state,
        username,
        fullName,
        address,
        role,
        id,
        email,
        qty,
        cookieChecked: true,
      };
    case ON_LOGIN_FAIL:
      return { ...state, errMsg: action.payload, cookieChecked: true };
    case "ON_REGISTER_FAIL":
      return { ...state, errMsg: action.payload, cookieChecked: true };
    case ON_LOGOUT_SUCCESS:
      return { ...init_state, cookieChecked: true };
    case "COOKIE_CHECK":
      return { ...state, cookieChecked: true };
    case ON_SEARCHFILTER_SUCCESS:
      return { ...state, cookieChecked: true, searchInput: action.payload }
    case ON_NOTIFICATION:
      return { ...state, cookieChecked: true, qty: action.payload }
    default:
      return { ...state };
  }
};
