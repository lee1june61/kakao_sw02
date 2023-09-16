import { connect } from "mongoose";

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const MONGO_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.7ydfvwh.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

// mongoDB Connect
export const db = connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
