package com.mz.testgo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing // JPA Auditing 기능 활성화
@SpringBootApplication
public class TestgoApplication {

    public static void main(String[] args) {
        SpringApplication.run(TestgoApplication.class, args);
    }

}
