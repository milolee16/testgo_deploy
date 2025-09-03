package com.mz.testgo.controller;

import com.mz.testgo.dto.BoardResponseDto;
import com.mz.testgo.entity.Board;
import com.mz.testgo.repository.BoardRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequestMapping("/ml")
@RestController
public class MLController {

    private final RestTemplate restTemplate;
    private final BoardRepository boardRepository;

    public MLController(RestTemplate restTemplate, BoardRepository boardRepository) {
        this.restTemplate = restTemplate;
        this.boardRepository = boardRepository;
    }

    @GetMapping
    public ResponseEntity<String> hello() {
        String flaskUrl = "http://192.168.0.22:5000/ml"; // Flask endpoint
        String response = restTemplate.getForObject(flaskUrl, String.class);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/test1")
    public ResponseEntity<String> test1() {
        // DB에서 모든 게시판 글 조회
        List<Board> posts = boardRepository.findAll();

        // Flask로 보낼 JSON 생성
        List<String> texts = posts.stream().map(Board::getContent).collect(Collectors.toList());

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("texts", texts);
        String flaskUrl = "http://192.168.0.22:5000/ml/test1"; // Flask endpoint

// POST 요청용 HttpHeaders 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

// 요청 본문 포함
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

// POST 요청으로 Flask 호출
        String response = restTemplate.postForObject(flaskUrl, entity, String.class);
        return ResponseEntity.ok(response);
    }
}
