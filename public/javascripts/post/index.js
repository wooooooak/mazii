function showPost(data){
    let loginUser;
    console.log("배열의 길이 "+ data.posts.length);
    let arrayCnt = data.posts.length; // 데이터 3개 이하로 남았을때를 위한 변수
    let left_side_flag=false;
    let center_side_flag=false;
    let right_side_flag=false;
    // console.log('side_flag = '+left_side_flag);
    let authorEmail = $('#userEmail').text().trim();
    // console.log('현재 로그인된 이메일 ' + authorEmail);
    data.posts.forEach((post,index)=>{
        let status = 'show';
        let chatTemp = '<button class="btn-secondary like-review">'+
        '<i class="fa fa-comments" aria-hidden="true"></i>채팅신청'+
    '</button>';
        if(data.user){
            post.chatWait.forEach((objectValue)=>{
                if(objectValue == data.user._id){
                    console.log("같습니다");
                    chatTemp = '<button class="btn-secondary like-review">'+
                    '<i class="fa fa-comments" aria-hidden="true"></i>채팅승낙 대기중'+
                '</button>'
                }
            })

            post.chatOk.forEach(objectValue=>{
                if(objectValue==data.user._id){
                    console.log("유저가 채팅 승락배열에 존재함");
                    chatTemp = '<button class="btn-secondary btn-enter-chat">'+
                    '<i class="fa fa-comments" aria-hidden="true"></i>채팅방 들어가기'+
                '</button>'
                }
            })
        }

        if(authorEmail!=post.author.email){
            status = 'hide';
        }else{
            //글 작성자는 chatOk배열에 없으므로 따로 처리해줌
            chatTemp = '<button class="btn-enter-chat">'+
            '<i class="fa fa-comments" aria-hidden="true"></i>채팅방 들어가기'+
        '</button>';
        }
        


        if(index%3===0){
            if(left_side_flag){
                $('.left_side').append(
                    postTemplate(post,status,chatTemp)
                );
            }else{
                //false상태, 즉 한번도 center에추가된적이 없으면 html하기
                $('.left_side').html(
                    postTemplate(post,status,chatTemp)
                );
                left_side_flag=true;
            }
        }else if(index%3===1 && index!==0){
            if(center_side_flag){
                //append하고
                $('.center_side').append(
                    postTemplate(post,status,chatTemp)
                );
            }else{
                $('.center_side').html(
                    postTemplate(post,status,chatTemp)
                );
                center_side_flag=true;
            }
        }else if(index%3===2 && index!==0){
            if(right_side_flag){
                $('.right_side').append(
                    postTemplate(post,status,chatTemp)
                );
            }else{
                $('.right_side').html(
                    postTemplate(post,status,chatTemp)
                );
                right_side_flag=true;
            }
        }
    }) //forEach문 끝


    delFirstLine(arrayCnt);
}

//삭제 시 첫번째줄에만 데이터가 남았을때 
// 삭제이후 데이터를 받아오면 삭제된 자리 side에는
//아무런 자극이 주어지지 않아서 인위적으로 변화시킴
function delFirstLine(arrayCnt){
    if(arrayCnt===2){
        //세번째 요소 삭제
        $('.right_side').html('');
    }else if(arrayCnt==1){
        $('.center_side').html('');
        $('.right_side').html('');
    }else if(arrayCnt==0){
        $('.left_side').html('');
        $('.center_side').html('');
        $('.right_side').html('');
        $('.center_side').html('<p class="text-center animated flash" style="color:red">찾으시는 데이터가 없습니다 ㅠ</p>');

    }
}

function postTemplate(post,status,chatTemp){

    
    return '<div class="feed-card rollIn">'+
    '<div class="feed-panel-header"> <img src="'
    +post.author.facebook.picture.data.url+'" class="img-circle aspect_1_1"/>'
    +post.author.name+'<span class="glyphicon glyphicon-remove delete-btn '+status+'" aria-hidden="true"></span>'+
    '<a href="/post/postModify/'+post._id+'"><span class="glyphicon glyphicon glyphicon-pencil modify-btn '+status+'"></span>'+
    '<span class="hide">'+post._id+'</span>'+
    '</div>'+
    '<a href="#"><div class="feed-panel-body">'+
      post.content+
    '</div></a>'+
    '<div class="feed-panel-footer">'+
        '<div class="like-content">'+
            chatTemp
        '</div>'+
    '</div>'+
  '</div>'
}



function setDeleteBtn(cityName){
    $('.delete-btn').click((event)=>{
        let $this = $(event.currentTarget)
        console.log(event.target.parentNode.getElementsByTagName("span")[2].innerHTML);
        let postId = event.target.parentNode.getElementsByTagName("span")[2].innerHTML;
        console.log($this.parent().parent());
        console.log($this.parent().parent().removeClass().addClass("animated bounce"));
        $.ajax({
            type:"DELETE",
            url:'/api/post/deleteById/'+cityName+'/'+postId,
            dataType : "json",
        }).success((data)=>{
            console.log("delete 하고난 뒤 : ---");
            console.log(data);
            showPost(data);
            setDeleteBtn(cityName);//이걸 또 추가하는게 효율적인지 모르겟다. 
        }).fail( err =>{
            console.log(err);
        })
    });
}