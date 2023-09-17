import {
  TokenResponse,
  getUser,
  login,
  logoutUser,
  signupUser,
} from "./users.utils";

export default {
  Query: {
    logoutUser: logoutUser,
    TokenResponse: TokenResponse,
    getMe: getUser,
  },
  Mutation: {
    Login: login,
    signupUser: signupUser,
  },
};
