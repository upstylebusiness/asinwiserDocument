import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    myAdmin: {
      type: String,
      required: true,
    },
    isBlock: {
      type: Boolean,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    isSuperAdmin: {
      type: Boolean,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", UserSchema);
