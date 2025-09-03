import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BoardForm = ({ onSubmit, initialData, isEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    writer: '',
    content: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // 수정 모드이고 초기 데이터가 있을 경우, 폼에 데이터를 채워줍니다.
    if (isEdit && initialData) {
      setFormData({
        title: initialData.title,
        writer: initialData.writer, // 작성자는 수정하지 않지만 보여주기 위해 설정
        content: initialData.content,
      });
    }
  }, [isEdit, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!isEdit && !formData.writer.trim()) {
      alert('작성자를 입력해주세요.');
      return;
    }
    if (!formData.content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }
    onSubmit(formData);
  };

  const formStyle = { display: 'flex', flexDirection: 'column', gap: '10px' };
  const inputStyle = { padding: '10px', border: '1px solid #ccc', borderRadius: '4px' };
  const buttonContainerStyle = { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>{isEdit ? '게시글 수정' : '게시글 작성'}</h2>
      <div>
        <label htmlFor="title">제목</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} style={inputStyle} />
      </div>
      <div>
        <label htmlFor="writer">작성자</label>
        <input type="text" id="writer" name="writer" value={formData.writer} onChange={handleChange} disabled={isEdit} style={inputStyle} />
      </div>
      <div>
        <label htmlFor="content">내용</label>
        <textarea id="content" name="content" value={formData.content} onChange={handleChange} rows="10" style={inputStyle}></textarea>
      </div>
      <div style={buttonContainerStyle}>
        <button type="button" onClick={() => navigate(-1)}>취소</button>
        <button type="submit">{isEdit ? '수정' : '작성'}</button>
      </div>
    </form>
  );
};

export default BoardForm;