import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();
import dbModel from "../../../db/model";

export default {
  Mutation: {
    createAccount: async (
      _,
      {
        armynumber,
        password,
        nickname,
        role,
        militarybase,
      }
    ) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await dbModel.user.create({
          armynumber,
          password: hashedPassword,
          nickname,
          role,
          militarybase,
        });

        const now = new Date();
        const duration = 5184000000;
        const newToken = await jwt.sign(
          { id: user._id, iat: now.getTime(), eat: now.getTime() + duration },
          process.env.SECRET_KEY
        );

        return {
          ok: true,
          token: newToken,
          userId: user._id,
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