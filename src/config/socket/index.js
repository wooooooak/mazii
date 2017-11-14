const socketio = require('socket.io');
const mongoose = require('mongoose');
const User = require('../../model/Users');
const moment = require('moment');


//소켓에 대한 소스코드 부분
module.exports = function(server){

    const io = socketio.listen(server);
    console.log('socket.io 요청을 받아들일 준비 완료');
    
    let usersUrl={}; //
    
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
        io.sockets.adapter.rooms[room.roomId].Owner = room.roomOwner;
        
        console.log("room userEmail = "+room.userEmail);
        User.findOne({'email':room.userEmail}).exec((err,user)=>{
          if(err) console.log(err);
          let userEmail = user.email;
          let userUrl = user.facebook.picture.data.url;
          usersUrl[userEmail] = [userUrl,user.name];  
        });
        
        
        // console.dir(io.sockets.adapter.rooms);
        // console.log("clients ---");
        // console.log(io.sockets.clients());
        
      });
    

      //메시지 부분이 자꾸 여러번이 실행이 되네
      //한번 메세지를 보내고
      //다른 포스트를 눌러서 새로운 메시지를 보내면
      //두번 보내지고... 계속 반복됨
      //위의 enter는 분명 한번만되는데..
      //그리고 메세지를 보낸 포스트의 아이디를 자꾸 기억해서
      //다음에 다른 포스트에 대해서 채팅을 할때 이전 포스트의 아이디에 대해서도
      //메세지를 자꾸 보낸다..
      //클라이언트에서도 한번만 실행되는데 왜 서버에서 여러번 실행될까?
      //아.... 클라이언트에선 하나만 보내지만
      //서버에 존재하는 소켓들 모두가 message 에 반응한다면
      //여러번 될수도 있겟다.
      //서버 이상이아니라 클라이언트에서 class로 선택해서
      //여러개 message를 보내는 것 같다.
      //이제 클라이언트에서는 한번만 보낸다..
      //서버도 한번만 실행되는데 왜 클라이언트에서는 또 똑같은 데이터를 여러개 받지?
      //된다 -> .open-btn.click 안에서 socket.on을 설정하지 않으니까 한번만 작동함 
      socket.on('message', msgOutput =>{
        console.log('message 실행 --- 서버 ');
            // console.log("msgOutput : -------------");
            // console.log(msgOutput);
            let email;
            let imgUrl;
            let name;
            let time = moment().format("h:mm a"); 
            let message = msgOutput.message;
            for(let key in usersUrl){
              if(key==msgOutput.senderEmail){
                email = key;
                imgUrl = usersUrl[key][0];
                name = usersUrl[key][1];
              }
            }
            let output={
              email : email,
              imgUrl : imgUrl,
              name : name,
              time : time,
              message : message
            }
           
            // console.log(output);
            //여기서 서버에 존재하는 모든 socket들이
            //roomId에 해당하는 방에 전부 메세지를 보내는것 같다.
            console.log(msgOutput.roomId);
            io.sockets.in(msgOutput.roomId).emit('message',output);
      })

      socket.on('leave',roomId=>{
        socket.leave(roomId);
        console.log('방을 나갔습니다.');

        console.dir(io.sockets.adapter.rooms);
      })


    });
}