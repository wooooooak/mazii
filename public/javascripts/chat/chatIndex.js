$('.chatReqAcceptBtn').click(function(e){

    let reqUserId =  $(this).parent().find('input[type="hidden"][id="reqUserId"]').val();
    let postId =  $(this).parent().find('input[type="hidden"][id="postId"]').val();
    let alarmId =  $(this).parent().find('input[type="hidden"][id="alarmId"]').val();
    console.log(alarmId);
    $.ajax({
        type:"POST",
        url:'/api/alarm/reqAccept',
        data:{
            reqUserId:reqUserId,
            postId:postId,
            alarmId:alarmId
        },
        dataType : "json",
    }).success(data=>{
        console.log(data);
    }).fail((err)=>{
        console.log(err);
    })
    $(this).addClass('hide');
});

//mongoose에서 받아온 date형식을 보기 편하게 변경
$('.chat-StartDay').each(function(index) {
// console.log($(this));
    $(this).text(Array.from($(this).text()).slice(4,15).join(''));
});
$('.chat-EndDay').each(function(index) {
    $(this).text(Array.from($(this).text()).slice(4,15).join(''));
});
$('.popularContent').each(function(index) {
    $(this).html($(this).text());
});