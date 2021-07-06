package com.spring.mvc.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class BoardController {

  @GetMapping("/board")
  public String board() {
    return "board";
  }

  @GetMapping("/register")
  public String register() {
    return "register";
  }

  @GetMapping("/detail/{postId}")
  public String detail(@PathVariable int postId, Model model) {
    model.addAttribute("postId", postId);
    return "/detail/detail";
  }
}
