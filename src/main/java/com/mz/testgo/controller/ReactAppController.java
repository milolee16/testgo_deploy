package com.mz.testgo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReactAppController {


    // application.properties에서 ant_path_matcher를 사용하도록 설정했으므로, 이전 방식의 간단한 패턴을 사용합니다.
    @GetMapping(value = {"/", "/{path:[^\\.]*}", "/**/{path:[^\\.]*}"})
    public String forward() {
        return "forward:/index.html";
    }

}