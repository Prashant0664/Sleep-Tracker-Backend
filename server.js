require('dotenv').config();
require('express-async-errors');

const path = require('path');
// extra security packages
const helmet = require('helmet');
const xss = require('xss-clean');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');

const mainroute=require('./routes/mainroute')
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.json());
app.use(helmet());

app.use(xss());

app.use('/api/v1/home', mainroute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
