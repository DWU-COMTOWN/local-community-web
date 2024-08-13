import React from 'react'
import styled from 'styled-components';

export default function Bookmark() {
    return (
        <>
        <Mypost> 
            <Title>북마크</Title>
        </Mypost>
        </>
    );
}

const Mypost = styled.div`
    margin-left: 350px;
    margin-right: 50px;
    width: 60%;
    justify-content: space-around;
`;

const Title = styled.div`
    font-size: 20px;
`;