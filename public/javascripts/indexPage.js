    //mongoose에서 받아온 date형식을 보기 편하게 변경
    $('.popularRowStartDay').each(function(index) {
        // console.log($(this));
         $(this).text(Array.from($(this).text()).slice(4,15).join(''));
      });
      $('.popularRowEndDay').each(function(index) {
         $(this).text(Array.from($(this).text()).slice(4,15).join(''));
      });
      $('.popularContent').each(function(index) {
         $(this).html($(this).text());
      });