package com.spring.mvc.board.controller;

import com.spring.mvc.board.dto.Post;
import com.spring.mvc.board.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@Controller
public class BoardController {

  private final SearchService searchService;

  @RequestMapping("/board")
  public String board(Model model){
    model.addAttribute("post", searchService.find("title2"));
    return "board";
  }

  @GetMapping("/register")
  public String register(Model model){
    model.addAttribute(new Post());
    return "register";
  }

  @GetMapping("/detail")
  public String detail(){
    return "detail/detail";
  }
}
