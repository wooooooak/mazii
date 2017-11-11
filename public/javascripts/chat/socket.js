$('.enter-chat').click(function(e){
    let val = $(this).parent().parent().find('.user-picture').find('input');
    $(this).parent().parent().parent().parent().addClass('selected-chat');
    let user = []; //해당 post의 채팅 참여자가 담긴 배열
    val.each(function(index,val){
        user[index]=$(this).val();
    });
    console.log(user);



    $('#chat-room').html("");
    $('#chat-room').html(user);

    const socket = io.connect("http://localhost:3000");
    
    socket.on('enter', function(data) {
      console.log(data)
    });


})
