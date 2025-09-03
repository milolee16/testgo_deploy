import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BoardForm from '../components/board/BoardForm.jsx';
import { getBoard, createBoard, updateBoard } from '../api/boardApi';

const WritePage = () => {
  const { id } = useParams(); // URL에 id가 있으면 수정 모드
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    // 수정 모드일 경우, 기존 게시글 데이터를 불러옵니다.
    if (isEdit) {
      const fetchBoard = async () => {
        try {
          const response = await getBoard(id);
          setInitialData(response.data);
        } catch (error) {
          console.error('게시글 정보를 불러오는 데 실패했습니다.', error);
          alert('게시글 정보를 찾을 수 없습니다.');
          navigate('/');
        }
      };
      fetchBoard();
    }
  }, [id, isEdit, navigate]);

  const handleSubmit = async (formData) => {
    try {
      if (isEdit) {
        await updateBoard(id, { title: formData.title, content: formData.content });
        alert('수정되었습니다.');
        navigate(`/board/${id}`);
      } else {
        const response = await createBoard(formData);
        alert('작성되었습니다.');
        navigate(`/board/${response.data}`); // 생성된 게시글의 ID를 받아 상세 페이지로 이동
      }
    } catch (error) {
      console.error('저장에 실패했습니다.', error);
      alert('저장에 실패했습니다.');
    }
  };

  // 수정 모드인데 아직 데이터 로딩이 안됐으면 로딩 표시
  if (isEdit && !initialData) return <div>로딩 중...</div>;

  return <BoardForm onSubmit={handleSubmit} initialData={initialData} isEdit={isEdit} />;
};

export default WritePage;