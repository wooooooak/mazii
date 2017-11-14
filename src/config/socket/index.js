const socketio = require('socket.io');
const mongoose = require('mongoose');
const User = require('../../model/Users');
const Message = require('../../model/Messages');
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
        // console.dir(room);
    
        if(io.sockets.adapter.rooms[room.roomId]){
          console.log('방이 이미 만들어져 있습니다.');
        }else{
          console.log('방을 새로 만듭니다.');
        }

        socket.join(room.roomId);
        // io.sockets.adapter.rooms[room.roomId].Owner = room.roomOwner;
        
        console.log("room userEmail = "+room.userEmail);
        User.findOne({'email':room.userEmail}).exec((err,user)=>{
          if(err) console.log(err);
          let userEmail = user.email;
          let userUrl = user.facebook.picture.data.url;
          usersUrl[userEmail] = [userUrl,user.name];  
        });
        
        Message.find({'roomId':room.roomId}).exec((err,message)=>{
          console.log('message db 꺼');
          console.log(message);
        }).then(message=>{
          io.sockets.emit('initChatRoom',message);
        })
        

      });
    

      //된다 -> .open-btn.click 안에서 socket.on을 설정하지 않으니까 한번만 작동함 
      socket.on('message', msgOutput =>{
        console.log('message 실행 --- 서버 ');
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
              roomId : msgOutput.roomId,
              userEmail : email,
              imgUrl : imgUrl,
              userName : name,
              created_at : time,
              messageBody : message
            }

            let messageDB = new Message(output);

            messageDB.save((err,msg)=>{
              if(err) console.log("mssage.save() error 발생");
              console.log("메세지 db에 저장 완료");
              console.log(msg);
            })
           
            // console.log(output);
            //여기서 서버에 존재하는 모든 socket들이
            //roomId에 해당하는 방에 전부 메세지를 보내는것 같다.
            io.sockets.in(msgOutput.roomId).emit('message',output);
      })

      socket.on('leave',roomId=>{
        socket.leave(roomId);
        console.log('방을 나갔습니다.');

        console.dir(io.sockets.adapter.rooms);
      })


    });
}