"use strict";var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swaggerJSDoc = require('swagger-jsdoc');
var winston = require("./src/utilities/Logger");
var indexRouter = require("./src/routes/index");

var ordersRouter = require("./src/routes/analysis/analysis");

var app = express();
// swagger definition
// view engine setup
app.set('views', path.join(__dirname+"/src", 'views'));
app.set('view engine', 'jade');

var swaggerDefinition = {
  info: {
    title: 'Aggregation service API',
    version: '1.0.0',
    description: 'Demonstrating  RESTful API with Swagger' },

  host: 'localhost:3000',
  basePath: '/api/analysis' };


// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./src/routes/index.js', './src/routes/analysis/analysis.js'] };


// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);


// app.use(logger('dev'));


app.use(morgan('combined', { stream: winston.stream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express["static"](path.join(__dirname+"/src", 'public')));

app.use(bodyParser.urlencoded({
  extended: true }));




app.use(bodyParser.json());

app.use('/', indexRouter);
try {
  app.use('/api/analysis', ordersRouter);
} catch (err) {console.log(err);}
app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiY3JlYXRlRXJyb3IiLCJyZXF1aXJlIiwiZXhwcmVzcyIsInBhdGgiLCJjb29raWVQYXJzZXIiLCJtb3JnYW4iLCJib2R5UGFyc2VyIiwic3dhZ2dlckpTRG9jIiwid2luc3RvbiIsImluZGV4Um91dGVyIiwib3JkZXJzUm91dGVyIiwiYXBwIiwic3dhZ2dlckRlZmluaXRpb24iLCJpbmZvIiwidGl0bGUiLCJ2ZXJzaW9uIiwiZGVzY3JpcHRpb24iLCJob3N0IiwiYmFzZVBhdGgiLCJvcHRpb25zIiwiYXBpcyIsInN3YWdnZXJTcGVjIiwic2V0Iiwiam9pbiIsIl9fZGlybmFtZSIsInVzZSIsInN0cmVhbSIsImpzb24iLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJlcnIiLCJjb25zb2xlIiwibG9nIiwiZ2V0IiwicmVxIiwicmVzIiwic2V0SGVhZGVyIiwic2VuZCIsIm5leHQiLCJsb2NhbHMiLCJtZXNzYWdlIiwiZXJyb3IiLCJzdGF0dXMiLCJyZW5kZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiYUFBQSxJQUFJQSxXQUFXLEdBQUdDLE9BQU8sQ0FBQyxhQUFELENBQXpCO0FBQ0EsSUFBSUMsT0FBTyxHQUFHRCxPQUFPLENBQUMsU0FBRCxDQUFyQjtBQUNBLElBQUlFLElBQUksR0FBR0YsT0FBTyxDQUFDLE1BQUQsQ0FBbEI7QUFDQSxJQUFJRyxZQUFZLEdBQUdILE9BQU8sQ0FBQyxlQUFELENBQTFCO0FBQ0EsSUFBSUksTUFBTSxHQUFHSixPQUFPLENBQUMsUUFBRCxDQUFwQjtBQUNBLElBQUlLLFVBQVUsR0FBR0wsT0FBTyxDQUFDLGFBQUQsQ0FBeEI7QUFDQSxJQUFJTSxZQUFZLEdBQUdOLE9BQU8sQ0FBQyxlQUFELENBQTFCO0FBQ0EsSUFBSU8sT0FBTyxHQUFHUCxPQUFPLHNCQUFyQjtBQUNBLElBQUlRLFdBQVcsR0FBR1IsT0FBTyxrQkFBekI7O0FBRUEsSUFBSVMsWUFBWSxHQUFH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LEdBQVIsQ0FBWSxLQUFaLE1BQXVCLGFBQXZCLEdBQXVDSCxHQUF2QyxHQUE2QyxFQUFoRTs7QUFFQTtBQUNBSyxFQUFBQSxHQUFHLENBQUNPLE1BQUosQ0FBV1osR0FBRyxDQUFDWSxNQUFKLElBQWMsR0FBekI7QUFDQVAsRUFBQUEsR0FBRyxDQUFDUSxNQUFKLENBQVcsT0FBWDtBQUNELENBUkQ7O0FBVUFDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmxDLEdBQWpCIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnaHR0cC1lcnJvcnMnKTtcbnZhciBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG52YXIgY29va2llUGFyc2VyID0gcmVxdWlyZSgnY29va2llLXBhcnNlcicpO1xudmFyIG1vcmdhbiA9IHJlcXVpcmUoJ21vcmdhbicpO1xudmFyIGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xudmFyIHN3YWdnZXJKU0RvYyA9IHJlcXVpcmUoJ3N3YWdnZXItanNkb2MnKTtcbnZhciB3aW5zdG9uID0gcmVxdWlyZSgnLi91dGlsaXRpZXMvTG9nZ2VyJyk7XG52YXIgaW5kZXhSb3V0ZXIgPSByZXF1aXJlKCcuL3JvdXRlcy9pbmRleCcpO1xuXG52YXIgb3JkZXJzUm91dGVyID0gcmVxdWlyZShcIi4vcm91dGVzL2FuYWx5c2lzL2FuYWx5c2lzXCIpO1xuXG52YXIgYXBwID0gZXhwcmVzcygpO1xuLy8gc3dhZ2dlciBkZWZpbml0aW9uXG52YXIgc3dhZ2dlckRlZmluaXRpb24gPSB7XG4gIGluZm86IHtcbiAgICB0aXRsZTogJ0FnZ3JlZ2F0aW9uIHNlcnZpY2UgQVBJJyxcbiAgICB2ZXJzaW9uOiAnMS4wLjAnLFxuICAgIGRlc2NyaXB0aW9uOiAnRGVtb25zdHJhdGluZyAgUkVTVGZ1bCBBUEkgd2l0aCBTd2FnZ2VyJyxcbiAgfSxcbiAgaG9zdDogJ2xvY2FsaG9zdDozMDAwJyxcbiAgYmFzZVBhdGg6ICcvYXBpL2FuYWx5c2lzJyxcbn07XG5cbi8vIG9wdGlvbnMgZm9yIHRoZSBzd2FnZ2VyIGRvY3NcbnZhciBvcHRpb25zID0ge1xuICAvLyBpbXBvcnQgc3dhZ2dlckRlZmluaXRpb25zXG4gIHN3YWdnZXJEZWZpbml0aW9uLFxuICAvLyBwYXRoIHRvIHRoZSBBUEkgZG9jc1xuICBhcGlzOiBbJy4vcm91dGVzL2luZGV4LmpzJywnLi9yb3V0ZXMvYW5hbHlzaXMvYW5hbHlzaXMuanMnXSxcbn07XG5cbi8vIGluaXRpYWxpemUgc3dhZ2dlci1qc2RvY1xudmFyIHN3YWdnZXJTcGVjID0gc3dhZ2dlckpTRG9jKG9wdGlvbnMpO1xuXG4vLyB2aWV3IGVuZ2luZSBzZXR1cFxuYXBwLnNldCgndmlld3MnLCBwYXRoLmpvaW4oX19kaXJuYW1lLCAndmlld3MnKSk7XG5hcHAuc2V0KCd2aWV3IGVuZ2luZScsICdqYWRlJyk7XG5cbi8vIGFwcC51c2UobG9nZ2VyKCdkZXYnKSk7XG5cblxuYXBwLnVzZShtb3JnYW4oJ2NvbWJpbmVkJywgeyBzdHJlYW06IHdpbnN0b24uc3RyZWFtIH0pKTtcblxuYXBwLnVzZShleHByZXNzLmpzb24oKSk7XG5hcHAudXNlKGV4cHJlc3MudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XG5hcHAudXNlKGNvb2tpZVBhcnNlcigpKTtcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJ3B1YmxpYycpKSk7XG5cbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHtcbiAgZXh0ZW5kZWQ6IHRydWVcbn0pKTtcblxuXG5cbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuXG5hcHAudXNlKCcvJywgaW5kZXhSb3V0ZXIpO1xudHJ5e1xuYXBwLnVzZSgnL2FwaS9hbmFseXNpcycsb3JkZXJzUm91dGVyKTtcbn1jYXRjaChlcnIpe2NvbnNvbGUubG9nKGVycil9XG5hcHAuZ2V0KCcvc3dhZ2dlci5qc29uJywgZnVuY3Rpb24ocmVxLCByZXMpIHtcbiAgcmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgcmVzLnNlbmQoc3dhZ2dlclNwZWMpO1xufSk7XG5cbi8vIGNhdGNoIDQwNCBhbmQgZm9yd2FyZCB0byBlcnJvciBoYW5kbGVyXG5hcHAudXNlKGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XG4gIG5leHQoY3JlYXRlRXJyb3IoNDA0KSk7XG59KTtcblxuLy8gZXJyb3IgaGFuZGxlclxuYXBwLnVzZShmdW5jdGlvbihlcnIsIHJlcSwgcmVzLCBuZXh0KSB7XG4gIC8vIHNldCBsb2NhbHMsIG9ubHkgcHJvdmlkaW5nIGVycm9yIGluIGRldmVsb3BtZW50XG4gIHJlcy5sb2NhbHMubWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuICByZXMubG9jYWxzLmVycm9yID0gcmVxLmFwcC5nZXQoJ2VudicpID09PSAnZGV2ZWxvcG1lbnQnID8gZXJyIDoge307XG5cbiAgLy8gcmVuZGVyIHRoZSBlcnJvciBwYWdlXG4gIHJlcy5zdGF0dXMoZXJyLnN0YXR1cyB8fCA1MDApO1xuICByZXMucmVuZGVyKCdlcnJvcicpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwO1xuIl19