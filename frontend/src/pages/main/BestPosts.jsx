import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PostItem from "../../components/post/PostItem";
import "../../css/Posts.css";
import axios from "axios";

export default function BestPosts() {
  const location = useLocation();
  const [category, setCategory] = useState(location.state.category || null);
  const [postList, setPostList] = useState([]);

  const fetchPosts = async () => {
    try {
      const postListResponse = await axios.get(
        "/posts/best",
        {
          params: {
            name: category
          }
        }
      );
      setPostList(postListResponse.data);
    } catch (err) {
      console.log("error : ", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [category]);


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
      </div>
    </div>
  );
}
