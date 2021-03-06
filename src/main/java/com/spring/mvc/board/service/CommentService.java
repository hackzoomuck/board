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

  public Comment find(int id) {
    return commentMapper.findComment(id);
  }

  public List<Comment> findAll(int postId) {
    return commentMapper.findAllComment(postId);
  }

  public Boolean modify(Comment comment) {
    if (Boolean.TRUE.equals(checkPwd(comment.getId(), comment.getPassword()))) {
      commentMapper.updateComment(comment);
      return true;
    } else {
      return false;
    }
  }

  public Boolean delete(int id, String password) {
    if (Boolean.TRUE.equals(checkPwd(id, password))) {
      commentMapper.deleteComment(id);
      return true;
    } else {
      return false;
    }
  }

  public Boolean checkPwd(int id, String password) {
    return passwordEncoder.matches(password, commentMapper.findPwdById(id));
  }
}
