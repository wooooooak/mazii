const socket = io.connect("http://localhost:8081");
let userEmail = $('.userEmail').text();
let roomId;
$('.open-btn').click(function(e){
    //val을 출력하면 하나만 출력되지만 사실 val은 배열이다. 따라서 each해줘야 함
    let val = $(this).parent().parent().find('.user-picture').find('input');
    $(this).parent().parent().parent().parent().addClass('selected-chat');
    console.log("여러 클라이언트에서 실행될라나? 아니네");
    let user = []; //해당 post의 채팅 참여자가 담긴 배열
    val.each(function(index,val){
        user[index]=$(this).val();
    });
    console.log(user);
    roomId = $(this).parent().find('input').val();
    console.log('rommId : ' + roomId);

    //사용자가 종료버튼을 누르지않고 바로 다음 채팅방을 누르는경우가 있으므로
    //일단 버튼을 누르면 대화중이던 방을 나가자
    
    $('.chat_box').html('');
    socket.emit('leave',roomId);
    socket.emit('disconnect');
    //방장하고 로그인 유저만 넘겨주자 id랑
    let output = {roomId : roomId,roomOwner : user[0],userEmail:userEmail}

    socket.emit('enter',output);




    $('.leave-btn').click(function(){
        socket.emit('leave',roomId);
        socket.emit('disconnect');
    })

 

})

// 이 메서드만 여러번 일어난다ㅏ.
$('.md-input').keypress(function(event){
    let output;
    if (event.keyCode == 13){
        let message = $(this).val();
        console.log(message);
        let msgOutput ={};
        console.log("보낼 메시지 = "+message);
        msgOutput['message'] = message;
        msgOutput['senderEmail'] = userEmail;
        msgOutput['roomId'] = roomId;
        console.log("message와 함께 서버에 보낼 데이터");
        console.log(msgOutput);
        
        $(this).val('');
        socket.emit('message',msgOutput);

    }
});

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
                <p> ${output.message}<span class="chat_message_time">${output.time}</span> </p>
            </li>
        </ul>
    </div>`
    )
});