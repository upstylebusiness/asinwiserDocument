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

    await mongoose.connect("mongodb+srv://Raziq:r7a8z6i3@zahraf.bb5ow.mongodb.net/Documentupstyle?retryWrites=true&w=majority");
//     const client = await MongoClient.connect(
//       'mongodb://upscale:d5xsXjYUem&S9rB@13.40.105.133:52531/admin',
//       { useNewUrlParser: true, useUnifiedTopology: true }
//     );

//     const coll = client.db('asinDoc').collection('upstyle');
//     console.log(coll,"fdlkjslkdjflskdj");
// // const cursor = coll.find(filter);
// // const result = await cursor.toArray();
// // await client.close();

  } catch (error) {
    console.log("Mongo is error :", error);
  }
};
export default connectDb;
