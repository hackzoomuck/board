package com.spring.mvc.board.service;

import com.spring.mvc.board.dto.Comment;
import com.spring.mvc.board.mapper.CommentMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

  private final CommentMapper commentMapper;
  private final PasswordEncoder passwordEncoder;

  public void register(Comment comment) {
    comment.setPassword(passwordEncoder.encode(comment.getPassword()));
    commentMapper.insertComment(comment);
  }

  public List<Comment> find(int postId) {
    return commentMapper.findComment(postId);
  }
//
//  public void modify(Post post) {
//    commentMapper.updatePost(post);
//  }
//
//  public void delete(Post post) {
//    commentMapper.deletePost(post);
//  }

}
