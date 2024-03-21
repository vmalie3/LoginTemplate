import { Schema, model } from "mongoose";
import { hash } from "bcrypt";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

userSchema.pre("save", async function () {
  this.password = await hash(this.password, 12);
});

export default model("Users", userSchema);