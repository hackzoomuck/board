package com.spring.mvc.board.mapper;

import com.spring.mvc.board.dto.Post;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PostMapper {
  List<Post> findByTitle(@Param("title") String title);
}