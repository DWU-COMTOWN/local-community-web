import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import styles from "../../css/Post.module.css";
import axios from "axios";
import CommentItem from "./commentItem";

export default function Post() {
  const { postId } = useParams(); // useParams 훅을 사용하여 postId 가져오기
  console.log(postId);
  const navigate = useNavigate();

  const location = useLocation();

  const [post, setPost] = useState(location.state || null);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/post/${postId}`, { params: { userId: 1 } })
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => console.log(err));
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>; // 로딩 중 메시지
  }

  const likePost = () => {
    console.log(post.isLiked);
    if (post.isLiked) {
      alert("이미 이 글을 추천하셨습니다.");
      return;
    }

    if (window.confirm("이 글을 추천하시겠습니까?")) {
      axios
        .post("http://localhost:8080/post/like", {
          userId: 1, // 로그인한 사용자 ID로 변경 필요
          postId: postId,
        })
        .then(function (response) {
          window.location.reload();
        })
        .catch((err) => {
          console.log("error : ");
          console.log(err);
        });
    }
  };

  const scrapPost = () => {
    const confirmMessage = post.isScrapped
      ? "이 글의 스크랩을 취소하시겠습니까?"
      : "이 글을 스크랩하시겠습니까?";
    if (window.confirm(confirmMessage)) {
      const endpoint = post.isScrapped
        ? "http://localhost:8080/post/unscrap"
        : "http://localhost:8080/post/scrap";

      axios
        .post(endpoint, {
          userId: post.userId,
          postId: postId,
        })
        .then(function (response) {
          window.location.reload();
        })
        .catch((err) => {
          console.log("error : ");
          console.log(err);
        });
    }
  };

  const createComment = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/comment/create", {
        userId: post.userId,
        postId: postId,
        content: commentInput,
      })
      .then(function (response) {
        window.location.reload();
      })
      .catch((err) => {
        console.log("error : ");
        console.log(err);
      });
  };

  const editPost = (event) => {
    const name = "리뷰";
    event.preventDefault();
    navigate(`/post/${postId}/edit`, {
      state: {
        name: name,
        postId: postId,
        title: post.title,
        content: post.content,
        images: post.images,
      },
    });
  };
  const deletePost = (e) => {
    e.preventDefault();
    if (window.confirm("이 글을 삭제하시겠습니까?")) {
      axios
        .delete(`http://localhost:8080/post/${postId}/delete`)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            console.log("글 삭제 성공");
            navigate("/posts");
          } else {
            console.error("글 삭제 실패");
          }
        })
        .catch((err) => {
          console.log("error : ", err);
        });
    }
  };

  return (
    <div className={styles.root}>
      <div>
        <h2>리뷰 게시판</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.article}>
          <div className={styles.userInfo}>
            <img
              src="https://i.ibb.co/j6t0z2T/Kakao-Talk-20230512-090604281.jpg"
              className={styles.profileImg}
            />
            <div className={styles.info}>
              <div className={styles.name}>{post.nickname}</div>
              <div className={styles.date}>
                {post.isEdited ? post.modifiedDate : post.createdDate}
                <div className={styles.isEdited}>
                  {post.isEdited ? "(수정됨)" : ""}
                </div>
              </div>
            </div>
            <ul className={styles.option}>
              <li className={styles.edit}>
                <a href="#" onClick={editPost}>
                  수정
                </a>
              </li>
              <li className={styles.delete}>
                <a href="#" onClick={deletePost}>
                  삭제
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.title}>{post.title}</div>
          <div className={styles.content}>{post.content}</div>
          <div className={styles.postImg}>
            {post.images &&
              post.images.map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  src={image.url}
                  alt={`Image ${imageIndex}`}
                />
              ))}
          </div>

          <ul className={styles.status}>
            <li className={styles.likeCount}>
              <img
                src="https://i.ibb.co/K5Jg7hC/like.png"
                className={styles.likeImg}
              />
              {post.likeCount}
            </li>
            <li className={styles.commentCount}>
              <img
                src="https://i.ibb.co/CQdkB2H/185079-bubble-comment-talk-icon.png"
                className={styles.commentImg}
              />
              {post.commentCount}
            </li>
            <li className={styles.scrapCount}>
              <img
                src="https://i.ibb.co/42n3qPn/172558-star-icon.png"
                className={styles.scrapImg}
              />
              {post.scrapCount}
            </li>
          </ul>
          <div className={styles.btnContainer}>
            <button className={styles.btnLike} onClick={likePost}>
              추천
            </button>
            <button className={styles.btnScrap} onClick={scrapPost}>
              {post.isScrapped ? "스크랩 취소" : "스크랩"}
            </button>
          </div>
        </div>
        <div className={styles.comments}>
          {post.comments &&
            post.comments.map((comment, commentIndex) => (
              <div key={commentIndex}>
                <CommentItem
                  key={`comment-${comment.id}`} // 이 부분을 comment.id로 변경하여 고유한 key를 사용합니다.
                  item={comment}
                  postId={postId}
                />
              </div>
            ))}
        </div>
        <form onSubmit={createComment}>
          <div className={styles.writeComment}>
            <input
              type="text"
              className={styles.commentText}
              placeholder="댓글을 입력하시오."
              value={commentInput}
              onChange={(event) => setCommentInput(event.target.value)}
            />
            <input type="submit" className={styles.submit} value="작성" />
          </div>
        </form>
      </div>
    </div>
  );
}
