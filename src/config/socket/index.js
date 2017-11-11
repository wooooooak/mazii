const socketio = require('socket.io');

//소켓에 대한 소스코드 부분
module.exports = function(server){

    const io = socketio.listen(server);
    console.log('socket.io 요청을 받아들일 준비 완료');
    
    let chatRooms=[]; //
    
    //클라이언트 소켓이 연결되었을떄
    io.sockets.on('connection', (socket) => {
      console.log('socket 요청 됨');
    
      socket.on('disconnect', () => {
        console.log('disconnected');
      });
    
      //사용자가 대화하기 버튼을 눌렀을때. room:{roomId:postId,roomOwner:글쓴이 이메일}
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
        
        // console.dir(io.sockets.adapter.rooms);
      });
    
    });
}