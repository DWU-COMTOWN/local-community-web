// 환경 변수에서 API_URL을 가져오거나 기본값을 사용
// 로컬에서는 `proxy`를 사용하고, 배포 환경에서는 .env.production 파일에서 가져온 URL을 사용
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export { API_URL };

// export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
