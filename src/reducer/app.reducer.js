import { decode } from "jsonwebtoken";

const checkAdmin = (token) => {
  const { isAdmin } = decode(token);
  return isAdmin;
};

export const Reducer = (state, actions) => {
  switch (actions.type) {
    case "toggleError":
      return {
        ...state,
        error: { isError: !state.error.isError, msg: "", ver: "" },
      };

    case "axiosError":
      return {
        ...state,
        error: {
          isError: true,
          msg: actions.data.msg || "somthing went wrong",
          ver: "",
        },
      };

    case "coustomeError":
      return {
        ...state,
        error: {
          isError: true,
          msg: actions.msg || "somthing went wrong",
          ver: actions.ver,
        },
      };

    case "checkOut":
      return { ...state, cart: [] };

    case "auth":
      return {
        ...state,
        user: { email: actions.data.user.email, name: actions.data.user.name },
        isLogin: true,
        isAdmin: checkAdmin(actions.data.token),
        token: actions.data.token,
      };

    case "logout":
      return {
        ...state,
        isLogin: false,
        isAdmin: false,
        token: "",
        user: { email: "", name: "" },
      };

    case "addToCart":
      let isRepeat = false;

      state.cart.map((x) =>
        x._id === actions.item._id ? (isRepeat = true) : undefined
      );

      if (isRepeat === true) return { ...state };

      return { ...state, cart: [...state.cart, { ...actions.item }] };

    case "updateCartQty":
      return {
        ...state,
        cart: state.cart.map((x) =>
          x._id === actions._id ? { ...x, cartQty: actions.cartQty } : x
        ),
      };

    case "deletCart":
      return {
        ...state,
        cart: state.cart.filter((x) => x._id !== actions._id),
      };

    default:
      return state;
  }
};
