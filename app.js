var express = require('express');
var path = require('path');

const mongoose = require('mongoose');


var indexRouter = require('./routes/index');


var app = express();

require('dotenv').config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('DB Connection created')
  } catch (err) {
    console.log(err.message)
  }
}

connect()


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);








const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port number: ${PORT}`);
});

module.exports = app;
