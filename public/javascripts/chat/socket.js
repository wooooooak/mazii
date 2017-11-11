$('.enter-chat').click(function(e){
    //val을 출력하면 하나만 출력되지만 사실 val은 배열이다. 따라서 each해줘야 함
    let val = $(this).parent().parent().find('.user-picture').find('input');
    $(this).parent().parent().parent().parent().addClass('selected-chat');

    let user = []; //해당 post의 채팅 참여자가 담긴 배열
    val.each(function(index,val){
        user[index]=$(this).val();
    });
    console.log(user);
    let roomId = $(this).parent().find('input').val();
    console.log('rommId : ' + roomId);

    $('#chat-room').html("");
    $('#chat-room').html(user);

    const socket = io.connect("http://localhost:3000");
    
    let output = {roomId : roomId,roomOwner : user[0]}

    socket.emit('enter',output);


})
