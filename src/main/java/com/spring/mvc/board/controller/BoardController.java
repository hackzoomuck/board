package com.spring.mvc.board.controller;

import com.spring.mvc.board.dto.Post;
import com.spring.mvc.board.dto.Search;
import com.spring.mvc.board.service.PostService;
import com.spring.mvc.board.service.SearchService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/board")
public class BoardController {

  private final SearchService searchService;
  private final PostService postService;

  @GetMapping("/search")
  public List<Post> search(Search search) {
    return searchService.find(search);
  }

  @GetMapping("/detail")
  public Post detail(int postId) {
    return searchService.detailPost(postId);
  }

  @PostMapping("/register")
  public void register(Post post) {
    postService.register(post);
  }

  @PostMapping("/modify")
  public void modify(Post post) {
    postService.modify(post);
  }
}
