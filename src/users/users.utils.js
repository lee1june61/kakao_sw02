import jwt from "jsonwebtoken";
import dbModel from "../../db/model";
require("dotenv").config();

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id, iat, eat } = await jwt.verify(token, process.env.SECRET_KEY);
    const now = new Date();
    if (iat > now.getTime() || eat < now.getTime()) {
      return null;
    }

    const user = await dbModel.user.findOne({ armynumber: id }).exec();
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
