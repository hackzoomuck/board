$(document).ready(function (){
  $.ajax({
    url: '/api/board/detail',
    type: 'get',
    dataType: 'json',
    data:{'postId':$("#detailPostId").val()},
    success:function (data){
     $("#detailTitle").append(data.title);
     $("#detailContent").append(data.content);
    }
  })
})
