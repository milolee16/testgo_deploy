import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null; // 페이지가 1개 이하면 페이지네이션을 표시하지 않음
  }

  const pageNumbers = [];
  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    gap: '5px',
  };

  const pageButtonStyle = (isActive) => ({
    padding: '5px 10px',
    cursor: 'pointer',
    border: '1px solid #ddd',
    backgroundColor: isActive ? '#007bff' : 'white',
    color: isActive ? 'white' : 'black',
  });

  return (
    <div style={paginationStyle}>
      {pageNumbers.map(number => (
        <button key={number} onClick={() => onPageChange(number)} style={pageButtonStyle(currentPage === number)}>
          {number + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;