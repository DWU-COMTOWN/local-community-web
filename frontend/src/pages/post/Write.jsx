import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/Write.css";
import axios from "axios";

export default function Write() {
  const location = useLocation();
  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState();
  const [category, setCategory] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewImg, setPreviewImg] = useState([]);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setCategory(location.state.category);
    setCategoryId(location.state.categoryId);

    let imgContainers = document.querySelectorAll('.write__imgContainers');
    if (!previewImg || previewImg.length === 0) {
      imgContainers.forEach((container) => {
        container.style.padding = "0";
        container.style.border = "none";
      });
    } else {
      imgContainers.forEach((container) => {
        container.style.padding = "10px";
        container.style.border = "1px solid #ced4da";
      });
    }
  }, [previewImg]);

  function uploadFile(e) {
    let fileArr = Array.from(e.target.files);

    setFiles((prevFiles) => [...prevFiles, ...fileArr]);

    let filesLength = fileArr.length > 10 ? 10 : fileArr.length;
    for (let i = 0; i < filesLength; i++) {
      let file = fileArr[i];
      setPreviewImg((prevStack) => [...prevStack, URL.createObjectURL(file)]);
    }
    // Reset file input
    e.target.value = "";
    fileInputRef.current.value = "";
  }

  const deleteImage = (index) => {
    if (window.confirm("이미지를 삭제하시겠습니까?")) {
      const updatedPreviewImg = [...previewImg];
      const updatedFiles = [...files];
      updatedPreviewImg.splice(index, 1);
      updatedFiles.splice(index, 1);
      setPreviewImg(updatedPreviewImg);
      setFiles(updatedFiles);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !content) {
      alert("제목과 내용을 입력하세요.");
      return;
    }

    if (title.length > 50) {
      alert("제목은 50자를 넘을 수 없습니다.");
      return;
    }

    const postRequest = {
      title: title,
      content: content,
      categoryId: categoryId,
    };

    const formData = new FormData();
    formData.append(
      "postRequest",
      new Blob([JSON.stringify(postRequest)], { type: "application/json" })
    );
    files.forEach((file) => {
      formData.append("imageFiles", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:8080/post/create",
        formData, // formData를 본문으로 전송
        {
          withCredentials: true, // 쿠키를 포함하여 서버로 요청을 보냄
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const createdPost = response.data;
      navigate(`/post/${createdPost.postId}`, { state: { post: createdPost } });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="root">
      <h2>{category} 게시판</h2>
      <div className="write__parent">
            <input
              className="write__title"
              type="text"
              placeholder="제목을 입력하세요."
              onChange={(event) => setTitle(event.target.value)}/>
          <textarea
            className="textarea"
            type="text"
            placeholder="내용을 입력하세요."
            rows="15"
            onChange={(event) => setContent(event.target.value)}
          />
          <div>
            {previewImg.length > 0 && (
              <div className="write__imgContainers">
                {previewImg.map((item, index) => (
                  <div key={index}>
                    <img
                      src={item}
                      alt={`Image ${index + 1}`}
                      className="write__previewImg"
                      onClick={() => deleteImage(index)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="write__btnContainer">
              <label htmlFor="input-file">
                <img
                  src="https://town-in.s3.ap-northeast-2.amazonaws.com/home/camera.png"
                  alt="upload icon"
                />
              </label>
              <input
                type="file"
                id="input-file"
                multiple
                accept=".png, .jpeg, .jpg"
                onChange={uploadFile}
                ref={fileInputRef}
                style={{ display: "none" }}
              />

              <input type="submit" className="write__submit" value="작성" />
            </div>
          </form>
      </div>
    </div>
  );
}
