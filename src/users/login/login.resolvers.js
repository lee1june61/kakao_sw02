import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbModel from "../../../db/model";

export default {
  Mutation: {
    login: async (_, { armynumber, password }) => {
      try {
        const user = await dbModel.user.findOne({ armynumber });
        if (!user) {
          return {
            ok: false,
            error: "유저가 존재하지 않습니다.",
          };
        }
        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) {
          return {
            ok: false,
            error: "invalid password",
          };
        }
        const now = new Date();
        //const duration = 5000;
        const duration = 5184000000;
        const token = await jwt.sign(
          {
            id: user.armynumber,
            iat: now.getTime(),
            eat: now.getTime() + duration,
          },
          process.env.SECRET_KEY
        );

        return {
          ok: true,
          token,
          user: user,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4106",
        };
      }
    },
  },
};
