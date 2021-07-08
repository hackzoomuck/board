var REGISTER = REGISTER || {};

(function () {
  REGISTER = {
    init: function () {
      const self = this;
      const $app = $("#app");
      $(document).ready(function () {
        const template = `<div class="container">
                          <h2 style="text-align: center; margin-top: 30px">게시물 등록</h2>
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
                            <button type="button" class="btn btn-secondary" id="registerButton">등록</button>
                            <button type="button" class="btn btn-secondary" id="cancelButton">취소</button>
                            </div>
                        </div>`
        $app.empty();
        $app.append(template);

        self.validate();
        self.event();
      })
    },
    event: function () {
      const self = this;
      $("#registerButton").on("click", function (event) {
        const $inputTitleValue = $("#inputTitle").val();
        const $inputContentValue = $("#inputContent").val();
        if ($inputTitleValue.length === 0) {
          $("#errorTitle").text("제목을 입력해주세요.")
          event.preventDefault();
        }
        if ($inputContentValue.length === 0) {
          $("#errorContent").text("내용을 입력해주세요.")
          event.preventDefault();
        }
        if ($inputTitleValue.length >= 1 && $inputContentValue.length >= 1) {
          self.insertPost();
        }
      });

      $("#cancelButton").on("click", function () {
        if ($("#inputTitle").val().length > 0 || $("#inputContent").val().length
            > 0) {
          if (window.confirm("입력한 내용을 저장하지 않고 나가시겠습니까?")) {
            LIST.init();
          }
        } else {
          LIST.init();
        }
      });
    },

    validate: function () {
      const $inputTitle = $("#inputTitle");
      const $errorTitle = $("#errorTitle");
      const $inputContent = $("#inputContent");
      const $errorContent = $("#errorContent");

      $inputTitle.on("input", function () {
        $errorTitle.text("");
        const inputTitleValue = $inputTitle.val();
        if (inputTitleValue[0] === " ") {
          $errorTitle.text("제목 맨 앞부분은 공백 없이 입력해주세요.")
        }
        if (inputTitleValue.length > 20) {
          $errorTitle.text("제목은 20글자 이하 입력 가능합니다.")
          $inputTitle.val(inputTitleValue.substring(0, 20));
        }
      });

      $inputContent.on("input", function () {
        $errorContent.text("");
        const inputContentValue = $inputContent.val();
        if (inputContentValue.length > 100) {
          $errorContent.text("내용은 100글자 이하 입력 가능합니다.")
          $inputContent.val(inputContentValue.substring(0, 100));
        }
      });
    },
    insertPost: function () {
      $.post("/api/board/register",
          {title: $("#inputTitle").val(), content: $("#inputContent").val()})
      .done(function () {
        alert("등록되었습니다.");
        LIST.params.postItem = 'postAll';
        LIST.params.postItemValue = '';
        LIST.init();
      })
    }
  }
})()
