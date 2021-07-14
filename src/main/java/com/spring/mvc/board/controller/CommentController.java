package com.spring.mvc.board.controller;

import com.spring.mvc.board.dto.Comment;
import com.spring.mvc.board.service.CommentService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/board/comment")
@RestController
@RequiredArgsConstructor
public class CommentController {

  private final CommentService commentService;

  @PostMapping()
  public void commentRegister(Comment comment) {
    commentService.register(comment);
  }

  @GetMapping("/{postId}")
  public List<Comment> commentSearch(@PathVariable int postId) {
    return commentService.find(postId);
  }
}
