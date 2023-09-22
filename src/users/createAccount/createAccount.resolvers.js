import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, password }
    ) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const account = {
          data: {
            username,
            password: hashedPassword,
            phone,
            marketingAgree
          },
        };

        const now = new Date();
        const duration = 5184000000;
        const newToken = await jwt.sign({ id: a.id, iat: now.getTime(), eat: now.getTime() + duration}, process.env.SECRET_KEY);

        return {
          ok: true,
          token: newToken,
          userId: account._id
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "registration failed",
        };
      }
    },
  },
};