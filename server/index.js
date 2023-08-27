const dotenv = require('dotenv');
const express = require("express");
const app = express();
const allRouter = require('./router/auth')
const cors = require("cors")
const bodyParser = require('body-parser');


dotenv.config({path: './config.env'});

require('./db/connection')
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use(allRouter);
const User = require('./model/userSchema');

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});