package com.mz.testgo.controller;

import com.mz.testgo.dto.GoogleUserInfo;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/app")
@RestController
public class AppController {

    @PostMapping("/data")
    public String data(@RequestBody GoogleUserInfo googleUserInfo) {
        System.out.println("enter..");
        System.out.println(googleUserInfo);
        return "data";
    }

}
