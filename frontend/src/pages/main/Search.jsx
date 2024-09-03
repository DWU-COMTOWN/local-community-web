import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PostItem from "../../components/post/PostItem";
import "../../css/Posts.css";
import Pagination from "react-js-pagination";
import axios from "axios";

export default function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page")) || 0;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState(location.state.keyword || null);
  const [totalPages, setTotalPages] = useState(0);
  const [postList, setPostList] = useState([]);

  const fetchPosts = async (page) => {
    try {
      const postListResponse = await axios.get(
        `http://localhost:8080/posts`,
        {
          params: {
            page: page - 1,
            size: 5,
            keyword: searchKeyword || null,
          }
        }
      );
      setPostList(postListResponse.data.content);
      setTotalPages(postListResponse.data.totalPages);
      setCurrentPage(page);
    } catch (err) {
      console.log("error : ", err);
    }
  };

  const handlePageChange = (pageNumber) => {
    fetchPosts(pageNumber);
  };

  const searchPosts = async (event) => {
     event.preventDefault();
    if (!searchKeyword) {
      alert("검색어를 입력하세요.");
      return;
    }
    setCurrentPage(1);
    fetchPosts(1);
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);


  return (
    <div className="root">
    <div className="postContainer">
      <div className="search">
        <input
          type="text"
          placeholder="글 제목, 내용"
          onChange={(event) => setSearchKeyword(event.target.value)}/>
        <button onClick={searchPosts}>검색</button>
      </div>
      {postList.length > 0 && (
        <div className="postItemContainer">
          {postList.map((item, index) => (
            <PostItem key={index} item={item} />
          ))}
        </div>
      )}
      <div className="paginationAndButtonContainer">
        <div className="paginationContainer">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={5}
            totalItemsCount={totalPages * 5}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
    </div>
  );
}
