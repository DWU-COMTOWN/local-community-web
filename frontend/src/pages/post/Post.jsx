import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../../css/Post.css";
import axios from "axios";
import CommentItem from "../../components/post/CommentItem";

export default function Post() {
  const { postId } = useParams(); // useParams 훅을 사용하여 postId 가져오기
  const navigate = useNavigate();
  const location = useLocation();
  const [category, setCategory] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [post, setPost] = useState(location.state || null);
  const [commentInput, setCommentInput] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await axios.get(`http://localhost:8080/post/${postId}`, {
          withCredentials: true // 쿠키를 포함하여 서버로 요청을 보냄
        });
        const postData = postResponse.data;
        setPost(postData);
        setCategoryId(postData.categoryId);

        if (postData && postData.categoryId) {
          const categoryResponse = await axios.get(`http://localhost:8080/category/${postData.categoryId}`, {
            withCredentials: true // 쿠키를 포함하여 서버로 요청을 보냄
          });
          setCategory(categoryResponse.data);
        }
      } catch (err) {
        console.log('Error fetching data:', err);
      }
    };
    fetchData();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>; // 로딩 중 메시지
  }

  const likePost = async () => {
    if (post.loginId === post.userId) {
      alert("내가 쓴 글은 추천할 수 없습니다.");
      return;
    }
  
    if (post.isLiked) {
      alert("이미 이 글을 추천하셨습니다.");
      return;
    }
  
    if (window.confirm("이 글을 추천하시겠습니까?")) {
      try {
        await axios.post(`http://localhost:8080/post/${postId}/like`, {}, {
          withCredentials: true // 쿠키를 포함하여 서버로 요청을 보냄
        });
        window.location.reload();
      } catch (err) {
        console.error("Error liking post:", err);
      }
    }
  };
  
  const scrapPost = async () => {
    if (post.loginId === post.userId) {
      alert("내가 쓴 글은 스크랩할 수 없습니다.");
      return;
    }
  
    const confirmMessage = post.isScrapped
      ? "이 글의 스크랩을 취소하시겠습니까?"
      : "이 글을 스크랩하시겠습니까?";
    
    if (window.confirm(confirmMessage)) {
      const endpoint = post.isScrapped
        ? `http://localhost:8080/post/${postId}/unscrap`
        : `http://localhost:8080/post/${postId}/scrap`;
  
      try {
        await axios.post(endpoint, {}, {
          withCredentials: true
        });
        
        window.location.reload();
      } catch (err) {
        console.error("Error scrapping post:", err);
      }
    }
  };

  const createComment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/comment/create",
        {
          postId: postId,
          content: commentInput,
        },
        {
          withCredentials: true, // 쿠키를 포함하여 서버로 요청을 보냄
        }
      );

      setCommentInput('');
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const editPost = (event) => {
    event.preventDefault();
    navigate(`/post/${postId}/edit`, {
      state: {
        category: category,
        categoryId: categoryId,
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
        .delete(`http://localhost:8080/post/${postId}`, {
          withCredentials: true // 쿠키를 포함하여 서버로 요청을 보냄
        })
        .then((response) => {
            navigate(`/posts`, { state: { categoryId: categoryId, category: category } });
        })
        .catch((err) => {
          console.log("error : ", err);
        });
    }
  };

  return (
    <div className="root">
      <div>
        <h2>{category} 게시판</h2>
      </div>
      <div className="post__parent">
      <div className="post__container">
          <div className="post__userInfo">
            <img
              src="https://i.ibb.co/j6t0z2T/Kakao-Talk-20230512-090604281.jpg"
            />
            <div className="post__info">
              <div className="post__nickname">{post.nickname}</div>
              <div className="post__date">
                {post.isEdited ? post.modifiedDate : post.createdDate}
                <div className="post__isEdited">
                  {post.isEdited ? "(수정됨)" : ""}
                </div>
              </div>
              <div className="post__view">조회수: {post.view}</div>
            </div>
            <ul className="post__option">
            {post.loginId === post.userId && ( // loginId와 userId가 같으면
              <>
                <li>
                  <button onClick={editPost}>
                    수정
                  </button>
                </li>
                <li>
                  <button onClick={deletePost}>
                    삭제
                  </button>
                </li>
              </>
            )}
            </ul>
          </div>
          <div className="post__title">{post.title}</div>
          <div className="post__content">{post.content}</div>
          <div className="post__img">
            {post.images &&
              post.images.map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  src={image.url}
                  alt={`Image ${imageIndex}`}
                />
              ))}
          </div>
          <ul className="post__status">
            <li>
              <img
                src="https://town-in.s3.ap-northeast-2.amazonaws.com/home/like.png"
              />
              {post.likeCount}
            </li>
            <li>
              <img
                src="https://town-in.s3.ap-northeast-2.amazonaws.com/home/comment.png"
              />
              {post.commentCount}
            </li>
            <li>
              <img
                src="https://town-in.s3.ap-northeast-2.amazonaws.com/home/star.png"
              />
              {post.scrapCount}
            </li>
          </ul>
          <div className="post__btnContainer">
            <button onClick={likePost}>
              추천
            </button>
            <button onClick={scrapPost}>
              {post.isScrapped ? "스크랩 취소" : "스크랩"}
            </button>
          </div>
        </div>
        {post.comments && post.comments.length > 0 && (
          <div>
            {post.comments.map((comment, commentIndex) => (
              <div key={commentIndex}>
                <CommentItem
                  key={`comment-${comment.id}`}
                  item={comment}
                  postId={postId}
                />
              </div>
            ))}
          </div>
        )}
        <form onSubmit={createComment}>
          <div className="writeComment">
            <input
              type="text"
              className="commentText"
              placeholder="댓글을 입력하시오."
              value={commentInput}
              onChange={(event) => setCommentInput(event.target.value)}
            />
            <input type="submit" className="post__submit" value="작성" />
          </div>
        </form>
      </div>
    </div>
  );
}
