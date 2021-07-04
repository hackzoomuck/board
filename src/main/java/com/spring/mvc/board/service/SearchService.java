package com.spring.mvc.board.service;

import com.spring.mvc.board.dto.Post;
import com.spring.mvc.board.mapper.PostMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchService {

  private final PostMapper postMapper;

  public List<Post> find(String title) {
    return postMapper.findByTitle(title);
  }
}
