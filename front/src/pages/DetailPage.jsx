import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BoardDetail from '../components/board/BoardDetail';
import { getBoard, deleteBoard } from '../api/boardApi';

const DetailPage = () => {
  const { id } = useParams(); // URL 파라미터에서 게시글 ID를 가져옵니다.
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await getBoard(id);
        setBoard(response.data);
      } catch (error) {
        console.error('게시글을 불러오는 데 실패했습니다.', error);
        alert('게시글을 찾을 수 없습니다.');
        navigate('/'); // 에러 발생 시 목록 페이지로 이동
      }
    };
    fetchBoard();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await deleteBoard(id);
        alert('삭제되었습니다.');
        navigate('/');
      } catch (error) {
        console.error('삭제에 실패했습니다.', error);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  // 데이터 로딩 중일 때 표시할 내용
  if (!board) {
    return <div>로딩 중...</div>;
  }

  return <BoardDetail board={board} onEdit={() => navigate(`/edit/${id}`)} onDelete={handleDelete} onList={() => navigate('/board')} />;
};

export default DetailPage;