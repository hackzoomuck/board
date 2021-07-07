package com.spring.mvc.board.service;

import com.spring.mvc.board.dto.Post;
import com.spring.mvc.board.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegisterService {

  private final PostMapper postMapper;

  public void register(Post post) {
    postMapper.insertPost(post);
  }
}
