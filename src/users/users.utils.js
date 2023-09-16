import jwt from "jsonwebtoken";
require("dotenv").config();

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    
    const user = {
        id: 1,
        username: "25div",
        activate: true,
    }
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export function protectedResolver(ourResolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in to perform to action",
      };
    }
    return ourResolver(root, args, context, info);
  };
}