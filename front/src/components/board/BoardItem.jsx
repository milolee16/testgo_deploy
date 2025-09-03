import React from 'react';
import { Link } from 'react-router-dom';

const BoardItem = ({ board }) => {
  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // 'YYYY. MM. DD.' 형식으로 변환
  };

  return (
    <tr style={{ textAlign: 'center' }}>
      <td style={{ padding: '8px', border: '1px solid #ddd' }}>{board.id}</td>
      <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>
        <Link to={`/board/${board.id}`} style={{ textDecoration: 'none', color: 'black' }}>{board.title}</Link>
      </td>
      <td style={{ padding: '8px', border: '1px solid #ddd' }}>{board.writer}</td>
      <td style={{ padding: '8px', border: '1px solid #ddd' }}>{formatDate(board.createdDate)}</td>
    </tr>
  );
};

export default BoardItem;