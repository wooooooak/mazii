
$(function(){
    let city = $('.lead').html(); //도시이름 받아옴.
    // console.log('성공 이제 ajax로 데이터 넘겨받자.');
    $('.input-group.date').datepicker({
        calendarWeeks: false,
        todayHighlight: true,
        autoclose: true,
        format: "yyyy/mm/dd",
        language: "kr"
    });

    let startDate = $('#startDate').val();
    let endDate = $('#endDate').val();
    let cityName = $('#cityName').val();

    //도시 이름으로 처음 들어 갔을때 모든 도시 데이터 받아오기
        $.ajax({
            type:"GET",
            url:'/api/post/getAllPostByCityName/'+cityName,
            // data:{
            //     startDate:startDate,
            //     endDate:endDate,
            //     city : cityName
            // }
            dataType : "json",
        }).success((data)=>{
            console.log("ajax communication success");
            console.log(data)
        }).fail((err)=>{
            console.dir(err);
            alert(err);
        });


});

// $('#datePicker-search').click(()=>{
//     //사용자가 날짜를 누르면 그에 맞는 날짜를 보여주자
//  //여기서 ajax로 api 값을 받아오자
// });
// $('#datePicker-write').click(()=>{
//     let startDate = $('#startDate').val();
//     let endDate = $('#endDate').val();
//     if(!startDate || !endDate){
//         alert('날짜를 입력해주세요');
//     }else{

        // $.ajax({
        //     type:"POST",
        //     url:'/toPostPages',
        //     data:{
        //         startDate:startDate,
        //         endDate:endDate
        //     }
        // }).done(()=>{
        //     alert("ss");
        // }).fail(()=>{
        //     alert("fail");
        // })
//     }
// });