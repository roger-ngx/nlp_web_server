const { random } = require('lodash');

const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', socket => {
  socket.on('thanhnguyen', message => {
    console.log('received: %s', message);
  });
  socket.handshake.query.id && (socket.id = socket.handshake.query.id);

  socket.emit('thanhnguyen', socket.handshake.query.id);

  console.log(socket.handshake.query.id);

  setInterval(() => {
    socket.emit('thanhnguyen-realtime-test', random(100));
  }, 1000);
});

httpServer.listen(8052);

module.exports = io;