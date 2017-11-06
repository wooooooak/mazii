
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
            dataType : "json",
        }).success((data)=>{
            console.log("ajax communication success");
            let arrayCnt = data.data.length;
            console.dir(data);

            let left_side_flag=false;
            let center_side_flag=false;
            let right_side_flag=false;

            data.data.forEach((post,index)=>{
                // console.log(a+"!================12212121212");
                if(index%3===0){
                    if(left_side_flag){
                        $('#left_side').append(
                            '<div class="feed-card fadeInDown">'+
                            '<div class="feed-panel-header"> <img src="'+post.author.facebook.picture.data.url+'" class="img-circle"/>  '+post.author.name+'</div>'+
                            '<a href="#"><div class="feed-panel-body">'+
                              post.content+
                            '</div></a>'+
                            '<div class="feed-panel-footer">좋아요  채팅</div>'+
                          '</div>'
                        );
                    }else{
                        console.log(post);
                        //false상태, 즉 한번도 center에추가된적이 없으면 html하기
                        $('#left_side').html(
                            '<div class="feed-card fadeInDown">'+
                            '<div class="feed-panel-header"> <img src="'+post.author.facebook.picture.data.url+'" class="img-circle"/>  '+post.author.name+'</div>'+
                            '<a href="#"><div class="feed-panel-body">'+
                              post.content+
                            '</div></a>'+
                            '<div class="feed-panel-footer">좋아요  채팅</div>'+
                          '</div>'
                        );
                        left_side_flag=true;
                        console.log('여기는 평생 한번만 실행되야함');
                    }
                }else if(index%3===1 && index!==0){
                    if(center_side_flag){
                        //append하고
                        $('#center_side').append(
                            '<div class="feed-card fadeInDown">'+
                            '<div class="feed-panel-header"> <img src="'+post.author.facebook.picture.data.url+'" class="img-circle"/>  '+post.author.name+'</div>'+
                            '<a href="#"><div class="feed-panel-body">'+
                              post.content+
                            '</div></a>'+
                            '<div class="feed-panel-footer">좋아요  채팅</div>'+
                          '</div>'
                        );
                    }else{
                        //false상태, 즉 한번도 center에추가된적이 없으면 html하기
                        $('#center_side').html(
                            '<div class="feed-card fadeInDown">'+
                            '<div class="feed-panel-header"> <img src="'+post.author.facebook.picture.data.url+'" class="img-circle"/>  '+post.author.name+'</div>'+
                            '<a href="#"><div class="feed-panel-body">'+
                              post.content+
                            '</div></a>'+
                            '<div class="feed-panel-footer">좋아요  채팅</div>'+
                          '</div>'
                        );
                        center_side_flag=true;
                    }
                }else if(index%3===2 && index!==0){
                    if(right_side_flag){
                        //append하고
                        $('#right_side').append(
                            '<div class="feed-card fadeInDown">'+
                            '<div class="feed-panel-header"> <img src="'+post.author.facebook.picture.data.url+'" class="img-circle"/>  '+post.author.name+'</div>'+
                            '<a href="#"><div class="feed-panel-body">'+
                              post.content+
                            '</div></a>'+
                            '<div class="feed-panel-footer">좋아요  채팅</div>'+
                          '</div>'
                        );
                    }else{
                        //false상태, 즉 한번도 right에추가된적이 없으면 html하고
                        // true로 바꾸기
                        $('#right_side').html(
                            '<div class="feed-card fadeInDown">'+
                            '<div class="feed-panel-header"> <img src="'+post.author.facebook.picture.data.url+'" class="img-circle"/>  '+post.author.name+'</div>'+
                            '<a href="#"><div class="feed-panel-body">'+
                              post.content+
                            '</div></a>'+
                            '<div class="feed-panel-footer">좋아요  채팅</div>'+
                          '</div>'
                        );
                        right_side_flag=true;
                    }
                }

            })

        }).fail((err)=>{
            console.dir(err);
            alert(err);
        });
});

(function($) {
    
      /**
       * Copyright 2012, Digital Fusion
       * Licensed under the MIT license.
       * http://teamdf.com/jquery-plugins/license/
       *
       * @author Sam Sehnert
       * @desc A small plugin that checks whether elements are within
       *     the user visible viewport of a web browser.
       *     only accounts for vertical position, not horizontal.
       */
    
      $.fn.visible = function(partial) {
        
          var $t            = $(this),
              $w            = $(window),
              viewTop       = $w.scrollTop(),
              viewBottom    = viewTop + $w.height(),
              _top          = $t.offset().top,
              _bottom       = _top + $t.height(),
              compareTop    = partial === true ? _bottom : _top,
              compareBottom = partial === true ? _top : _bottom;
        
        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
    
      };
        
    })(jQuery);
    
    var win = $(window);
    
    var allMods = $(".panel");
    
    allMods.each(function(i, el) {
      var el = $(el);
      if (el.visible(true)) {
        el.addClass("already-visible"); 
      } 
    });
    
    win.scroll(function(event) {
      
      allMods.each(function(i, el) {
        var el = $(el);
        if (el.visible(true)) {
          el.addClass("come-in"); 
        } 
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