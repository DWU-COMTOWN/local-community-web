import React from "react";
import "../../css/Posts.css";
import { useNavigate,useLocation } from "react-router-dom";

export default function PostItem({ item }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = () => {
      navigate(`/post/${item.postId}`);
  }
  return (
    <div className="posts__item" onClick={handleItemClick}>
      {location.pathname === '/search' || location.pathname === '/bestPosts' && (
        <div className="posts__category">{item.category} 게시판</div>
      )}
      <div className="posts__title">{item.title}</div>
      <div className="posts__content">{item.content}</div>
      <ul className="posts__status">
        <li>
          <img
            src="https://town-in.s3.ap-northeast-2.amazonaws.com/home/like.png"
          />
          {item.likeCount}
        </li>
        <li>
          <img
            src="https://town-in.s3.ap-northeast-2.amazonaws.com/home/comment.png"
          />
          {item.commentCount}
        </li>
      </ul>
    </div>
  );
}
