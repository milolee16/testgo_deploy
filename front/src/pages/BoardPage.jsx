import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BoardList from '../components/board/BoardList';
import Pagination from '../components/board/Pagination.jsx';
import { getBoards } from '../api/boardApi';

const BoardPage = () => {
  // pageData는 백엔드에서 받은 Page 객체 전체를 저장합니다.
  const [pageData, setPageData] = useState({ content: [], totalPages: 0 });
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호 (0부터 시작)

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        // API 호출 시 page와 size를 파라미터로 전달합니다.
        const response = await getBoards({ page: currentPage, size: 10 });
        setPageData(response.data);
      } catch (error) {
        console.error('게시글 목록을 불러오는 데 실패했습니다.', error);
        alert('게시글 목록을 불러오는 데 실패했습니다.');
      }
    };
    fetchBoards();
  }, [currentPage]); // currentPage가 변경될 때마다 API를 다시 호출합니다.

  return (
    <div>
      <Link to="/write">
        <button style={{ float: 'right' }}>글쓰기</button>
      </Link>
      <h2>게시글 목록</h2>
      <BoardList boards={pageData.content} />
      <Pagination currentPage={currentPage} totalPages={pageData.totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default BoardPage;