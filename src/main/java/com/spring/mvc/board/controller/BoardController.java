package com.spring.mvc.board.controller;

import com.spring.mvc.board.dto.Post;
import com.spring.mvc.board.dto.Search;
import com.spring.mvc.board.service.PostService;
import com.spring.mvc.board.service.SearchService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/board")
public class BoardController {

  private final SearchService searchService;
  private final PostService postService;

  @GetMapping
  public List<Post> search(Search search) {
    return searchService.find(search);
  }

  @GetMapping("/{postId}")
  public Post detail(@PathVariable int postId) {
    return searchService.detailPost(postId);
  }

  @PostMapping
  public void register(Post post) {
    postService.register(post);
  }

  @PutMapping
  public String modify(Post post) {
    postService.modify(post);
    return "success";
  }

  @DeleteMapping
  public void delete(Post post) {
    postService.delete(post);
  }
}
