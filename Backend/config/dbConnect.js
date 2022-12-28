import mongoose from "mongoose";

const connectDb = async () => {
  try {
    mongoose.connection
      .on("connecting", () => {
        console.log(" [ MongoDB ] connecting...".yellow.dim);
      })
      .on("connected", () => {
        console.log(" [ MongoDB ] connected".green);
      })
      .on("disconnecting", () => {
        console.log(" [ MongoDB ] disconnecting...".red.dim);
      })
      .on("disconnected", () => {
        console.log(" [ MongoDB ] disconnected".red.dim);
      })
      .on("error", (err) => {
        console.log(" [ MongoDB ] error".red);
        console.error(err);
      });

    await mongoose.connect('mongodb://upscale:d5xsXjYUem&S9rB@13.40.105.133:52531/admin');
  } catch (error) {
    console.log("Mongo is error :", error);
  }
};
export default connectDb