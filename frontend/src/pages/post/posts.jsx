import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PostItem from "./postItem";
import styles from "../../css/Posts.module.css";
import axios from "axios";

export default function Posts() {
  const name = "리뷰"; // 연결 안됨
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page")) || 0; // 페이지 번호는 0부터 시작
  const [currentPage, setCurrentPage] = useState(initialPage);

  const [list, setList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const categoryId = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postListResponse = await axios.get(
          `http://localhost:8080/posts/${categoryId}`,
          {
            params: { page: currentPage },
          }
        );
        const postList = postListResponse.data;
        setList(postList.content); // 실제 포스트 리스트
        setTotalPages(postList.totalPages);
      } catch (err) {
        console.log("error : ", err);
      }
    };
    fetchData();
  }, [categoryId, currentPage]);

  useEffect(() => {
    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage, navigate]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageButtons = [];
  for (let i = 0; i < totalPages; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => paginate(i)}
        className={currentPage === i ? styles.active : null}
      >
        {i + 1}
      </button>
    );
  }

  return (
    <div className={styles.root}>
      <h2>{name} 게시판</h2>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="글 제목, 내용, 해시태그"
          className={styles.input}
        />
        <button className={styles.searchBtn}>검색</button>
      </div>
      <div className={styles.listContainer}>
        <div className={styles.container}>
          <div className={styles.itemsContainer}>
            {list.map((item, index) => (
              <PostItem key={index} item={item} />
            ))}
          </div>
        </div>
        <div className={styles.paginationContainer}>
          <div className={styles.pagination}>{pageButtons}</div>
        </div>
        <div className={styles.btnContainer}>
          <button
            className={styles.btn}
            onClick={() => {
              navigate("/post/create", {
                state: {
                  name: name,
                },
              });
            }}
          >
            작성
          </button>
        </div>
      </div>
    </div>
  );
}
