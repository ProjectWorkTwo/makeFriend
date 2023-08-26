const dotenv = require('dotenv');
const express = require("express");
const app = express();
const allRouter = require('./router/auth')

dotenv.config({path: './config.env'});

require('./db/connection')
app.use(express.json());
app.use(allRouter);
const User = require('./model/userSchema');

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});