import React from 'react';
import BoardItem from './BoardItem.jsx';

const BoardList = ({ boards }) => {
  if (!boards || boards.length === 0) {
    return <div>게시글이 없습니다.</div>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead style={{ backgroundColor: '#f2f2f2' }}>
        <tr>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>번호</th>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>제목</th>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>작성자</th>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>작성일</th>
        </tr>
      </thead>
      <tbody>
        {boards.map((board) => (
          <BoardItem key={board.id} board={board} />
        ))}
      </tbody>
    </table>
  );
};

export default BoardList;