package com.spring.mvc.board.controller;

import com.spring.mvc.board.dto.Post;
import com.spring.mvc.board.dto.Search;
import com.spring.mvc.board.service.PostService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/board")
public class BoardController {

  private final PostService postService;


  @GetMapping
  public List<Post> search(Search search) {
    return postService.find(search);
  }

  @GetMapping("/{postId}")
  public Post detail(@PathVariable int postId) {
    return postService.detail(postId);
  }

  @GetMapping("/checkPwd")
  public String checkPwd(int postId, String password) {
    return postService.checkPwd(postId, password);
  }

  @PostMapping
  public void register(Post post) {
    postService.register(post);
  }

  @PutMapping
  public void modify(Post post) {
    postService.modify(post);
  }

  @DeleteMapping
  public void delete(Post post) {
    postService.delete(post);
  }


}
