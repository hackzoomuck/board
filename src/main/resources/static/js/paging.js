var PAGING = PAGING || {};

(function () {
  PAGING = {
    /**
     * TODO
     * PAGING
     * 1.paging.js를 만들고, paging.js -> list.js 조회된 전체 데이터를 가져온 뒤에 그것을 클라이언트쪽에서 paging 에 맞게 그려주기.
     * 2.paging - init func
     * : 1) LIST.init() 1 페이지, '번호, 제목, 내용' 아래를 지워주고 1 ~ listSize 목록을 붙인다.
     * : 2) 현재 index 에 해당하는 Paging 부분을 그려준다.
     * 3.이전, 다음, 맨 앞으로, 맨 뒤로 버튼
     */
    init: function () {
      const self = this;
      const $pageNav = $("#pageNav");
      const template = `<ul class="pagination justify-content-center" id="pageUl"></ul>`
      $pageNav.empty();
      $pageNav.add(template);
    },
    setStartEndPage: function () {
    },
    params: {
      pageNumber: 1,
      startPageNumber: '',
      endPageNumber: '',
      totalEndPageNumber: '',
      totalCount: '',
      pageSize: 3
    },
  }
})()
