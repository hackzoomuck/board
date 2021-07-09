var MODIFY = MODIFY || {};

(function () {
  MODIFY = {
    init: function (postId) {
      const self = this;
      const $app = $("#app");
      $(document).ready(function () {
        const template = `<div class="container">
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
        $app.empty();
        $app.append(template);
        self.getPrePost(postId);
        REGISTER.validate();
        self.event(postId);
      })
    },

    getPrePost: function (postId) {
      const self = this;
      $.get(`/api/board/${postId}`)
      .done(function (data) {
        let inputContent = data.content.replaceAll('&#60;', '<')
        .replaceAll('&#62;', '>');
        $("#inputTitle").val(data.title);
        $("#inputContent").val(inputContent);
        self.variable.preInputTitle = data.title;
        self.variable.preInputContent = inputContent;
      })
    },

    updatePost: function (postId) {
      let inputContentVal = $("#inputContent").val();
      inputContentVal = inputContentVal.replaceAll('<', '&#60;'); //replace 호출 함수
      inputContentVal = inputContentVal.replaceAll('>', '&#62;');
      $.ajax({
        url: "/api/board",
        type: "PUT",
        data: {
          postId: postId,
          title: $("#inputTitle").val(),
          content: inputContentVal
        }
      })
      .done(function () {
        alert("수정되었습니다.");
        DETAIL.init(postId);
      });
    },

    event: function (postId) {
      const self = this;
      $("#modifyButton").on("click", function (event) {
        const $inputTitle = $("#inputTitle");
        const $inputContent = $("#inputContent");
        const $errorTitle = $("#errorTitle");
        const $errorContent = $("#errorContent");
        let check = true;

        if ($inputTitle.val().length === 0) {
          $errorTitle.text("제목을 입력해주세요.");
          check = false;
          event.preventDefault();
        }
        if ($inputContent.val().length === 0) {
          $errorContent.text("내용을 입력해주세요.");
          check = false;
          event.preventDefault();
        }
        if (check === true) {
          self.updatePost(postId);
        }
      });

      $("#cancelButton").on("click", function () {
        if (self.variable.preInputTitle !== $("#inputTitle").val()
            || self.variable.preInputContent !== $("#inputContent").val()) {
          if (window.confirm("변경된 내용을 저장하지 않고 나가시겠습니까?")) {
            DETAIL.init(postId);
          }
        } else {
          DETAIL.init(postId);
        }
      });
    },

    variable: {
      preInputTitle: '',
      preInputContent: ''
    }
  }
})()
