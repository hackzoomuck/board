import LIST from "./list.js";
import MODIFY from "./modify.js";

const DETAIL = {
  init: function (postId) {
    const self = this;
    const $app = $("#app");
    $(document).ready(function () {
      const template = `<div class="container">
                          <h2 style="text-align: center; margin-top: 30px">상세 페이지</h2>
                          <div id="detailUpdateDate" style="text-align: right">업데이트 : </div>
                          <div class="input-group mb-3" style="margin-top: 5px">
                            <span class="input-group-text">제목</span>
                            <input type="text" class="form-control" aria-label="title" id="detailTitle" disabled>
                          </div>
                          <div class="input-group mb-3">
                            <span class="input-group-text">내용</span>
                            <div class="form-control" aria-label="content" id="detailContent" style="background-color:#e8ebed; width:500px; height:82px; resize: both"></div>
                          </div>
                          <div style="text-align: center; margin-top: 30px">
                            <button type="button" class="btn btn-secondary" id="listButton">목록</button>
                            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" 
                            data-bs-target="#passwordModal" id="modifyButton">수정</button>
                            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" 
                            data-bs-target="#passwordModal" id="deleteButton">삭제</button>
                            
                            <div class="input-group" style="margin-top: 15px">
                              <textarea class="form-control" placeholder="댓글을 입력하세요." id="content" aria-label="comment" aria-describedby="button-addon2"></textarea>
                            </div>
                            <div class="input-group">
                              <input type="text" aria-label="nickname" class="form-control" placeholder="닉네임" id="nickname">
                              <input type="password" aria-label="commentPassword" class="form-control" placeholder="비밀번호" id="commentPassword">
                              <button class="btn btn-outline-secondary" type="button" id="commentButton">등록</button>
                            </div>
                            <div class="commentDiv" style="margin-top: 15px"></div>
                            <div class="modal fade" id="modifyModal" tabindex="-1" aria-labelledby="modifyModalLabel" aria-hidden="true">
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="updateModalLabel">댓글을 수정하세요.</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="cancel"></button>
                                  </div>
                                  <div class="modal-body">
                                    <textarea class="form-control" aria-label ="commentContentModal" id="commentContentModal" placeholder="댓글을 입력하세요."></textarea>
                                    <input type="password" class="form-control" aria-label="commentPasswordModal" id="commentPasswordModal" placeholder="비밀번호 입력하세요.">
                                  </div>
                                  <div id="errorCommentPassword" style="color: red"></div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                                    <button type="button" class="btn btn-primary" id="commentPasswordButton">확인</button>
                                  </div>
                                </div>
                              </div>
                            </div>
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
      $("#detailContent").empty().append(data.content);
      $("#detailUpdateDate").empty().append(
          "업데이트 날짜 :" + data.updateDate.substring(0, 10));
    })
  },
  getComments: function (postId) {
    $("div.commentDiv").empty();
    $.get(`/api/board/comment/${postId}`, {postId: postId})
    .done(function (data) {
      const len = data.length;
      for (let i = 0; i < len; i++) {
        const commentId = data[i].id;
        const nickname = data[i].nickname;
        const content = data[i].content;
        const recommentId = "re" + data[i].id;
        const div_str = `<div class="row" style="border: 0.5px solid darkgrey;" id="${commentId}" >
                            <div class="col-" style="font-size: smaller; text-align: left; margin-top: 3px">닉네임 : ${nickname}</div>
                            <div class="col-9" style="text-align: left;">${content}</div>
                            <div class="md col-" style="text-align: right">
                                  <button type="button" class="btn btn-secondary btn-sm" value="commentModifyButton" name="${commentId}" data-bs-toggle="modal" 
                            data-bs-target="#modifyModal">수정</button>
                                  <button type="button" class="btn btn-primary btn-sm" value="commentDeleteButton" name="${commentId}" data-bs-toggle="modal" 
                            data-bs-target="#passwordModal">삭제</button>
                            </div>
                            <div class="col" style="text-align: left; margin-bottom: 5px">
                              <button type="button" class="btn btn-secondary btn-sm" value="recommentButton" name="${commentId}">답글</button>
                            </div>
                            <div id="${recommentId}" style="border: 0.5px solid darkgrey; background-color: lightgray;"></div>
                         </div>`;
        $("div.commentDiv").append(div_str);
      }
      DETAIL.commentDetail(postId);
    });
  },
  commentDetail: function (postId) {
    $("div.md > button[value|='commentDeleteButton']").on("click",
        function () {
          const commentID = $(this).attr('name');
          $("#errorPassword").text("");
          const $inputPassword = $("#inputPassword");
          $inputPassword.val('');
          $inputPassword.on("input", function () {
            $("#errorPassword").text("");
          })
          $("#passwordButton").off().on("click", function () {
            $.ajax({
              url: "/api/board/comment",
              type: "DELETE",
              data: {id: commentID, password: $inputPassword.val()}
            })
            .done(function (data) {
              if (data) {
                alert("삭제되었습니다.")
                $(".modal").hide();
                $(".modal-backdrop").remove();
                DETAIL.getComments(postId);
              } else {
                $("#errorPassword").text("비밀번호가 일치하지 않습니다.");
              }
            })
          })
        });
    $("div.md > button[value|='commentModifyButton']").on("click",
        function () {
          const commentID = $(this).attr('name');

          $("#errorCommentPassword").text("");
          const $commentPasswordModal = $("#commentPasswordModal");
          $commentPasswordModal.val('');
          $commentPasswordModal.on("input", function () {
            $("#errorCommentPassword").text("");
          })
          $.get(`/api/board/comment`, {id: commentID})
          .done(function (data) {
            $("#commentContentModal").val(data.content);
          })
          $("#commentPasswordButton").off().on("click", function () {
            $.ajax({
              url: "/api/board/comment",
              type: "PUT",
              data: {
                id: commentID,
                content: $("#commentContentModal").val(),
                password: $("#commentPasswordModal").val()
              }
            })
            .done(function (data) {
              if (data) {
                alert("수정되었습니다.")
                $(".modal").hide();
                $(".modal-backdrop").remove();
                DETAIL.getComments(postId);
              } else {
                $("#errorCommentPassword").text("비밀번호가 일치하지 않습니다.");
              }
            })
          })
        });
    $("div.col > button[value|='recommentButton']").off().on("click",
        function () {
          const commentID = $(this).attr('name');
          const recommentID = "re" + commentID
          const recommentTemplate = `
                                      <div class="input-group" style="margin-top: 15px">
                                        <textarea class="form-control" placeholder="댓글을 입력하세요." id="content" aria-label="comment" aria-describedby="button-addon2"></textarea>
                                      </div>
                                      <div class="input-group" style="margin-bottom: 15px"> 
                                       <input type="text" aria-label="nickname" class="form-control" placeholder="닉네임" id="nickname">
                                        <input type="password" aria-label="commentPassword" class="form-control" placeholder="비밀번호" id="commentPassword">
                                        <button class="btn btn-outline-secondary" type="button" id="commentButton">등록</button>
                                      </div>
                                      <div class="closedComment" style="cursor: pointer; text-align: center; border-top: 0.5px solid darkgrey; color: dimgrey" name="${recommentID}">답글접기 ∧ </div>
                                    `
          $("#" + recommentID).empty().append(recommentTemplate);
          $("div.closedComment").on("click",
              function () {
                $("#" + $(this).attr('name')).empty();
              });
        });
  },
  event: function (postId) {
    $("#listButton").on("click", function () {
      LIST.init();
    });
    $("#modifyButton").on("click", function () {
      $("#errorPassword").text("");
      const $inputPassword = $("#inputPassword");
      $inputPassword.val('');
      $inputPassword.on("input", function () {
        $("#errorPassword").text("");
      })
      $("#passwordButton").off().on("click", function () {
        $.get(`/api/board/checkPwd`,
            {postId: postId, password: $("#inputPassword").val()})
        .done(
            function (data) {
              if (data) {
                $(".modal").hide();
                $(".modal-backdrop").remove();
                MODIFY.init(postId);
              } else {
                $("#errorPassword").text("비밀번호가 일치하지 않습니다.");
              }
            })
      })
    });
    $("#deleteButton").on("click", function () {
      $("#errorPassword").text("");
      const $inputPassword = $("#inputPassword");
      $inputPassword.val('');
      $inputPassword.on("input", function () {
        $("#errorPassword").text("");
      })
      $("#passwordButton").off().on("click", function () {
        $.ajax({
          url: "/api/board",
          type: "DELETE",
          data: {postId: postId, password: $inputPassword.val()}
        })
        .done(function (data) {
          if (data) {
            alert("삭제되었습니다.")
            $(".modal").hide();
            $(".modal-backdrop").remove();
            LIST.init();
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
    });
  }
}
export default DETAIL;


