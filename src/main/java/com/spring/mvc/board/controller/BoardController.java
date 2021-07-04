package com.spring.mvc.board.controller;

import com.spring.mvc.board.dto.Post;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class BoardController {

  @RequestMapping("/board")
  public String board(){
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
