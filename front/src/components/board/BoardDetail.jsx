import React from 'react';

const BoardDetail = ({ board, onEdit, onDelete, onList }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
      <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
        <h2>{board.title}</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888' }}>
          <span>작성자: {board.writer}</span>
          <span>작성일: {formatDate(board.createdDate)}</span>
        </div>
      </div>

      <div style={{ padding: '20px 0', minHeight: '200px', whiteSpace: 'pre-wrap' }}>
        {board.content}
      </div>

      <div style={{ borderTop: '1px solid #eee', paddingTop: '10px', textAlign: 'right' }}>
        <button onClick={onEdit}>수정</button>
        <button onClick={onDelete}>삭제</button>
        <button onClick={onList}>목록</button>
      </div>
    </div>
  );
};

export default BoardDetail;