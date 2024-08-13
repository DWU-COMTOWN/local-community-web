import React from "react";
import styled from "styled-components";
import '../../css/Main.css';

const TopWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 1%;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TitleDiv = styled.div`
    font-size: 50px;
    width: 500px;
    height: 80px;
    background-color: green;
    text-align: center;
    color: white;
    text-shadow: 10px 0px 10px #4d4d4d;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`;

function MainTitle(props) {
    const {} = props;

    return (
        <>
            <TopWrapper>
                <div><a className="topBox" href="#">로그인</a></div>
                <div><a className="topBox" href="javascript:window.open('member.html','')">회원가입</a></div>
            </TopWrapper>
            <hr/>
            <TitleWrapper>
                <TitleDiv>TOWN - IN(人)</TitleDiv>
            </TitleWrapper>
        </>
    );
}

export default MainTitle;