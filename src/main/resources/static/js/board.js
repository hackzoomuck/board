$(document).ready(function () {
  function searchPost() {
    $.ajax({
      url:'/api/board/search',
      type:'get',
      dataType:'json',
      data:$('form').serialize(),
      success:function (data){
        let len = data.length;
        if(len===0) {
          let div_str = `<div class=\"row\">
                         <p> <br> 검색된 내용이 없습니다.</p>
                         </div>`;
          $("div.container").append(div_str);
        }
        for(let i=0; i<len; i++){
          const postId = data[i].postId;
          const title = data[i].title;
          const content = data[i].content;
          let div_str = "<div class=\"row\">\n"
              + "  <div class=\"col\">"+postId+"</div>\n"
              + "  <div class=\"col\">"+title+"</div>\n"
              + "  <div class=\"col\">"+content+"</div>\n"
              + "  </div>";
          $("div.container").append(div_str);
        }
      }
    })
  }
  searchPost();
  $('#searchButton').click(function () {
    $("div.container > div.row:gt(0)").remove();
    searchPost()
  })

  $("#searchAllButton").click(function () {
    $("div.container > div.row:gt(0)").remove();
    $("#postItem").val("postAll");
    $("#postItemValue").val("");
    searchPost()
  })

  $("div.container > div.row:gt(1)").click(function () {
    alert("click!");
  })

})
