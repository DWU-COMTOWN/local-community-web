import React from "react";
import styles from "../../css/Posts.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PostItem({ item }) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    // 유저 아이디 임시 설정
    axios
      .get(`http://localhost:8080/post/${item.postId}`, {
        params: { userId: 1 },
      })
      .then((response) => {
        const post = response.data;
        navigate(`/post/${post.postId}`, { state: { post: post } });
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  };
  return (
    <div className={styles.item} onClick={handleItemClick}>
      <div className={styles.title}>{item.title}</div>
      <div className={styles.content}>{item.content}</div>
      <ul className={styles.status}>
        <li className={styles.likeCount}>
          <img
            src="https://i.ibb.co/XSqM75N/like.png"
            className={styles.likeImg}
          />
          {item.likeCount}
        </li>
        <li className={styles.commentCount}>
          <img
            src="https://i.ibb.co/CQdkB2H/185079-bubble-comment-talk-icon.png"
            className={styles.commentImg}
          />
          {item.commentCount}
        </li>
      </ul>
    </div>
  );
}
