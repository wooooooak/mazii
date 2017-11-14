const socket = io.connect("http://localhost:8081");
let userEmail;
let roomId;
function setSocket(){
    $('.btn-enter-chat').click(function(e){
        let roomOwner = $(this).parent().find('input').val();
        userEmail = $('#userEmail').text().trim();
        console.log(userEmail);
        roomId = $(this).parent().parent().parent().find('.hide').text();
        console.log('rommId : ' + roomId);

        $('.chat_box').html('');
        socket.emit('leave',roomId);
        //방장하고 로그인 유저만 넘겨주자 id랑
        let output = {roomId : roomId,roomOwner : roomOwner, userEmail:userEmail}

        socket.emit('enter',output);
    })

    $('.md-input').keypress(function(event){
        
        if (event.keyCode == 13){
            let message = $(this).val();
            let msgOutput = {};
            console.log("보낼 메시지 = "+message);
            msgOutput['message'] = message;
            msgOutput['senderEmail'] = userEmail;
            msgOutput['roomId'] = roomId;
            console.log("message와 함께 서버에 보낼 데이터 = ");
            console.log(msgOutput);
            $(this).val('');
            
            socket.emit('message',msgOutput);
        }
    });

    socket.on('message',output=>{
        console.log('받은데이터');
        console.log(output);
        let whoSendClass = ''
        if(output.userEmail==userEmail){
            whoSendClass = 'chat_message_right';
        }
        appendChatBox(whoSendClass,output);
    })
    
    socket.on('initChatRoom',messages=>{
        console.log(messages);
        messages.forEach(message=>{
            if(message.userEmail == userEmail){
                appendChatBox('chat_message_right',message);
            }else{
                appendChatBox('',message);
            }
        })
    
    })
}


function appendChatBox(whoSendClass,output){
    $('.chat_box').append(
        ` <div class="chat_message_wrapper ${whoSendClass}">
        <div class="chat_user_avatar">
            <a href="https://web.facebook.com/iamgurdeeposahan" target="_blank" >
            <img alt="Gurdeep Osahan (Web Designer)" title="Gurdeep Osahan (Web Designer)"  src="${output.imgUrl}" class="md-user-image">
            </a>
        </div>
        <ul class="chat_message">
            <li>
                <p> ${output.messageBody}<span class="chat_message_time">${output.created_at}</span> </p>
            </li>
        </ul>
    </div>`
    )
}