import React from 'react'
import styled from 'styled-components';

export default function MyComment() {
    return (
        <>
        <Mypost> 
            <Title>댓글 단 글</Title>
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