import chalk from "chalk"
import colors from "colors";
import dotenv  from "dotenv";

import app  from "./app.js";
import connectDb from "./config/dbConnect.js"


dotenv.config();
//color enable
colors.enable();
//dotenv
dotenv.config();
//mongo connection
connectDb();



app.listen(process.env.PORT || 5000,()=>{
    console.log(chalk.blue.bold('*********************'));

    console.log(chalk.blue.bold('Have a Nice Day    ❤️'));
    console.log(chalk.blue.bold('*********************'));

    console.log(chalk.green(
        'Server Is Running ' +
        chalk.blue.underline.bold(' with Port ') +
        process.env.PORT
    ));
    // console.log(chalk.blue.bgWhiteBright.bold('❤️  ❤️  ❤️  ❤️  ❤️  ❤️   ❤️  ❤️  ❤️  ❤️'));

})
