
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
            console.log(data);
            showPost(data);
            
        }).then(()=>{
            //비동기성 때문에 만약 success에서 데이터를 받아온 직후에click이벤트를 설정하면 
            //데이터가 생성되기도 전에 설정되는거라 delete-btn이 뭔지 모른다.
            //당연히 데이터를 받아오기 이전에 해도 안된다.
            setDeleteBtn(cityName);
            
        })
        .fail((err)=>{
            alert(err);
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
});


(function($) {
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


