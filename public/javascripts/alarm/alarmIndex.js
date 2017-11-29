$('.chatReqAcceptBtn').click(function(e){
    
        let reqUserId =  $(this).parent().find('input[type="hidden"][id="reqUserId"]').val();
        let postId =  $(this).parent().find('input[type="hidden"][id="postId"]').val();
        let alarmId =  $(this).parent().find('input[type="hidden"][id="alarmId"]').val();
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
        $(this).parent().addClass('hide');

    });
    
$('time').attr('datetime',function(index,time){
    
    let day = time.slice(8,10);
    let month = time.slice(4,7);
    
    $(this).children(".day").text(day);
    $(this).children(".month").text(month);

});

$('.chatReqRefuseBtn').click(function(e){
    let alarmId =  $(this).parent().find('input[type="hidden"][id="alarmId"]').val();
    $.ajax({
        type:"POST",
        url:'/api/alarm/reqRefuse',
        data:{
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