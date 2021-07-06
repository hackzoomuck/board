package com.spring.mvc.board.service;

import com.spring.mvc.board.dto.Post;
import com.spring.mvc.board.dto.Search;
import com.spring.mvc.board.mapper.PostMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchService {

  private final PostMapper postMapper;

  public List<Post> find(Search search) {
    if("".equals(search.getPostItemValue())){
      return postMapper.findAll();
    }
    else if("postAll".equals(search.getPostItem())){
      return postMapper.findByAll(search.getPostItemValue());
    }
    else if("title".equals(search.getPostItem())){
      return postMapper.findByTitle(search.getPostItemValue());
    }
    else if("content".equals(search.getPostItem())){
      return postMapper.findByContent(search.getPostItemValue());
    }
    return postMapper.findAll();
  }

  public Post detailPost(int postId){
    return postMapper.findByPostId(postId);
  }
}
