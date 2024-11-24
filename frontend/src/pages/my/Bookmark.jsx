import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from "../../components/my/Header";
import Sidebar from "../../components/my/Sidebar";
import axios from 'axios';

export default function Bookmark() {
    const [scrappedPosts, setScrappedPosts] = useState([]);

    // Fetch scrapped posts when the component mounts
    useEffect(() => {
        const fetchScrappedPosts = async () => {
            try {
                // Fetch scrapped posts using the /mypage/scraps endpoint
                const response = await axios.get('/mypage/scraps', {
                    withCredentials: true // Include JWT token in the request
                });
                setScrappedPosts(response.data); // Store the scrapped posts data
            } catch (error) {
                console.error('Failed to fetch scrapped posts:', error);
            }
        };

        fetchScrappedPosts(); // Fetch the scrapped posts when the component mounts
    }, []);

    return (
        <>
            <div className="root-wrap">
                <Header />
            </div>
            <div className="side-wrap">
                <Sidebar />
            </div>
            <BookmarkWrapper>
                <Title>북마크</Title>
                <Table>
                    <tbody>
                    {scrappedPosts.length > 0 ? (
                        scrappedPosts.map(post => (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{post.content}</td>
                                <td>{post.userName || '작성자 없음'}</td>
                                <td>{new Date(post.createdDate).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">북마크한 글이 없습니다.</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </BookmarkWrapper>
        </>
    );
}

// Styled-components for styling the Bookmark component
const BookmarkWrapper = styled.div`
    margin-left: 400px;
    margin-right: 50px;
    justify-content: space-around;
`;

const Title = styled.div`
    font-size: 20px;
    display: inline-block;
`;

const Table = styled.table`
    margin-top: 15px;
    width: 100%;
    border-collapse: collapse;

    tr, td {
        border: 1px solid #ddd;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    tr:hover {
        background-color: #ddd;
    }

    td {
        padding: 12px;
    }
`;


// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import Header from "../../components/my/Header";
// import Sidebar from "../../components/my/Sidebar";
// import axios from 'axios';
//
// export default function Bookmark() {
//     const [scrappedPosts, setScrappedPosts] = useState([]);
//
//     // 사용자 ID (로그인 정보에서 가져오는 것이 더 적합하지만 여기서는 고정된 값 사용)
//     const userId = 1;
//
//     // 컴포넌트 마운트 시 스크랩한 글을 가져옵니다.
//     useEffect(() => {
//         axios.get(`/mypage/scraps?id=${userId}`)
//             .then(response => {
//                 setScrappedPosts(response.data);
//             })
//             .catch(error => {
//                 console.error('Failed to fetch scrapped posts:', error);
//             });
//     }, [userId]);
//
//     return (
//         <>
//             <div className="root-wrap">
//                 <Header />
//             </div>
//             <div className="side-wrap">
//                 <Sidebar />
//             </div>
//             <BookmarkWrapper>
//                 <Title>북마크</Title>
//                 <Table>
//                     <tbody>
//                     {scrappedPosts.length > 0 ? (
//                         scrappedPosts.map(post => (
//                             <tr key={post.id}>
//                                 <td>{post.title}</td>
//                                 <td>{post.content}</td>
//                                 <td>{post.userName || '작성자 없음'}</td>
//                                 <td>{new Date(post.createdDate).toLocaleString()}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="4">북마크한 글이 없습니다.</td>
//                         </tr>
//                     )}
//                     </tbody>
//                 </Table>
//             </BookmarkWrapper>
//         </>
//     );
// }
//
// // 스타일 컴포넌트 정의
// const BookmarkWrapper = styled.div`
//     margin-left: 400px;
//     margin-right: 50px;
//     justify-content: space-around;
// `;
//
// const Title = styled.div`
//     font-size: 20px;
//     display: inline-block;
// `;
//
// const Table = styled.table`
//     margin-top: 15px;
//     width: 100%;
//     border-collapse: collapse;
//
//     tr, td {
//         border: 1px solid #ddd;
//         padding: 8px;
//     }
//
//     tr:nth-child(even) {
//         background-color: #f2f2f2;
//     }
//
//     tr:hover {
//         background-color: #ddd;
//     }
//
//     td {
//         padding: 12px;
//     }
// `;
//
//
