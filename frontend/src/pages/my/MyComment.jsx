import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../css/MyPage.css';
import Header from "../../components/my/Header";
import Sidebar from "../../components/my/Sidebar";
import axios from 'axios';
import Pagination from "react-js-pagination";
import axiosInstance from "../../api/axiosInstance";

export default function MyComment() {
    const [commentedPosts, setCommentedPosts] = useState([]);
    const [error, setError] = useState("");
    const rpp = 5; // 한 페이지에 보여줄 댓글 수
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0); // 전체 댓글 수

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        const fetchCommentedPosts = async () => {
            try {
                // 서버로 현재 페이지와 페이지 크기 전달
                const response = await axiosInstance.get("/mypage/comments", {
                    params: { page: page - 1, size: rpp }, // Spring에서는 페이지가 0부터 시작
                    withCredentials: true, // JWT 쿠키 포함
                });

                // 백엔드 응답에서 게시물 데이터와 총 게시물 수를 설정
                setCommentedPosts(response.data.posts); // 댓글 단 글 목록
                setTotalItems(response.data.totalItems); // 전체 댓글 수
            } catch (error) {
                setError('Failed to fetch commented posts.');
                console.error('Fetch error:', error);
            }
        };

        fetchCommentedPosts();
    }, [page]); // 페이지 번호가 변경될 때마다 실행

    return (
        <>
            <div className="root-wrap">
                <Header />
            </div>
            <div className="side-wrap">
                <Sidebar />
            </div>
            <MyCommentWrapper>
                <Title>댓글 단 글</Title>
                {error && <ErrorMsg>{error}</ErrorMsg>}
                <div>
                    {commentedPosts.length > 0 ? (
                        commentedPosts.map(post => (
                            <Box key={post.id}>
                                <Board>{post.title}</Board>
                                <Content>{post.content}</Content>
                                <Bottom>
                                    <Date>
                                        {`${post.createdDate[0]}-${post.createdDate[1]}-${post.createdDate[2]} | ${post.userName ||'작성자 없음'}`}
                                    </Date>
                                    <LikeComment>
                                        {"좋아요 " + (post.likesCount || 0)}
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        {"댓글 " + (post.commentCount || 0)}
                                    </LikeComment>
                                </Bottom>
                            </Box>
                        ))
                    ) : (
                        <p>작성한 글이 없습니다.</p>
                    )}

                    <PgBox>
                    <Pagination
                        activePage={page} // 현재 페이지
                        itemsCountPerPage={rpp} // 한 페이지당 아이템 수
                        totalItemsCount={totalItems} // 전체 아이템 수
                        pageRangeDisplayed={5} // 표시할 페이지 버튼 수
                        onChange={handlePageChange} // 페이지 변경 핸들러
                    />
                </PgBox>
            </div>
            </MyCommentWrapper>
        </>
    );
}

const MyCommentWrapper = styled.div`
    margin-left: 400px;
    margin-right: 50px;
    justify-content: space-around;
`;

const Title = styled.div`
    font-size: 20px;
    display: inline-block;
`;


const ErrorMsg = styled.div`
    color: red;
    font-size: 14px;
    margin-top: 10px;
`;

const Box = styled.div`
    border: 1px solid #989898;
    padding: 10px;
    margin-top: 15px;
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
const PgBox = styled.div`
    .pagination {
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }

    .pagination a {
        border: 0;
    }
    ul {
        list-style: none;
        padding: 0;
    }

    ul.pagination li {
        display: inline-block;
        width: 20px;
    }

    ul.pagination li a {
        text-decoration: none;
        color: #484848;
    }
    ul.pagination li.active a {
        color: green;
    }
`;
