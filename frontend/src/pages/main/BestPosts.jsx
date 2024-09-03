import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PostItem from "../../components/post/PostItem";
import "../../css/Posts.css";
import Pagination from "react-js-pagination";
import axios from "axios";

export default function BestPosts() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page")) || 0;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [category, setCategory] = useState(location.state.category || null);
  const [postList, setPostList] = useState([]);

  console.log("오잉?");
  const fetchPosts = async (page) => {
    try {
      const postListResponse = await axios.get(
        `http://localhost:8080/posts`,
        {
          params: {
            page: page - 1,
            size: 5,
            best: category
          }
        }
      );
      console.log(postListResponse.data.conten);
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

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  return (
    <div className="root">
      <div className="postContainer">
      <h2>best {category} 게시판</h2>
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
