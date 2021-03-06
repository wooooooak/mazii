$('.input-group.date').datepicker({
    calendarWeeks: false,
    todayHighlight: true,
    autoclose: true,
    format: "yyyy/mm/dd",
    language: "kr"
});

$(function(){

    let city = $('.lead').html(); //도시이름 받아옴.
    // console.log('성공 이제 ajax로 데이터 넘겨받자.');

    let startDate = $('#startDate').val();
    let endDate = $('#endDate').val();
    let cityName = $('#cityName').val();

    //도시 이름으로 처음 들어 갔을때 모든 도시 데이터 받아오기
        $.ajax({
            type:"GET",
            url:'/api/post/getAllPostByCityName/'+cityName,
            dataType : "json",
        }).success((data)=>{
            console.log(data);
            showPost(data);
            
        }).then(()=>{
            //비동기성 때문에 만약 success에서 데이터를 받아온 직후에click이벤트를 설정하면 
            //데이터가 생성되기도 전에 설정되는거라 delete-btn이 뭔지 모른다.
            //당연히 데이터를 받아오기 이전에 해도 안된다.
            setDeleteBtn(cityName);
            setSocket();
            $(function(){
                $(".addClass").click(function () {
                  $('.sidebar_secondary').addClass('popup-box-on');
                    });
                  
                    $(".removeClass").click(function () {
                  $('.sidebar_secondary').removeClass('popup-box-on');
                    });
                })
        })
        .fail((err)=>{
            alert(err);
        });

});


$(document).on('click', '.like-review', function(e) {
    $(this).html('<i class="fa fa-comments" aria-hidden="true"></i> 승낙 대기중');
    $(this).children('.fa-comments').addClass('animate-like');
    let postId =  e.target.parentNode.parentNode.parentNode.getElementsByTagName("span")[2].innerHTML;
    $.ajax({
        type:"PUT",
        url:'/api/post/chatRequest/'+postId,
        dataType : "text",
    }).success(data=>{
        console.log(data);
    }).fail(err=>{
        console.log(err);
    })
});



$('#datePicker-search').click((e)=>{
    console.log($('#cityName').val());
    $.ajax({
        type:"POST",
        url:'/api/post/getAllBetweenDate',
        data:{
            cityName:$('#cityName').val(),
            startDate:$('#startDate').val(),
            endDate:$('#endDate').val()
        },
        dataType : "json",
    }).success(data=>{
        console.log(data);
        showPost(data);
    }).fail((err)=>{
        alert(err);
    })
})