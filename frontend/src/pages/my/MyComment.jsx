import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../css/MyPage.css';
import Header from "../../components/my/Header";
import Sidebar from "../../components/my/Sidebar";
import axios from 'axios';
import Pagination from "react-js-pagination";

export default function MyComment() {
    const [commentedPosts, setCommentedPosts] = useState([]);
    const [error, setError] = useState("");
    const rpp = 10;
    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * rpp;
    const lastIndex = rpp * page;
    const [size, setSize] = useState(0);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        const fetchCommentedPosts = async () => {
            try {
                const response = await axios.get('/mypage/comments', {
                    withCredentials: true
                });
                setCommentedPosts(response.data.slice(startIndex, lastIndex));
                setSize(response.data.length);
            } catch (error) {
                setError('Failed to fetch commented posts.');
                console.error('Fetch error:', error);
            }
        };

        fetchCommentedPosts();
    }, [startIndex, lastIndex]);

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
                {error && <ErrorMsg>{error}</ErrorMsg>}
                <Table>
                    <tbody>
                    {commentedPosts.length > 0 ? (
                        commentedPosts.map(post => (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{post.content}</td>
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
                <PgBox>
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={rpp}
                        totalItemsCount={size}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                    />
                </PgBox>
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

const PgBox = styled.div`
    .pagination {
        display: flex;
        justify-content: center;
        margin-top: 10px;
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
