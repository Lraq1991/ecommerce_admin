function userReducer(state = {}, action) {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state.user, ...action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
}

export default userReducer;
