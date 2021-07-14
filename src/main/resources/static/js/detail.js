import LIST from "./list.js";
import MODIFY from "./modify.js";

const DETAIL = {
  init: function (postId) {
    const self = this;
    const $app = $("#app");
    $(".modal-backdrop").remove();
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
                            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" 
                            data-bs-target="#passwordModal" id="modifyButton">수정</button>
                            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" 
                            data-bs-target="#passwordModal" id="deleteButton">삭제</button>
                            <div class="modal fade" id="passwordModal" tabindex="-1" aria-labelledby="passwordModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="updateModalLabel">비밀번호를 입력해주세요.</h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="cancel"></button>
                                </div>
                                <div class="modal-body">
                                  <input type="password" class="form-control" aria-label = "password" id="inputPassword">
                                </div>
                                <div id="errorPassword" style="color: red"></div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                                  <button type="button" class="btn btn-primary" id="passwordButton">확인</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="input-group" style="margin-top: 15px">
                            <textarea class="form-control" placeholder="댓글을 입력하세요." id="content" aria-label="comment" aria-describedby="button-addon2"></textarea>
                          </div>
                          <div class="input-group">
                            <input type="text" aria-label="nickname" class="form-control" placeholder="닉네임" id="nickname">
                            <input type="password" aria-label="commentPassword" class="form-control" placeholder="비밀번호" id="commentPassword">
                            <button class="btn btn-outline-secondary" type="button" id="commentButton">등록</button>
                          </div>
                          <div class="commentDiv" style="margin-top: 15px"></div>
                          </div>
                        </div>`
      $app.empty();
      $app.append(template);
      self.getPost(postId);
      self.event(postId);
      self.getComments(postId);
    })
  },
  getPost: function (postId) {
    $.get(`/api/board/${postId}`)
    .done(function (data) {
      $("#detailTitle").val(data.title);
      $("#detailContent").append(data.content);
    })
  },
  getComments: function (postId) {
    $.get(`/api/board/comment/${postId}`, {postId: postId})
    .done(function (data) {
      const len = data.length;
      for (let i = 0; i < len; i++) {
        const nickname = data[i].nickname;
        const content = data[i].content;
        const div_str = `<div class="row" style="border: 0.5px solid darkgrey;">
                            <div class="col">${nickname} <br> ${content}</div>
                            <div class="col" style="margin-top: 10px">
                                  <button type="button" class="btn btn-secondary btn-sm">수정</button>
                                  <button type="button" class="btn btn-primary btn-sm">삭제</button>
                            </div>
                         </div>`;
        $("div.commentDiv").append(div_str);
      }
    });
  },
  event: function (postId) {
    $("#listButton").on("click", function () {
      LIST.init();
    });
    $("#modifyButton").on("click", function (event) {
      const $inputPassword = $("#inputPassword");
      $inputPassword.val('');
      $inputPassword.on("input", function () {
        $("#errorPassword").text("");
      })
      $("#passwordButton").on("click", function () {
        $.get(`/api/board/checkPwd`,
            {postId: postId, password: $("#inputPassword").val()})
        .done(
            function (data) {
              if (data === "success") {
                MODIFY.init(postId);
              } else {
                $("#errorPassword").text("비밀번호가 일치하지 않습니다.");
              }
            })
      })
    });
    $("#deleteButton").on("click", function () {
      const $inputPassword = $("#inputPassword");
      $inputPassword.val('');
      $inputPassword.on("input", function () {
        $("#errorPassword").text("");
      })
      $("#passwordButton").on("click", function () {
        $.get(`/api/board/checkPwd`,
            {postId: postId, password: $inputPassword.val()})
        .done(
            function (data) {
              if (data === "success") {
                $.ajax({
                  url: "/api/board",
                  type: "DELETE",
                  data: {postId: postId}
                })
                .done(function () {
                  alert("삭제되었습니다.")
                  LIST.init();
                })
              } else {
                $("#errorPassword").text("비밀번호가 일치하지 않습니다.");
              }
            })
      })
    });
    $("#commentButton").on("click", function () {
      $.post(`/api/board/comment`,
          {
            postId: postId,
            content: $("#content").val(),
            password: $("#commentPassword").val(),
            nickname: $("#nickname").val()
          })
      .done(function () {
        $("#content").val('');
        $("#commentPassword").val('');
        $("#nickname").val('');
        $("div.commentDiv").empty();
        DETAIL.getComments(postId);
      })
    })
  }
}
export default DETAIL;


