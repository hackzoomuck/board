var MODIFY = MODIFY || {};

(function () {
  MODIFY = {
    init: function (postId) {
      alert("modify");
      $("#app > *").remove();
      $(document).ready(function () {
        let template = `<div class="container">
                          <h2 style="text-align: center; margin-top: 30px">게시물 수정</h2>
                            <div class="input-group mb-3" style="margin-top: 30px">
                              <span class="input-group-text">제목</span>
                              <input type="text" class="form-control" aria-label="title" placeholder="제목을 입력하세요." aria-describedby="basic-addon1" id="inputTitle">
                            </div>
                            <div id="errorTitle" style="color: red"></div>
                            <div class="input-group mb-3">
                              <span class="input-group-text">내용</span>
                              <textarea class="form-control" aria-label="content" placeholder="내용을 입력하세요." id="inputContent"></textarea>
                            </div>
                            <div id="errorContent" style="color: red"></div>
                            <div style="text-align: center; margin-top: 30px">
                            <button type="button" class="btn btn-secondary" id="modifyButton">수정</button>
                            <button type="button" class="btn btn-secondary" id="cancelButton">취소</button>
                            </div>
                        </div>`
        $("#app").append(template);
        MODIFY.preDataAjax(postId);
        MODIFY.event(postId);
      })
    },
    preDataAjax: function (postId) {
      $.ajax({
        url: '/api/board/detail',
        type: 'get',
        data: {'postId': postId},
        dataType: 'json',
        success: function (data) {
          $("#inputTitle").val(data.title);
          $("#inputContent").val(data.content);
        }
      })
    },
    event: function (postId) {
      $("#modifyButton").on("click", function () {
        alert("수정버튼 클릭");
        $.post("/api/board/modify", {
          postId: postId,
          title: $("#inputTitle").val(),
          content: $("#inputContent").val()
        })
        .done(function () {
          alert("수정되었습니다.");
          DETAIL.init(postId);
        })
      });
      $("#cancelButton").on("click", function () {
        DETAIL.init(postId);
      });
    },
    validate: function (postId) {
    },
  }
})()
