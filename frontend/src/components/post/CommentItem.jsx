import React, { useState } from "react";
import  "../../css/Comment.css";
import axios from "axios";

export default function CommentItem({ item, postId }) {
  const [replyContent, setReplyContent] = useState("");
  const [replyInputs, setReplyInputs] = useState([]);
  const [editStates, setEditStates] = useState({});
  const [editedContents, setEditedContents] = useState({});

  const toggleReplyInput = (parentId) => {
    const updatedInputs = [...replyInputs];
    const index = updatedInputs.findIndex(
      (input) => input.parentId === parentId
    );

    if (index !== -1) {
      updatedInputs.splice(index, 1);
    } else {
      updatedInputs.push({ parentId: parentId });
    }

    setReplyInputs(updatedInputs);
  };

  const deleteComment = (commentId) => {
    if (window.confirm("이 댓글을 삭제하시겠습니까?")) {
      axios
        .delete(`http://localhost:8080/comment/${commentId}`, {
          withCredentials: true, // 쿠키를 포함하여 서버로 요청을 보냄
        })
        .then((response) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log("error : ", err);
        });
    }
  };

  const toggleEdit = (commentId, content) => {
    setEditStates((prevStates) => ({
      ...prevStates,
      [commentId]: !prevStates[commentId],
    }));
    setEditedContents((prevContents) => ({
      ...prevContents,
      [commentId]: content, // 해당 댓글의 내용을 설정
    }));
  };
  

  const editComment = (commentId) => {
    axios
      .put(`http://localhost:8080/comment/${commentId}`, {
        content: editedContents[commentId],
        isEdited: true,
      },
      {
        withCredentials: true, // 쿠키를 포함하여 서버로 요청을 보냄
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  };

  const addReply = (parentId) => {
    if (!replyContent) {
      alert("내용을 입력해 주세요.");
      return;
    }

    axios
      .post("http://localhost:8080/comment/create", {
        postId: postId,
        content: replyContent,
        parentId: parentId,
      },
      {
        withCredentials: true, // 쿠키를 포함하여 서버로 요청을 보냄
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  };

  const likeComment = async (event, commentId) => {
    event.preventDefault();
  
    try {
      const response = await axios.get(`http://localhost:8080/comment/${commentId}/isLiked`, {
        withCredentials: true, // 쿠키를 포함하여 서버로 요청을 보냄
      });
  
      console.log(response.data);
      if (response.data) {
        alert("이미 추천한 댓글입니다.");
        return;
      }
  
      if (window.confirm("이 글을 추천하시겠습니까?")) {
        await axios.post(`http://localhost:8080/comment/${commentId}/like`, {}, {
          withCredentials: true, // 쿠키를 포함하여 서버로 요청을 보냄
        });
        
        window.location.reload();
      }
    } catch (err) {
      console.error("Error liking comment:", err);
    }
  };
  

  return (
    <div className="comment_parent">
      <div className="commentInfo">
        <img src="https://cf-fpi.everytime.kr/0.png" />
        <div className="comment__nickname">
          {item.nickname}
          {item.userId === item.loginId && <span>(글쓴이)</span>} {/* userId와 loginId가 같으면 "(글쓴이)" 표시 */}
        </div>
        <div className="comment__date">
          {item.isEdited ? item.modifiedDate : item.createdDate}
        </div>
        <div className="comment__isEdited">{item.isEdited ? "(수정됨)" : ""}</div>
        <ul className="comment__option">
        {item.userId === item.loginId ? ( // userId와 loginId가 같으면
          <>
            <li>
              <button onClick={() => toggleReplyInput(item.commentId)}>
                대댓글
              </button>
            </li>
            <li>
              <button onClick={() => toggleEdit(item.commentId, item.content)}>
                {editStates[item.commentId] ? "수정 취소" : "수정"}
              </button>
            </li>
            <li>
              <button onClick={() => deleteComment(item.commentId)}>
                삭제
              </button>
            </li>
          </>
          ) : ( // 다를 경우
          <>
            <li>
              <button onClick={() => toggleReplyInput(item.commentId)}>
                대댓글
              </button>
            </li>
            <li>
              <button onClick={(event) => likeComment(event, item.commentId)}>
                추천
              </button>
            </li>
          </>
        )}
        </ul>
      </div>
      {editStates[item.commentId] ? (
        <div className="editComment">
          <input
            type="text"
            value={editedContents[item.commentId] || ""}
            onChange={(e) =>
              setEditedContents({
                ...editedContents,
                [item.commentId]: e.target.value,
              })
            }
          />
          <button
            onClick={() => editComment(item.commentId)}
          >
            수정
          </button>
        </div>
      ) : (
        <p className="comment__content">{item.content}</p>
      )}
      <ul className="comment__status">
        <li>
          <img
            src="https://town-in.s3.ap-northeast-2.amazonaws.com/home/like.png"
          />
          {item.likeCount}
        </li>
      </ul>
      {item.children && item.children.map((child) => (
    <div key={child.commentId} className="reply">
      <div className="commentInfo">
        <img src="https://cf-fpi.everytime.kr/0.png" alt="User" />
        <div className="comment__nickname">
          {child.nickname}
          {child.userId === item.loginId && <span>(글쓴이)</span>}
        </div>
        <div className="comment__date">{child.createdDate}</div>
        <ul className="comment__option">
          {child.userId === item.loginId ? (
            <>
              <li>
                <button onClick={() => toggleEdit(child.commentId, child.content)}>
                  {editStates[child.commentId] ? "수정 취소" : "수정"}
                </button>
              </li>
              <li>
                <button onClick={() => deleteComment(child.commentId)}>
                  삭제
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={() => toggleReplyInput(child.commentId)}>
                  대댓글
                </button>
              </li>
              <li>
                <button onClick={(event) => likeComment(event, child.commentId)}>
                  추천
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
      {editStates[child.commentId] ? (
        <div className="editComment">
          <input
            type="text"
            value={editedContents[child.commentId] || ""}
            onChange={(e) =>
              setEditedContents({
                ...editedContents,
                [child.commentId]: e.target.value,
              })
            }
          />
          <button onClick={() => editComment(child.commentId)}>수정</button>
        </div>
      ) : (
        <p className="comment__content">{child.content}</p>
      )}
      <ul className="comment__status">
        <li>
          <img src="https://town-in.s3.ap-northeast-2.amazonaws.com/home/like.png" />
          {child.likeCount}
        </li>
      </ul>
    </div>
  ))}

      {replyInputs.some((input) => input.parentId === item.commentId) && (
        <div className="writeReply">
          <input
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <button
            onClick={() => addReply(item.commentId)}
          >
            작성
          </button>
        </div>
      )}
    </div>
  );
}
