package com.mz.testgo.repository;

import com.mz.testgo.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // 이 인터페이스가 Spring Data JPA의 Repository임을 명시합니다. (선택 사항이지만 명확성을 위해 추가)
public interface BoardRepository extends JpaRepository<Board, Long> {
    // JpaRepository<T, ID>
    // T: Entity 클래스 (Board)
    // ID: Entity의 ID 타입 (Long)
}