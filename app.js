var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swaggerJSDoc = require('swagger-jsdoc');

var winston = require('./utilities/Logger');
var indexRouter = require('./routes/index');

var ordersRouter = require("./routes/analysis/analysis");
const swaggerDefinition = {
  info: {
    title: 'Aggregator service API',
    version: '1.0.0',
    description: 'Endpoints for Aggregator service',
  },
  host: 'localhost:3000',
  basePath: '/api/analysis'
};
const options = {
  swaggerDefinition,
  apis: ['./routes/index.js','./routes/analysis/analysis.js'],
};

const swaggerSpec = swaggerJSDoc(options);
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));


app.use(morgan('combined', { stream: winston.stream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(bodyParser.json());
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/', indexRouter);
try{
app.use('/api/analysis',ordersRouter);
}catch(err){console.log(err)}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
