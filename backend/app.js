require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes/routers');
const centralHandlerError = require('./middlewares/centralHadlerError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(requestLogger);
app.use(cors());

app.use(express.json());

app.use(helmet());

app.use(router);

app.use(errorLogger);
app.use(errors());

app.use(centralHandlerError);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT);
