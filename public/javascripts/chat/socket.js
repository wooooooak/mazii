$('.open-btn').click(function(e){
    //val을 출력하면 하나만 출력되지만 사실 val은 배열이다. 따라서 each해줘야 함
    let val = $(this).parent().parent().find('.user-picture').find('input');
    $(this).parent().parent().parent().parent().addClass('selected-chat');

    let userEmail = $('.userEmail').text();
    let user = []; //해당 post의 채팅 참여자가 담긴 배열
    val.each(function(index,val){
        user[index]=$(this).val();
    });
    console.log(user);
    let roomId = $(this).parent().find('input').val();
    console.log('rommId : ' + roomId);


    const socket = io.connect("http://localhost:8081");
    
    let output = {roomId : roomId,roomOwner : user[0],userEmail:userEmail}

    socket.emit('enter',output);


    $('.md-input').keypress(function(event){
        
        if (event.keyCode == 13){
            let message = $(this).val();
            let msgOutput = output;
            console.log("보낼 메시지 = "+message);
            msgOutput['message'] = message;
            msgOutput['senderEmail'] = userEmail;
            msgOutput['roomId'] = roomId;
            console.log("message와 함께 서버에 보낼 데이터"+msgOutput);

            socket.emit('message',msgOutput);
        }
    })

    socket.on('message',output=>{
        console.log('받은데이터');
        console.log(output);
        let whoSendClass = ''
        if(output.email==userEmail){
            whoSendClass = 'chat_message_right';
        }

        $('.chat_box').append(
            ` <div class="chat_message_wrapper ${whoSendClass}">
            <div class="chat_user_avatar">
                <a href="https://web.facebook.com/iamgurdeeposahan" target="_blank" >
                <img alt="Gurdeep Osahan (Web Designer)" title="Gurdeep Osahan (Web Designer)"  src="${output.imgUrl}" class="md-user-image">
                </a>
            </div>
            <ul class="chat_message">
                <li>
                    <p> Lorem ipsum dolor sit amet.<span class="chat_message_time">${output.time}</span> </p>
                </li>
            </ul>
        </div>`
        )


    })

})
