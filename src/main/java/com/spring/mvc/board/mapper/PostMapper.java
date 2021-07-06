package com.spring.mvc.board.mapper;

import com.spring.mvc.board.dto.Post;
import com.spring.mvc.board.dto.Search;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PostMapper {
  List<Post> findAll();
  List<Post> findByAll(@Param("postAll") String postAll);
  List<Post> findByTitle(@Param("title") String title);
  List<Post> findByContent(@Param("content") String content);

  List<Post> findPost(@Param("search") Search search);
  Post findByPostId(@Param("postId") int postId);
}
