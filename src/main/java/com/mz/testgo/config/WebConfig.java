package com.mz.testgo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Controller
public class WebConfig{
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

//@Bean
//public WebMvcConfigurer corsConfigurer() {
//    return new WebMvcConfigurer() {
//        @Override
//        public void addCorsMappings(CorsRegistry registry) {
//            registry.addMapping("/**")
//                    .allowedOrigins("http://localhost:5173")
//                    .allowedMethods("*")
//                    .allowCredentials(true);
//        }
//    };
//}
}
