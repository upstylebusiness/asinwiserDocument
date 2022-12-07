import mongoose from "mongoose";

const AdminSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { 
      type: String,
      required: true
    },
    isAdmin: { 
      type: Boolean,
      required: true
    },
    isSuperAdmin: { 
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);
export const Admin = mongoose.model("Admin", AdminSchema);
