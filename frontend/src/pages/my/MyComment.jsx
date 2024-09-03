import React from 'react'
import styled from 'styled-components';
import '../../css/MyPage.css';
import Header from "../../components/my/Header";
import Sidebar from "../../components/my/Sidebar";

export default function MyComment() {
    return (
        <>
            <div className="root-wrap">
                <Header/>
            </div>
            <div className="side-wrap">
                <Sidebar/>
            </div>
            <Mycomment>
                <Title>댓글 단 글</Title>
            </Mycomment>
        </>
    );
}

const Mycomment = styled.div`
    margin-left: 400px;
    margin-right: 50px;
    justify-content: space-around;
`;

const Title = styled.div`
    font-size: 20px;
    display: inline-block;
`;