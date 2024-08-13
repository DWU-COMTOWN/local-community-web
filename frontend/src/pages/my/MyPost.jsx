import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { myPostData } from "../../data/myPostData";
import Pagination from "react-js-pagination";

export default function MyPost() {
  const rpp = 1; //한페이지에 5개씩
  const [currentPost, setCurrentPost] = useState([]); //한페이지에 보여지는 포스트
  const [page, setPage] = useState(1); //현재페이지

  const handlePageChange = (page) => {
    setPage(page);
  };

  const startIndex = (page - 1) * rpp;
  const lastIndex = rpp * page;

  useEffect(() => {
    //myPostData.reverse();
    setCurrentPost(myPostData.slice(startIndex, lastIndex));
  }, [startIndex, lastIndex, page]);

  return (
    <>
      <Mypost>
        <Title>내가 쓴 글</Title>
        <div>
          {currentPost.map((data) => {
            return (
              <>
                <Box>
                  <Board>{data.board + " 게시판"}</Board>
                  <Content>{data.content}</Content>
                  <p />
                  <p />
                  <p />
                  <Bottom>
                    <Date>{data.date}</Date>
                    <LikeComment>
                      {"좋아요 " + data.likes}
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      {"댓글 " + data.commentCount}
                    </LikeComment>
                  </Bottom>
                </Box>
              </>
            );
          })}
          <PgBox>
            <Pagination
              activePage={page}
              itemsCountPerPage={rpp}
              totalItemsCount={myPostData.length}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </PgBox>
        </div>
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
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
`;

const Box = styled.div`
  border: 1px solid #989898;
  padding: 10px;
`;

const Board = styled.div`
  font-weight: bold;
  color: #043400;
`;

const Content = styled.div`
  margin-top: 10px;
  margin-bottom: 25px;
`;

const Date = styled.div`
  display: inline-block;
`;
const LikeComment = styled.div`
  float: right;
  margin-right: 10px;
`;
const Bottom = styled.div`
  font-size: 13px;
  color: #989898;
`;
const PgBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  ul {
    list-style: none;
  }
  li {
    display: inline-block;
    width: 20px;
  }
  li a {
    text-decoration: none;
    color: #484848;
  }

  li.active a {
    color: green;
  }
`;
