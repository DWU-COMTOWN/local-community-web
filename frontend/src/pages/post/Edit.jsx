import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/Write.css";
import axios from "axios";

export default function Edit() {
  const location = useLocation();
  const navigate = useNavigate();
  const { category: initialCategory, categoryId: initialCategoryId, postId, title: initialTitle, content: initialContent, images } = location.state;
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [category, setCategory] = useState(initialCategory);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [previewImg, setPreviewImg] = useState(
    images.map((image) => image.url) || []
  );
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let imgContainers = document.querySelectorAll(`write__imgContainers`);
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

    const postEditRequest = {
      title: title,
      content: content,
      currentImageUrls: previewImg,
      isEdited: true,
      categoryId: categoryId,
    };

    const formData = new FormData();
    formData.append(
      "postEditRequest",
      new Blob([JSON.stringify(postEditRequest)], { type: "application/json" })
    );
    files.forEach((file) => {
      formData.append("imageFiles", file);
    });

    try {
      const response = await axios.put(
        `http://localhost:8080/post/${postId}/edit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedPostId = response.data;
      navigate(`/post/${updatedPostId}`);
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
                value={title}
                onChange={(event) => setTitle(event.target.value)}/>
          
          <textarea
            className="textarea"
            type="text"
            placeholder="내용을 입력하세요."
            rows="15"
            value={content}
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
