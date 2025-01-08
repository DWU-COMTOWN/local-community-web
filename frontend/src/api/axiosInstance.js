import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080', // API 기본 URL 설정
    withCredentials: true, // 쿠키 포함 설정
});

export default axiosInstance;
