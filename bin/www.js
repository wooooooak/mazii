#!/usr/bin/env node

/**
 * Module dependencies.
 */
const socketio = require('socket.io');
const app = require('../app');
const debug = require('debug')('mazii:server');
const http = require('http');


/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log('서버가 실행되었습니다.');

const io = socketio.listen(server);
console.log('socket.io 요청을 받아들일 준비 완료');

let chatRooms=[]; //

io.sockets.on('connection', (socket) => {

  console.log('socket 요청 됨');

  socket.on('disconnect', () => {
    console.log('disconnected');
  });

  socket.on('enter', room => {
    console.log('enter 이벤트 받음');
    console.dir(room);

    if(io.sockets.adapter.rooms[room.roomId]){
      console.log('방이 이미 만들어져 있습니다.');
    }else{
      console.log('방을 새로 만듭니다.');
    }

    socket.join(room.roomId);
    
    let curRoom = io.sockets.adapter.rooms[room.roomId];
    curRoom.id = room.roomId;
    curRoom.owner = room.roomOwner;
    
    console.dir(io.sockets.adapter.rooms);


  });

});

/**
 * Normalize a port into a number, string, or false.
 */

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

/**
 * Event listener for HTTP server "error" event.
 */

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

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
