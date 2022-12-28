import { createServer } from "http";
import chalk from "chalk";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";

import app from "./app.js";
import connectDb from "./config/dbConnect.js";
import { setupSocket } from "./socket_io/socket.route.js";

const server = createServer(app);

setupSocket(server);
// dotnetconnection
dotenv.config();
//color enable
colors.enable();
//dotenv
dotenv.config();
//mongo connection
connectDb();
// morgan
app.use(morgan("dev"));

server.listen(process.env.PORT || 5000, () => {
  console.log(chalk.blue.bold("*********************"));

  console.log(chalk.blue.bold("Have a Nice Day    ❤️"));
  console.log(chalk.blue.bold("*********************"));

  console.log(
    chalk.green(
      "Server Is Running " +
        chalk.blue.underline.bold(" with Port ") +
        process.env.PORT
    )
  );
  // console.log(chalk.blue.bgWhiteBright.bold('❤️  ❤️  ❤️  ❤️  ❤️  ❤️   ❤️  ❤️  ❤️  ❤️'));
});
