import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../../components/my/Header";
import Sidebar from "../../components/my/Sidebar";
import '../../css/MyPage.css';

export default function MyPost() {
    const [currentPost, setCurrentPost] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // 쿠키에 있는 JWT 토큰을 사용하여 서버에 요청 보냄
                const postsResponse = await axios.get('/mypage/posts', {
                    withCredentials: true // 쿠키를 포함하여 서버로 요청을 보냄
                });

                setCurrentPost(postsResponse.data); // 받아온 게시물 데이터를 상태에 저장
            } catch (error) {
                console.error("Failed to fetch posts:", error);
                setError("게시물을 가져오는 데 실패했습니다.");
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            <div className="root-wrap">
                <Header/>
            </div>
            <div className="side-wrap">
                <Sidebar/>
            </div>
            <Mypost>
                <Title>내가 쓴 글</Title>
                {error && <ErrorMsg>{error}</ErrorMsg>}
                <div>
                    {currentPost.length > 0 ? (
                        currentPost.map((data) => (
                            <Box key={data.id}>
                                <Board>{data.title}</Board>
                                <Content>{data.content}</Content>
                                <Bottom>
                                    <Date>{data.createdDate}</Date>
                                    <LikeComment>
                                        {"좋아요 " + data.likeCount}
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        {"댓글 " + data.commentCount}
                                    </LikeComment>
                                </Bottom>
                            </Box>
                        ))
                    ) : (
                        <p>작성한 글이 없습니다.</p>
                    )}
                </div>
            </Mypost>
        </>
    );
}

// 스타일 컴포넌트 정의
const Mypost = styled.div`
    margin-left: 400px;
    margin-right: 50px;
    justify-content: space-around;
`;

const Title = styled.div`
    font-size: 20px;
    display: inline-block;
`;

const Box = styled.div`
    border: 1px solid #989898;
    padding: 10px;
    margin-top : 15px;
    margin-bottom: 15px;
`;

const Board = styled.div`
    font-weight: bold;
    color: #043400;
`;

const Content = styled.div`
    margin-top: 10px;
    margin-bottom: 25px;
`;

const Date = styled.div`
    display: inline-block;
`;

const LikeComment = styled.div`
    float: right;
    margin-right: 10px;
`;

const Bottom = styled.div`
    font-size: 13px;
    color: #989898;
`;

const ErrorMsg = styled.div`
    color: red;
    margin-top: 10px;
`;





// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import Header from "../../components/my/Header";
// import Sidebar from "../../components/my/Sidebar";
// import '../../css/MyPage.css';
//
// export default function MyPost() {
//     const [currentPost, setCurrentPost] = useState([]); // 한 페이지에 보여지는 포스트
//     const userId = 1; // 예시로 사용자 ID를 설정
//
//     useEffect(() => {
//         // 특정 postId에 해당하는 게시물 데이터를 가져옵니다.
//         const fetchPostById = async () => {
//             try {
//                 const postId = 5; // 예시로 postId를 설정
//                 const response = await axios.get(`/post/${postId}`, {
//                     params: {
//                         userId: userId,  // 현재 사용자의 ID를 요청에 포함
//                     },
//                 });
//                 setCurrentPost([response.data]); // 서버에서 가져온 게시물 데이터 설정
//             } catch (error) {
//                 console.error("Failed to fetch post by id:", error);
//             }
//         };
//
//         fetchPostById();
//     }, []); // 컴포넌트가 마운트될 때 호출
//
//     return (
//         <>
//             <div className="root-wrap">
//                 <Header/>
//             </div>
//             <div className="side-wrap">
//                 <Sidebar/>
//             </div>
//             <Mypost>
//                 <Title>내가 쓴 글</Title>
//                 <div>
//                     {currentPost.map((data) => {
//                         return (
//                             <Box key={data.postId}>
//                                 <Board>{data.title}</Board>
//                                 <Content>{data.content}</Content>
//                                 <Bottom>
//                                     <Date>{data.createdDate}</Date>
//                                     <LikeComment>
//                                         {"좋아요 " + data.likeCount}
//                                         &nbsp;&nbsp;&nbsp;&nbsp;
//                                         {"댓글 " + data.commentCount}
//                                     </LikeComment>
//                                 </Bottom>
//                             </Box>
//                         );
//                     })}
//                 </div>
//             </Mypost>
//         </>
//     );
// }
//
// // 스타일 컴포넌트 정의
// const Mypost = styled.div`
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
// const Box = styled.div`
//   border: 1px solid #989898;
//   padding: 10px;
//   margin-top : 15px;
//   margin-bottom: 15px;
// `;
//
// const Board = styled.div`
//   font-weight: bold;
//   color: #043400;
// `;
//
// const Content = styled.div`
//   margin-top: 10px;
//   margin-bottom: 25px;
// `;
//
// const Date = styled.div`
//   display: inline-block;
// `;
//
// const LikeComment = styled.div`
//   float: right;
//   margin-right: 10px;
// `;
//
// const Bottom = styled.div`
//   font-size: 13px;
//   color: #989898;
// `;
//
//
