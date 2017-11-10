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
})