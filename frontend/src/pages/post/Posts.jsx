import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PostItem from "../../components/post/PostItem";
import "../../css/Posts.css";
import Pagination from "react-js-pagination";
import axios from "axios";

export default function Posts() {
  const navigate = useNavigate();
  const location = useLocation();
  const [categoryId, setCategoryId] = useState(location.state.categoryId || null);
  const [category, setCategory] = useState(location.state.category || null);

  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page")) || 0;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [postList, setPostList] = useState([]);


  const fetchPosts = async (page) => {
    try {
      const postListResponse = await axios.get(
        "/posts",
        {
          params: {
            categoryId: categoryId,
            page: page - 1,
            size: 5,
            keyword: searchKeyword || null,
          }
        }
      );
      setPostList(postListResponse.data.content);
      setCategory(category);
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
      <h2>{category} 게시판</h2>
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
        <div className="posts__btnContainer">
          <button
            onClick={() => {
              navigate("/post/create", {
                state: {
                  categoryId: categoryId,
                  category: category,
                },
              });
            }}
          >
            작성
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
