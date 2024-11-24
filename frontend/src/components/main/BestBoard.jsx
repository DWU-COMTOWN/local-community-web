import React, { useState, useEffect } from "react";
import styled from "styled-components";
import '../../css/Main.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Wrapper = styled.div`
    height: 750px;
    background-color: #eeeff0;
    margin-left: 0.5%;
`;

function BestBoard(props) {
    const {} = props;
    const navigate = useNavigate();
    const [bestPosts, setBestPosts] = useState([[]]);

    const handleClick = (category) => {
        navigate(`/bestPosts`, { state: { category: category } });
    };

    const navigateToPost = (postId) => {
        navigate(`/post/${postId}`);
    };

        useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/category/recent-posts/best`);
                setBestPosts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Failed to fetch recent posts:", error);
            }
        };
        fetchData();
        }, []);

        return (
            <>
                <Wrapper>
                    <div className="rightmenu">
                        <center>
                            <br />
                            <br />
                            <br />
                            <table className="table1">
                                <tbody>
                                    <tr>
                                        <td className="tabletitle" onClick={() => handleClick("조회")}>best 조회 게시글</td>
                                    </tr>
                                    <tr>
                                        <td className="pointer" onClick={() => bestPosts[0] && navigateToPost(bestPosts[0].postId)}>
                                            {bestPosts[0] ? `${bestPosts[0].nickname}: ${bestPosts[0].title}` : ""}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="pointer" onClick={() => bestPosts[1] && navigateToPost(bestPosts[1].postId)}>
                                            {bestPosts[1] ? `${bestPosts[1].nickname}: ${bestPosts[1].title}` : ""}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <table className="table1">
                                <tbody>
                                    <tr>
                                        <td className="tabletitle" onClick={() => handleClick("추천")}>best 추천 게시글</td>
                                    </tr>
                                    <tr>
                                        <td className="pointer" onClick={() => bestPosts[2] && navigateToPost(bestPosts[2].postId)}>
                                            {bestPosts[2] ? `${bestPosts[2].nickname}: ${bestPosts[2].title}` : ""}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="pointer" onClick={() => bestPosts[3] && navigateToPost(bestPosts[3].postId)}>
                                            {bestPosts[3] ? `${bestPosts[3].nickname}: ${bestPosts[3].title}` : ""}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <table className="table1">
                                <tbody>
                                    <tr>
                                        <td className="tabletitle" onClick={() => handleClick("댓글")}>best 댓글 수 게시글</td>
                                    </tr>
                                    <tr>
                                        <td className="pointer" onClick={() => bestPosts[4] && navigateToPost(bestPosts[4].postId)}>
                                            {bestPosts[4] ? `${bestPosts[4].nickname}: ${bestPosts[4].title}` : ""}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="pointer" onClick={() => bestPosts[5] && navigateToPost(bestPosts[5].postId)}>
                                            {bestPosts[5] ? `${bestPosts[5].nickname}: ${bestPosts[5].title}` : ""}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </center>
                    </div>
                </Wrapper>
            </>
        );
}

export default BestBoard;
