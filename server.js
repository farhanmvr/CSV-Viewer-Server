const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

const fileRouter = require('./routes/fileRouter');

// dotenv
dotenv.config({ path: './.env' });

// app
const app = express();

// database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB CONNECTED`))
  .catch((err) => console.log(`DB CONNECTION ERR ${err}`));

// middlewares
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(cors());

// routes middlewares
app.use('/api/file', fileRouter);

// Handle error for unknown route
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: 'Invalid request',
  });
});

// Set server PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening to PORT ${PORT}`);
});
