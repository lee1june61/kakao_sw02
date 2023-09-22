import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      try {
        const user = {
            _id: 1,
            password: "",
            nickName: ""
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
        const token = await jwt.sign({ id: user.id, iat: now.getTime(), eat: now.getTime() + duration}, process.env.SECRET_KEY);

        return {
          ok: true,
          token,
          user: user,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4106"
        }
      }
    },
  },
};