import { connect } from "mongoose";

const { MONGODB_URI } = process.env;

// mongoDB Connect
export const mongodb = async () => {
  connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
