package com.mz.testgo.service;

import com.mz.testgo.dto.BoardResponseDto;
import com.mz.testgo.dto.BoardSaveRequestDto;
import com.mz.testgo.dto.BoardUpdateRequestDto;
import com.mz.testgo.entity.Board;
import com.mz.testgo.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class BoardService {
    private final BoardRepository boardRepository;

    @Transactional
    public Long save(BoardSaveRequestDto requestDto) {
        return boardRepository.save(requestDto.toEntity()).getId();
    }

    @Transactional
    public Long update(Long id, BoardUpdateRequestDto requestDto) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        board.update(requestDto.getTitle(), requestDto.getContent());

        return id;
    }

    @Transactional(readOnly = true)
    public BoardResponseDto findById(Long id) {
        Board entity = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        return new BoardResponseDto(entity);
    }

    @Transactional(readOnly = true)
    public Page<BoardResponseDto> findAll(Pageable pageable) {
        // JpaRepository의 findAll(pageable)을 호출하면 페이징된 결과를 Page<Board> 형태로 반환합니다.
        // .map(BoardResponseDto::new)를 통해 Page<Board>를 Page<BoardResponseDto>로 변환하여 반환합니다.
        return boardRepository.findAll(pageable)
                .map(BoardResponseDto::new);
    }

    @Transactional
    public void delete(Long id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));
        boardRepository.delete(board);
    }
}