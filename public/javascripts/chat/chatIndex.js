$(function(){
    $(".addClass").click(function () {
      $('.sidebar_secondary').addClass('popup-box-on');
        });
      
    $(".removeClass").click(function () {
      console.log("채팅방 나감");
      $('.sidebar_secondary').removeClass('popup-box-on');
    });
        
})

