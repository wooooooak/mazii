
const socket = io.connect("http://123.248.53.76:8081"); // 자취방
// const socket = io.connect("http://118.223.229.56:8081/"); // 장유 유선 랜
// const socket = io.connect("http://localhost:8081");
let userEmail = $('.userEmail').text();
let roomId;

function appendChatBox(whoSendClass,output){
    let emailId = output.userEmail.slice(0,output.userEmail.indexOf('@'));
    console.log(output);
    $('.chat_box').append(
        ` <div class="chat_message_wrapper ${whoSendClass}" style="overflow:auto">
        <div class="chat_user_avatar">
            <a href="https://facebook.com/${emailId}" target="_blank" >
            <img src="${output.imgUrl}" class="md-user-image">
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

$('.open-btn').click(function(e){
    //val을 출력하면 하나만 출력되지만 사실 val은 배열이다. 따라서 each해줘야 함
    let val = $(this).parent().parent().find('.user-picture').find('input');
    $(this).parent().parent().parent().addClass('selected-chat');
    let user = []; //해당 post의 채팅 참여자가 담긴 배열
    val.each(function(index,val){
        user[index]=$(this).val();
    });
    roomId = $(this).parent().find('input').val();

    //사용자가 종료버튼을 누르지않고 바로 다음 채팅방을 누르는경우가 있으므로
    //일단 버튼을 누르면 대화중이던 방을 나가자
    
    $('.chat_box').html('');
    socket.emit('leave',roomId);
    socket.emit('disconnect');

    //방장하고 로그인 유저만 넘겨주자 id랑
    let output = {roomId : roomId,roomOwner : user[0],userEmail:userEmail}

    socket.emit('enter',output);

})

$('.leave-btn').click(function(){
    socket.emit('leave',roomId);
})

$('.md-input').keypress(function(event){
    let output;
    if (event.keyCode == 13){
        let message = $(this).val();
        let msgOutput ={};
        msgOutput['message'] = message;
        msgOutput['senderEmail'] = userEmail;
        msgOutput['roomId'] = roomId;
        
        $(this).val('');
        socket.emit('message',msgOutput);

    }
});

socket.on('message',output=>{
    // console.log(output);
    let whoSendClass = ''
    if(output.userEmail==userEmail){
        whoSendClass = 'chat_message_right';
    }
    appendChatBox(whoSendClass,output)
    $('.chat_box_small').scrollTop($('.chat_box').prop('scrollHeight'));
});

socket.on('initChatRoom',messages=>{
    messages.forEach(message=>{
        if(message.userEmail == userEmail){
            appendChatBox('chat_message_right',message);
        }else{
            appendChatBox('',message);
        }
    })
    $('.chat_box_small').scrollTop($('.chat_box').prop('scrollHeight'));
})

