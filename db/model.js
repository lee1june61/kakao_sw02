import {model} from "mongoose";
import UserSchema from "./user/user.schema";

const userModel = model('UserSchema', UserSchema)

const dbModel = {
    user: userModel
}

export default dbModel;