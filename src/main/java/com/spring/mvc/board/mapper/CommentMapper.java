package com.spring.mvc.board.mapper;

import com.spring.mvc.board.dto.Comment;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CommentMapper {

  void insertComment(@Param("comment") Comment comment);

  List<Comment> findComment(@Param("postId") int postId);

}
