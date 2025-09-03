import axios from 'axios';

// 백엔드 API의 기본 URL
// vite.config.js의 프록시 설정 덕분에 '/api'로만 요청을 보내도 됩니다.
const API_URL = '/api/boards';

// 모든 요청에 공통적으로 적용될 axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 글 목록 조회 (페이징 적용)
export const getBoards = (pageable) => {
  // 예: /api/boards?page=0&size=10
  return apiClient.get('', { params: pageable });
};

// 글 상세 조회
export const getBoard = (id) => apiClient.get(`/${id}`);

// 글 작성
export const createBoard = (boardData) => apiClient.post('', boardData);

// 글 수정
export const updateBoard = (id, boardData) => apiClient.put(`/${id}`, boardData);

// 글 삭제
export const deleteBoard = (id) => apiClient.delete(`/${id}`);