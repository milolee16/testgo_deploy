package com.mz.testgo.controller;

import com.mz.testgo.dto.BoardResponseDto;
import com.mz.testgo.dto.BoardSaveRequestDto;
import com.mz.testgo.dto.BoardUpdateRequestDto;
import com.mz.testgo.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/boards") // 공통된 URL 경로 설정
public class BoardApiController {

    private final BoardService boardService;

    // 게시글 생성 API
    @PostMapping
    public ResponseEntity<Long> save(@RequestBody BoardSaveRequestDto requestDto) {
        return ResponseEntity.ok(boardService.save(requestDto));
    }

    // 게시글 수정 API
    @PutMapping("/{id}")
    public ResponseEntity<Long> update(@PathVariable Long id, @RequestBody BoardUpdateRequestDto requestDto) {
        return ResponseEntity.ok(boardService.update(id, requestDto));
    }

    // 게시글 단건 조회 API
    @GetMapping("/{id}")
    public ResponseEntity<BoardResponseDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(boardService.findById(id));
    }

    // 게시글 목록 조회 API (페이징 적용)
    @GetMapping
    public ResponseEntity<Page<BoardResponseDto>> findAll(@PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(boardService.findAll(pageable));
    }

    // 게시글 삭제 API
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boardService.delete(id);
        return ResponseEntity.ok().build();
    }
}