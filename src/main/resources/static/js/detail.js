var DETAIL = DETAIL || {};

(function () {
  DETAIL = {
    init: function (postId) {
      const self = this;
      const $app = $("#app");
      $(document).ready(function () {
        const template = `<div class="container">
                          <h2 style="text-align: center; margin-top: 30px">상세 페이지</h2>
                          <div class="input-group mb-3" style="margin-top: 30px">
                            <span class="input-group-text">제목</span>
                            <input type="text" class="form-control" aria-label="title" id="detailTitle" disabled>
                          </div>
                          <div class="input-group mb-3">
                            <span class="input-group-text">내용</span>
                            <textarea class="form-control" aria-label="content" id="detailContent" disabled></textarea>
                          </div>
                          <div style="text-align: center; margin-top: 30px">
                            <button type="button" class="btn btn-secondary" id="listButton">목록</button>
                            <button type="button" class="btn btn-secondary" id="modifyButton">수정</button>
                            <button type="button" class="btn btn-secondary" id="deleteButton">삭제</button>
                          </div>
                        </div>`
        $app.empty();
        $app.append(template);
        self.getPost(postId);
        self.event(postId)
      })
    },
    getPost: function (postId) {
      $.get("/api/board/detail", {'postId': postId})
      .done(function (data) {
        $("#detailTitle").val(data.title);
        $("#detailContent").append(data.content);
      })
    },
    event: function (postId) {
      $("#listButton").on("click", function () {
        LIST.init();
      });
      $("#modifyButton").on("click", function () {
        MODIFY.init(postId);
      });
      $("#deleteButton").on("click", function () {
        if (window.confirm("삭제하시겠습니까?")) {
          $.post("/api/board/modify", {postId: postId})
          .done(function () {
            alert("삭제되었습니다.")
            LIST.init();
          })
        }
      });
    }
  }
})()


