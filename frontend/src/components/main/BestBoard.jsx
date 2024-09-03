import React from "react";
import styled from "styled-components";
import '../../css/Main.css';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    height: 750px;
    background-color: #eeeff0;
    margin-left: 0.5%;
`;

function BestBoard(props) {
    const {} = props;

    const navigate = useNavigate();

    const handleClick = (category) => {
        navigate(`/bestPosts`, { state: { category: category } });
    };

    return (
        <>
            <Wrapper>
                <div className="rightmenu">
                    <center>
                        <br/>
                        <br/><br/>
                        <table border="1" className="table1">
                            <tbody>
                                <tr>
                                    <td height="40px" className="tabletitle" onClick={() => handleClick("조회")}>best 조회 게시글</td>
                                </tr>
                                <tr>
                                    <td>워녕: 긴급재난지원금, 정부지원금 정리 딱 해드립니다 이것만 보세요···</td>
                                </tr>
                                <tr>
                                    <td>유비: 산에서 멧돼지 내려왔네요 위험할뻔 했는데 다행히···</td>
                                </tr>
                            </tbody>
                        </table>
                        <br/>
                        <table border="1" className="table1">
                            <tbody>
                                <tr>
                                    <td height="40px" className="tabletitle">best 추천 게시글</td>
                                </tr>
                                <tr>
                                    <td>지디: 밀폐된 실내에서만큼은 마스크 꼭 써주세요 부탁드립니다···</td>
                                </tr>
                                <tr>
                                    <td>혜구: 핸드폰 잃어버렸는데 찾아주신 분 너무 감사드립니다 마음이 따뜻···</td>
                                </tr>
                            </tbody>
                        </table>
                        <br/>
                        <table border="1" className="table1">
                            <tbody>
                                <tr>
                                    <td height="40px" className="tabletitle">best 댓글수 게시글</td>
                                </tr>
                                <tr>
                                    <td>피치: 구리에서 편의시설 가장 많은 동네 어딘가요?···</td>
                                </tr>
                                <tr>
                                    <td>몽자: 층간소음 문제로 이웃과 말싸움했습니다 누구 잘못인가요??···</td>
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
