import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../css/MyPage.css';
import Header from "../../components/my/Header";
import Sidebar from "../../components/my/Sidebar";
import axios from 'axios';

export default function MyComment() {
    const [commentedPosts, setCommentedPosts] = useState([]);

    // Fetch posts the user has commented on when the component mounts
    useEffect(() => {
        const fetchCommentedPosts = async () => {
            try {
                const response = await axios.get('/mypage/comments', {
                    withCredentials: true // Include cookies (JWT) in the request
                });
                setCommentedPosts(response.data); // Store the commented posts data
            } catch (error) {
                console.error('Failed to fetch commented posts:', error);
            }
        };

        fetchCommentedPosts(); // Fetch the commented posts when the component mounts
    }, []);

    return (
        <>
            <div className="root-wrap">
                <Header/>
            </div>
            <div className="side-wrap">
                <Sidebar/>
            </div>
            <MyCommentWrapper>
                <Title>댓글 단 글</Title>
                <Table>
                    <tbody>
                    {commentedPosts.length > 0 ? (
                        commentedPosts.map(post => (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{post.content}</td>
                                <td>{post.commentCount}개의 댓글</td>
                                <td>{new Date(post.createdDate).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">댓글 단 글이 없습니다.</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </MyCommentWrapper>
        </>
    );
}

// Styled-components for styling the MyComment component
const MyCommentWrapper = styled.div`
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
// import '../../css/MyPage.css';
// import Header from "../../components/my/Header";
// import Sidebar from "../../components/my/Sidebar";
// import axios from 'axios';
//
// export default function MyComment() {
//     const [commentedPosts, setCommentedPosts] = useState([]);
//
//     // 컴포넌트가 마운트될 때 데이터를 가져옴
//     useEffect(() => {
//         const fetchCommentedPosts = async () => {
//             try {
//                 const response = await axios.get('/mypage/commented-posts', {
//                     withCredentials: true // 쿠키를 포함하여 서버로 요청
//                 });
//                 setCommentedPosts(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch commented posts:', error);
//             }
//         };
//
//         fetchCommentedPosts();
//     }, []);
//
//     return (
//         <>
//             <div className="root-wrap">
//                 <Header/>
//             </div>
//             <div className="side-wrap">
//                 <Sidebar/>
//             </div>
//             <MyCommentWrapper>
//                 <Title>댓글 단 글</Title>
//                 <Table>
//                     <tbody>
//                     {commentedPosts.length > 0 ? (
//                         commentedPosts.map(post => (
//                             <tr key={post.id}>
//                                 <td>{post.title}</td>
//                                 <td>{post.content}</td>
//                                 <td>{post.commentCount}개의 댓글</td>
//                                 <td>{new Date(post.createdDate).toLocaleString()}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="4">댓글 단 글이 없습니다.</td>
//                         </tr>
//                     )}
//                     </tbody>
//                 </Table>
//             </MyCommentWrapper>
//         </>
//     );
// }
//
// // 스타일 컴포넌트 정의
// const MyCommentWrapper = styled.div`
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


