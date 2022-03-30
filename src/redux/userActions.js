const productActions = {
  userStorage: function (user) {
    return {
      type: "USER_LOGIN",
      payload: user,
    };
  },
  userLogout: { type: "USER_LOGOUT" },
};

export default productActions;
