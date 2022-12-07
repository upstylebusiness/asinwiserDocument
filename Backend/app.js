import path from "path";

import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import express from "express";
const app = express();
import cors from "cors";




import admin from "./router/adminRouter.js";
import user from "./router/userRouter.js";

// import { notFound, errorHandler } from "./Middleware/ErroreHandling.js";


app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))


app.use("/api/admin", admin);
app.use("/api/user", user);



app.get('/', (req, res) => {
  res.send('API is running....');
});


// Serve static assets if in production
// const __dirname = path.resolve();

//static folder path
// app.use(express.static(path.resolve(__dirname, "public")));

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '/Frontend/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'Frontend', 'build', 'index.html'))
//   );
// } else {
 
// }

//ERROR HANDLING
// app.use(notFound);
// app.use(errorHandler);

export default app;
