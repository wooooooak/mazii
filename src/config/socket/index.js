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
        
        console.log("room userEmail = "+room.userEmail);
        User.findOne({'email':room.userEmail}).exec((err,user)=>{
          if(err) console.log(err);
          let userEmail = user.email;
          let userUrl = user.facebook.picture.data.url;
          usersUrl[userEmail] = [userUrl,user.name];  
        }).then(user=>{
          // console.log('userEmail : userUrl  --------->');
          // console.log(usersUrl);
        });
        
        
        let curRoom = io.sockets.adapter.rooms[room.roomId];

        // console.dir(curRoom);

        
        // console.dir(io.sockets.adapter.rooms);
      });
    
      socket.on('message', msgOutput =>{
            // console.log("msgOutput : -------------");
            // console.log(msgOutput);
            let email;
            let imgUrl;
            let name;
            let time = moment().format("h:mm:ss a"); 
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

            io.sockets.in(msgOutput.roomId).emit('message',output);
      })


    });
}