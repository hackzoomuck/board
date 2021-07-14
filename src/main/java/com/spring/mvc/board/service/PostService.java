package com.spring.mvc.board.service;

import com.spring.mvc.board.dto.Post;
import com.spring.mvc.board.dto.Search;
import com.spring.mvc.board.mapper.PostMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostService {

  private final PostMapper postMapper;
  private final PasswordEncoder passwordEncoder;

  public void register(Post post) {
    post.setPassword(passwordEncoder.encode(post.getPassword()));
    postMapper.insertPost(post);
  }

  public void modify(Post post) {
    postMapper.updatePost(post);
  }

  public void delete(Post post) {
    postMapper.deletePost(post);
  }

  public List<Post> find(Search search) {
    return postMapper.findPost(search);
  }

  public Post detail(int postId) {
    return postMapper.findByPostId(postId);
  }

  public String checkPwd(int postId, String password) {
    if (!passwordEncoder.matches(password, postMapper.findPwdByPostId(postId))) {
      return "fail";
    } else {
      return "success";
    }
  }
}
