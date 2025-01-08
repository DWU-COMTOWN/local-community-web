import React, { useState, useEffect } from "react";
import styled from "styled-components";
import '../../css/Main.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import axiosInstance from "../../api/axiosInstance";

const BoardWrapper = styled.div`
    background-color: #eeeff0;
    margin-top: 5%;
`;

function MainBoard(props) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([[]]);
    const [searchKeyword, setSearchKeyword] = useState(null);

    const handleClick = (id, category) => {
        navigate(`/posts`, { state: { categoryId: id, category: category } });
    };

    const navigateToPost = (postId) => {
        navigate(`/post/${postId}`);
    };

    const searchPosts = async (event) => {
        event.preventDefault();
        if (!searchKeyword) {
            alert("검색어를 입력하세요.");
            return;
        }
        navigate(`/search`, { state: { keyword: searchKeyword } });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axiosInstance.get(`/category/recent-posts`, {
                    params: {
                        categoryIds: [4, 5, 6, 7, 15, 16]
                    },
                    paramsSerializer: params => {
                        return qs.stringify(params, { arrayFormat: 'repeat' });
                    }
                });
                setPosts(response.data);
            } catch (error) {
                console.error("Failed to fetch recent posts:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <center>
                <br/>
                <input
                    type="text"
                    className="input-style"
                    placeholder="글 제목, 내용"
                    onChange={(event) => setSearchKeyword(event.target.value)}
                />
                <input
                    type="submit"
                    value="검색"
                    onClick={searchPosts}
                />
                <p/>

                <BoardWrapper>
                    <div className="section">
                        <div className="article">
                            <table border="1" className="table1">
                                <tbody>
                                    <tr>
                                        <td className="tabletitle table-style" onClick={() => handleClick(4, "자유")}> 자유 게시판</td>
                                    </tr>
                                    <tr>
                                        <td
                                            onClick={() => posts[0] && navigateToPost(posts[0].postId)}
                                            className={posts[0] ? "pointer" : ""}
                                        >
                                            {posts[0] ? posts[0].nickname + ": " + posts[0].title : ""}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            onClick={() => posts[1] && navigateToPost(posts[1].postId)}
                                            className={posts[1] ? "pointer" : ""}
                                        >
                                            {posts[1] ? posts[1].nickname + ": " + posts[1].title : ""}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="article">
                            <table border="1" className="table1">
                                <tbody>
                                    <tr>
                                        <td className="tabletitle table-style" onClick={() => handleClick(5, "정보")}>정보 게시판</td>
                                    </tr>
                                    <tr>
                                        <td
                                            onClick={() => posts[2] && navigateToPost(posts[2].postId)}
                                            className={posts[2] ? "pointer" : ""}
                                        >
                                            {posts[2] ? posts[2].nickname + ": " + posts[2].title : ""}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            onClick={() => posts[3] && navigateToPost(posts[3].postId)}
                                            className={posts[3] ? "pointer" : ""}
                                        >
                                            {posts[3] ? posts[3].nickname + ": " + posts[3].title : ""}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="article">
                            <table border="1" className="table1">
                                <tbody>
                                    <tr>
                                        <td className="tabletitle table-style" onClick={() => handleClick(6, "홍보")}>홍보 게시판</td>
                                    </tr>
                                    <tr>
                                        <td
                                            onClick={() => posts[4] && navigateToPost(posts[4].postId)}
                                            className={posts[4] ? "pointer" : ""}
                                        >
                                            {posts[4] ? posts[4].nickname + ": " + posts[4].title : ""}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            onClick={() => posts[5] && navigateToPost(posts[5].postId)}
                                            className={posts[5] ? "pointer" : ""}
                                        >
                                            {posts[5] ? posts[5].nickname + ": " + posts[5].title : ""}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </BoardWrapper>

                <BoardWrapper>
                    <div className="section">
                        <div className="article">
                            <table border="1" className="table1">
                                <tbody>
                                    <tr>
                                        <td className="tabletitle table-style" onClick={() => handleClick(7, "식당")}>식당 게시판</td>
                                    </tr>
                                    <tr>
                                        <td
                                            onClick={() => posts[6] && navigateToPost(posts[6].postId)}
                                            className={posts[6] ? "pointer" : ""}
                                        >
                                            {posts[6] ? posts[6].nickname + ": " + posts[6].title : ""}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            onClick={() => posts[7] && navigateToPost(posts[7].postId)}
                                            className={posts[7] ? "pointer" : ""}
                                        >
                                            {posts[7] ? posts[7].nickname + ": " + posts[7].title : ""}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="article">
                            <table border="1" className="table1">
                                <tbody>
                                    <tr>
                                        <td className="tabletitle table-style" onClick={() => handleClick(15, "분실")}>분실 게시판</td>
                                    </tr>
                                    <tr>
                                        <td
                                            onClick={() => posts[8] && navigateToPost(posts[8].postId)}
                                            className={posts[8] ? "pointer" : ""}
                                        >
                                            {posts[8] ? posts[8].nickname + ": " + posts[8].title : ""}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            onClick={() => posts[9] && navigateToPost(posts[9].postId)}
                                            className={posts[9] ? "pointer" : ""}
                                        >
                                            {posts[9] ? posts[9].nickname + ": " + posts[9].title : ""}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="article">
                            <table border="1" className="table1">
                                <tbody>
                                    <tr>
                                        <td className="tabletitle table-style" onClick={() => handleClick(16, "실종")}>실종 게시판</td>
                                    </tr>
                                    <tr>
                                        <td
                                            onClick={() => posts[10] && navigateToPost(posts[10].postId)}
                                            className={posts[10] ? "pointer" : ""}
                                        >
                                            {posts[10] ? posts[10].nickname + ": " + posts[10].title : ""}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            onClick={() => posts[11] && navigateToPost(posts[11].postId)}
                                            className={posts[11] ? "pointer" : ""}
                                        >
                                            {posts[11] ? posts[11].nickname + ": " + posts[11].title : ""}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </BoardWrapper>
            </center>
        </>
    );
}

export default MainBoard;