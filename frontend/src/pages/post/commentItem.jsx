import React, { useState } from "react";
import styles from "../../css/Comment.module.css";
import axios from "axios";

export default function CommentItem({ userToken, item, postId }) {
  const [userId, setUserId] = useState(1);
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
        .delete(`http://localhost:8080/comment/${commentId}/delete`)
        .then((response) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log("error : ", err);
        });
    }
  };

  const toggleEdit = (commentId) => {
    setEditStates((prevStates) => ({
      ...prevStates,
      [commentId]: !prevStates[commentId],
    }));
    setEditedContents((prevContents) => ({
      ...prevContents,
      [commentId]: item.content,
    }));
  };

  const editComment = (commentId) => {
    axios
      .put(`http://localhost:8080/comment/${commentId}/edit`, {
        content: editedContents[commentId],
        isEdited: true,
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
        userId: userId,
        postId: postId,
        content: replyContent,
        parentId: parentId,
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  };

  const likeComment = (event, commentId) => {
    event.preventDefault();
    // 유저 임시 설정
    axios
      .get(`http://localhost:8080/comment/${commentId}/isLiked?`, {
        params: { userId: 1 },
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data) {
          alert("이미 추천한 댓글입니다.");
          return;
        }

        if (window.confirm("이 글을 추천하시겠습니까?")) {
          axios
            .post("http://localhost:8080/comment/like", {
              userId: userId,
              commentId: commentId,
            })
            .then((response) => {
              window.location.reload();
            })
            .catch((err) => {
              console.log("error : ", err);
            });
        }
      })
      .catch((err) => {
        console.log("error : ");
        console.log(err);
      });
  };

  return (
    <div className={styles.parent}>
      <div className={styles.commentInfo}>
        <img src="https://cf-fpi.everytime.kr/0.png" className={styles.img} />
        <div className={styles.commentName}>{item.nickname}</div>
        <div className={styles.commenteDate}>
          {item.isEdited ? item.modifiedDate : item.createdDate}
        </div>
        <div className={styles.isEdited}>{item.isEdited ? "(수정됨)" : ""}</div>

        <ul className={styles.option}>
          <li className={styles.childcomment}>
            <button
              className={styles.replyBtn}
              onClick={() => toggleReplyInput(item.commentId)}
            >
              대댓글
            </button>
          </li>
          <li className={styles.commentvote}>
            <a href="#" onClick={(event) => likeComment(event, item.commentId)}>
              추천
            </a>
          </li>
          <li className={styles.edit}>
            <a href="#" onClick={() => toggleEdit(item.commentId)}>
              {editStates[item.commentId] ? "수정 취소" : "수정"}
            </a>
          </li>
          <li className={styles.delete}>
            <a href="#" onClick={() => deleteComment(item.commentId)}>
              삭제
            </a>
          </li>
        </ul>
      </div>
      {editStates[item.commentId] ? (
        <div className={styles.editComment}>
          <input
            type="text"
            value={editedContents[item.commentId] || ""}
            onChange={(e) =>
              setEditedContents({
                ...editedContents,
                [item.commentId]: e.target.value,
              })
            }
            className={styles.editText}
          />
          <button
            onClick={() => editComment(item.commentId)}
            className={styles.editBtn}
          >
            수정
          </button>
        </div>
      ) : (
        <p className={styles.content}>{item.content}</p>
      )}
      <ul className={styles.status}>
        <li className={styles.likeCount}>
          <img
            src="https://i.ibb.co/XSqM75N/like.png"
            className={styles.likeImg}
          />
          {item.likeCount}
        </li>
      </ul>
      {item.children &&
        item.children.map((item) => (
          <div key={item.commentId} className={styles.reply}>
            <div className={styles.replyInfo}>
              <img
                src="https://cf-fpi.everytime.kr/0.png"
                className={styles.img}
                alt="User"
              />
              <div className={styles.commentName}>{item.nickname}</div>
              <div className={styles.commenteDate}>{item.createdDate}</div>
              <ul className={styles.option}>
                <li className={styles.replyVote}>
                  <a
                    href="#"
                    onClick={(event) => likeComment(event, item.commentId)}
                  >
                    추천
                  </a>
                </li>
                <li className={styles.delete}>
                  <a href="#" onClick={() => deleteComment(item.commentId)}>
                    삭제
                  </a>
                </li>
                <li className={styles.edit}>
                  <a href="#" onClick={() => toggleEdit(item.commentId)}>
                    {editStates[item.commentId] ? "수정 취소" : "수정"}
                  </a>
                </li>
              </ul>
            </div>
            {editStates[item.commentId] ? (
              <div className={styles.editComment}>
                <input
                  type="text"
                  value={editedContents[item.commentId] || ""}
                  onChange={(e) =>
                    setEditedContents({
                      ...editedContents,
                      [item.commentId]: e.target.value,
                    })
                  }
                  className={styles.editText}
                />
                <button
                  onClick={() => editComment(item.commentId)}
                  className={styles.editBtn}
                >
                  수정
                </button>
              </div>
            ) : (
              <p className={styles.content}>{item.content}</p>
            )}
            <ul className={styles.status}>
              <li className={styles.likeCount}>
                <img
                  src="https://i.ibb.co/XSqM75N/like.png"
                  className={styles.likeImg}
                />
                {item.likeCount}
              </li>
            </ul>
          </div>
        ))}
      {replyInputs.some((input) => input.parentId === item.commentId) && (
        <div className={styles.writeReply}>
          <input
            className={styles.replyText}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <button
            onClick={() => addReply(item.commentId)}
            className={styles.submit}
          >
            작성
          </button>
        </div>
      )}
    </div>
  );
}
