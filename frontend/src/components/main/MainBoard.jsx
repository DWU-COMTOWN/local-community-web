import React from "react";
import styled from "styled-components";
import '../../css/Main.css';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const inputStyle = {
    width: '750px',
    height: '30px',
    color: 'gray'
};

const tableStyle = {
    cursor: 'pointer'
};

const BoardWrapper = styled.div`
    background-color: #eeeff0;
    margin-top: 5%;
`;

function MainBoard(props) {
    const {} = props;

    const navigate = useNavigate();

    const handleClick = (id, category) => {
        navigate(`/posts`, { state: { categoryId: id, category: category } });
    };

    const [searchKeyword, setSearchKeyword] = useState(null);  
    const searchPosts = async (event) => {
        event.preventDefault();
        if (!searchKeyword) {
          alert("검색어를 입력하세요.");
          return;
        }
        navigate(`/search`, { state: { keyword: searchKeyword} });
    };
    
    return (
        <>
            <center>
                <p/>
                <input type="text" style={inputStyle} placeholder="글 제목, 내용" onChange={(event) => setSearchKeyword(event.target.value)}/>                                                                                                                                                         🔍"/> &nbsp;
                <input type="submit" value="검색" onClick={searchPosts}/>
                <p/>

                <BoardWrapper>
                    <div className="section">
                        <div className="article">
                            <table border="1" className="table1">
                                <tbody>
                                    <tr>
                                        <td className="tabletitle" style={tableStyle} onClick={() => handleClick(4, "자유")}> 자유 게시판 (클릭하세요)</td>
                                    </tr>
                                    <tr>
                                        <td>보리: 지금 구리에 비 오나요?</td>
                                    </tr>
                                    <tr>
                                        <td>우리집댕댕이귀여워: 구리에서 강아지들과 산책하기 좋은 동네 어디인가요?</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="article">
                            <table border="1" className="table1">
                                <tbody>
                                    <tr>
                                        <td className="tabletitle" style={tableStyle} onClick={() => handleClick(5, "정보")}>정보 게시판</td>
                                    </tr>
                                    <tr>
                                        <td>dasds: 고등학교 추천 부탁드려요</td>
                                    </tr>
                                    <tr>
                                        <td>asldaksd: 케이패스 신청하세요 사진 첨부합니다</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="article">
                            <table border="1" className="table1">
                                <tbody>
                                    <tr>
                                        <td className="tabletitle" style={tableStyle} onClick={() => handleClick(6, "홍보")}>홍보 게시판</td>
                                    </tr>
                                    <tr>
                                        <td>곰이: 내일 곰이네 카페 오픈합니다 선착순 50명 텀블러 증정, 텀블러 소진 시 선착순 100명 아메리카노 쿠폰 증정합니다. 많이 와주세요~!</td>
                                    </tr>
                                    <tr>
                                        <td>탱이: 탱이PC방 주말 알바 구합니다. 주 업무는 요리랑 매장 청소입니다. 주간/야간 모두 모집합니다.</td>
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
                                        <td className="tabletitle" style={tableStyle} onClick={() => handleClick(7, "식당")}>식당 게시판</td>
                                    </tr>
                                    <tr>
                                        <td>와이지: YG감자탕 ★★★★☆<br/>처음 가봤는데 직원들도 친절하시고 감자탕도 맛있네요···</td>
                                    </tr>
                                    <tr>
                                        <td>에스엠: SM식당 ★★★★★<br/>다른 식당에 비해 가격이 엄청 저렴하네요···</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="article">
                            <table border="1" className="table1">
                                <tbody>
                                    <tr>
                                        <td className="tabletitle" style={tableStyle} onClick={() => handleClick(15, "분실")}>분실 게시판</td>
                                    </tr>
                                    <tr>
                                        <td>adansd0123: 혹시 구리 문화 공원에서 이렇게 생긴 지갑 보신 분</td>
                                    </tr>
                                    <tr>
                                        <td>양갱: 에어팟 잃어버렸어요 선물받은 건데 주우신 분 사례합니다 곰돌이 그려진 케이스예요</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="article">
                            <table border="1" className="table1">
                                <tbody>
                                    <tr>
                                        <td className="tabletitle" style={tableStyle} onClick={() => handleClick(16, "실종")}>실종 게시판</td>
                                    </tr>
                                    <tr>
                                        <td>하이브: 구리역 부근에서 강아지 보신 분 계신가요? 포메이고 사람 손을 잘···<img src="./image/dog.jpg" width="100px" height="100px"/></td>
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
