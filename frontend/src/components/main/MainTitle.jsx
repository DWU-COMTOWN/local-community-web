import React from "react";
import styled from "styled-components";

// 제목 컨테이너
const TitleWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 480px; /* 고정된 가로 길이 */
    margin: 25px auto;
    padding: 20px;
    background-color: #48ad48; /* 기존 색상 */
    border-radius: 50px; /* 모서리 */
    //box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

// 제목 텍스트 스타일
const TitleDiv = styled.div`
    font-size: 45px; /* 텍스트 크기 */
    color: white; /* 흰색 텍스트 */
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-weight: 900; /* 굵기 최대화 */
    letter-spacing: 2px; /* 글자 간격 강조 */
    display: flex;
    align-items: baseline;

    /* 굵기 시뮬레이션 */
    text-shadow:
            1px 0px #ffffff,
            -1px 0px #ffffff,
            0px 1px #ffffff,
            0px -1px #ffffff;
`;

// (人) 텍스트 스타일
const Highlight = styled.span`
    font-size: 18px; /* (人)의 크기 */
    font-weight: 700; /* 강조된 굵기 */
    color: white; /* 연한 회색 */
    margin-left: 1px; /* 제목과 간격 조정 */
`;

function MainTitle() {
    return (
        <TitleWrapper>
            <TitleDiv>
                TOWN - IN<Highlight>(人)</Highlight>
            </TitleDiv>
        </TitleWrapper>
    );
}

export default MainTitle;
