var express = require('express');
var app = express();
var http = require('http');
var debug = require('debug');
var path = require('path');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser = require('body-parser');
mongoose.Promise = require('bluebird').Promise;
var appRoot = '/client';
//var favicon = require('serve-favicon');
var index = require('./server/controller/index');
var pairsRouter = require('./server/controller/pairGroup');

var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

var server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

mongoose.connect('mongodb://localhost/pairGroup');

app.use(express.static(path.join(__dirname, 'client')));

app.use('/', index);
app.use('/pairs', pairsRouter);


app.listen(3000);
console.log('Running in %s mode', app.get('env'));

module.exports = app;


