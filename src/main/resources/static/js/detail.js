var DETAIL = DETAIL || {};

(function () {
  DETAIL = {
    init: function (postId) {
      $("#app > *").remove();
      $(document).ready(function () {
        let template = `<h2 style="text-align: center; margin-top: 30px">상세 페이지</h2>
                        <div style="margin-left: 40%; margin-top: 30px">
                          <input type="hidden" id="detailPostId">
                          <p class="fw-normal" id="detailTitle">제목 : </p>
                          <p class="fw-normal" id="detailContent">내용 : </p>
                        </div>
                        <div style="text-align: center; margin-top: 30px">
                          <button type="button" class="btn btn-secondary" id="listButton">목록</button>
                          <button type="button" class="btn btn-secondary" id="modifyButton">수정</button>
                          <button type="button" class="btn btn-secondary" id="deleteButton">삭제</button>
                        </div>`
        $("#app").append(template);
        $.ajax({
          url: '/api/board/detail',
          type: 'get',
          dataType: 'json',
          data: {'postId': postId},
          success: function (data) {
            $("#detailTitle").append(data.title);
            $("#detailContent").append(data.content);
          }
        })
        $("#listButton").on("click", function () {
          DETAIL.listPage();
        })
        $("#modifyButton").on("click", function () {
          DETAIL.modifyPage(postId);
        })
        $("#deleteButton").on("click", function () {
          DETAIL.delete(postId);
        })
      })
    },

    listPage: function () {
      LIST.init();
    },

    modifyPage: function (postId) {
      MODIFY.init(postId);
    },

    delete: function (postId) {

    }
  }
})()


