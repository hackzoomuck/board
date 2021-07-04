package com.spring.mvc.board.controller;

import com.spring.mvc.board.dto.Post;
import com.spring.mvc.board.service.SearchService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/board")
public class RestBoardController {

  private final SearchService searchService;

  @GetMapping("/find")
  public List<Post> find() {
    System.out.println("내놔"+searchService.find("ti"));
    return searchService.find("ti");
  }

}
