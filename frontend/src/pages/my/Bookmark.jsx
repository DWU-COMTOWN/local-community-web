import React from 'react'
import styled from 'styled-components';
import Header from "../../components/my/Header";
import Sidebar from "../../components/my/Sidebar";

export default function Bookmark() {
    return (
        <>
            <div className="root-wrap">
                <Header/>
            </div>
            <div className="side-wrap">
                <Sidebar/>
            </div>
            <BookMark>
                <Title>북마크</Title>
            </BookMark>
        </>
    );
}

const BookMark = styled.div`
    margin-left: 400px;
    margin-right: 50px;
    justify-content: space-around;
`;

const Title = styled.div`
    font-size: 20px;
   display: inline-block;
`;