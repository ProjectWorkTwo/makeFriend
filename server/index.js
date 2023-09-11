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


// Configure CORS to allow requests from http://localhost:5173
const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));


app.use(allRouter);
const User = require('./model/userSchema');

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});