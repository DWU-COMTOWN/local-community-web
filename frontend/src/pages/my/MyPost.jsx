import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Pagination from "react-js-pagination";
import Header from "../../components/my/Header";
import Sidebar from "../../components/my/Sidebar";
import '../../css/MyPage.css';
import axiosInstance from "../../api/axiosInstance";

export default function MyPost() {
    const [currentPost, setCurrentPost] = useState([]);
    const [error, setError] = useState("");
    const rpp = 5; //한페이지에 5개씩
    const [page, setPage] = useState(1); //현재페이지
    const [totalItems, setTotalItems] = useState(0); // 전체 게시물 수

    const handlePageChange = (page) => {
        setPage(page);
    };
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // 서버로 현재 페이지와 페이지 크기 전달
                const response = await axiosInstance.get("/mypage/posts", {
                    params: { page: page - 1, size: rpp }, // Spring에서는 0부터 시작
                    withCredentials: true, // JWT 쿠키 포함
                });
                // 백엔드 응답에서 게시물 데이터와 총 게시물 수를 설정
                setCurrentPost(response.data.posts); // 현재 페이지 게시물
                setTotalItems(response.data.totalItems); // 전체 게시물 수
            } catch (error) {
                console.error("Failed to fetch posts:", error);
                setError("게시물을 가져오는 데 실패했습니다.");
            }
        };

        fetchPosts();
    }, [page]); // 페이지 번호가 변경될 때마다 실행


    return (
        <>
            <div className="root-wrap">
                <Header />
            </div>
            <div className="side-wrap">
                <Sidebar />
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
                                    <Date>
                                        {`${data.createdDate[0]}-${data.createdDate[1]}-${data.createdDate[2]} | ${data.userName ||'작성자 없음'}`}
                                    </Date>
                                    <LikeComment>
                                        {"좋아요 " + (data.likesCount || 0)}
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        {"댓글 " + (data.commentCount || 0)}
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
                            itemsCountPerPage={rpp} // 한 페이지당 게시물 수
                            totalItemsCount={totalItems} // 전체 게시물 수
                            pageRangeDisplayed={5} // 표시할 페이지 버튼 수
                            onChange={handlePageChange} // 페이지 변경 핸들러
                        />
                    </PgBox>
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

const ErrorMsg = styled.div`
    color: red;
    margin-top: 10px;
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
