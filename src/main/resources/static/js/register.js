var REGISTER = REGISTER || {};

(function () {
  REGISTER = {
    init: function () {
      $("#app > *").remove();
      $(document).ready(function () {
        let template = `<div class="container">
                      <h2 style="text-align: center; margin-top: 30px">게시물 등록</h2>
                      <div class="input-group mb-3" style="margin-top: 30px">
                        <span class="input-group-text">제목</span>
                        <input type="text" class="form-control" aria-label="title" placeholder="제목을 입력하세요." aria-describedby="basic-addon1">
                      </div>
                      <div class="input-group mb-3">
                        <span class="input-group-text">내용</span>
                        <textarea class="form-control" aria-label="content" placeholder="내용을 입력하세요."></textarea>
                      </div>
                      <div class="input-group mb-3">
                        <span class="input-group-text">비밀번호</span>
                        <input type="text" class="form-control" aria-label="title" placeholder="비밀번호 입력하세요." aria-describedby="basic-addon1">
                      </div>
                      <div class="input-group mb-3">
                        <span class="input-group-text">비밀번호 확인</span>
                        <input type="text" class="form-control" aria-label="title" placeholder="비밀번호 재입력하세요." aria-describedby="basic-addon1">
                      </div>
                      <div style="text-align: center; margin-top: 30px">
                      <button type="button" class="btn btn-secondary">등록</button>
                      <button type="button" class="btn btn-secondary" id="cancelButton">취소</button>
                      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
                      </div>
                    </div>`
        $("#app").append(template);
        REGISTER.cancel();
      })
    },
    cancel: function () {
      $("#cancelButton").on("click", function () {
        LIST.init();
      })
    }
  }
})()
