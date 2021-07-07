var LIST = LIST || {};

(function () {
  LIST = {
    init: function () {
      const self = this;
      const template = `<h2 style="text-align: center; margin-top: 30px">게시판</h2>
                      <form>
                        <div class="input-group mb-3"
                             style="width: 600px; margin-left: auto; margin-right: auto;margin-top: 30px">
                          <select class="form-select form-select-sm " aria-label=".form-select-sm" name="postItem"
                                  id="postItem">
                            <option value="postAll">전체</option>
                            <option value="title">제목</option>
                            <option value="content">내용</option>
                          </select>
                          <input type="text" class="form-control" placeholder="검색어를 입력해주세요." name="postItemValue"
                                 aria-label="inputSearch" id="postItemValue">
                          <button class="btn btn-outline-secondary" type="button" id="searchButton">검색</button>
                          <button class="btn btn-outline-secondary" type="button" id="searchAllButton">전체검색</button>
                        </div>
                      </form>
                      <div class="container" style="margin-top: 30px; margin-left: auto; margin-right: auto;">
                        <div class="row">
                          <div class="col">
                            번호
                          </div>
                          <div class="col">
                            제목
                          </div>
                          <div class="col">
                            내용
                          </div>
                        </div>
                      </div>
                      <button type="button" class="btn btn-secondary"
                              style="margin-top: 20px; margin-left: 20px; margin-bottom: 5%" id="registerButton">등록
                      </button>`;
      $("#app").empty();
      $("#app").append(template);
      $("#postItem").val(self.params.postItem);
      $("#postItemValue").val(self.params.postItemValue);
      LIST.event();
      LIST.ajax();
    },
    ajax: function () {
      const self = this;

      $.get('/api/board/search', $('form').serialize())
      .done(
          function (data) {
            let len = data.length;
            if (len === 0) {
              let div_str = `<div class=\"row\">
                         <p> <br> 검색된 내용이 없습니다.</p>
                         </div>`;
              $("div.container").append(div_str);
            }
            for (let i = len - 1; i >= 0; i--) {
              const postId = data[i].postId;
              const title = data[i].title;
              const content = data[i].content;
              let div_str = "<div class=\"row\">\n"
                  + "  <div class=\"col\">" + postId + "</div>\n"
                  + "  <div class=\"col\">" + title + "</div>\n"
                  + "  <div class=\"col\">" + content + "</div>\n"
                  + "  </div>";
              $("div.container").append(div_str);
            }
            LIST.detail();
          });
    },
    detail: function () {
      $("div.container > div.row:gt(1)").off().click(function () {
        DETAIL.init($(this).find("div.col:first-child").text());
      })
    },
    event: function () {
      const self = this;
      $("#searchButton").on("click", function () {
        $("div.container > div.row:gt(0)").remove();
        self.params.postItemValue = $("#postItemValue").val();
        self.params.postItem = $("#postItem").val();
        LIST.ajax();
      })
      $("#searchAllButton").on("click", function () {
        $("div.container > div.row:gt(0)").remove();
        $("#postItem").val("postAll");
        $("#postItemValue").val("");
        LIST.ajax();
      })
      $("#registerButton").on("click", function () {
        REGISTER.init();
      })
    },
    params: {
      postItem: 'postAll',
      postItemValue: ''
    }
  }
})()

LIST.init()


