import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../css/Write.module.css";
import axios from "axios";

export default function Edit() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, postId, title, content, images } = location.state;
  const [newTitle, setTitle] = useState(title);
  const [newContent, setContent] = useState(content);
  const [previewImg, setPreviewImg] = useState(
    images.map((image) => image.url) || []
  );
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let imgContainers = document.querySelectorAll(`.${styles.imgContainers}`);
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

    const postEditRequest = {
      title: newTitle,
      content: newContent,
      currentImageUrls: previewImg,
      isEdited: true,
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
    <div className={styles.root}>
      <h2>{location.state.name} 게시판</h2>
      <div className={styles.parent}>
        <div className="container">
          <input
            className={styles.input}
            type="text"
            value={newTitle}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            className={styles.textarea}
            type="text"
            value={newContent}
            rows="15"
            onChange={(event) => setContent(event.target.value)}
          />
          <div className={styles.imgContainers}>
            {previewImg.map((item, index) => (
              <div key={index} className={styles.imgItem}>
                <img
                  src={item}
                  alt={`Image ${index + 1}`}
                  className={styles.previewImg}
                  onClick={() => deleteImage(index)}
                />
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.btnContainer}>
              <label className={styles.inputFileButton} htmlFor="input-file">
                <img
                  className={styles.inputFileImg}
                  src="https://i.ibb.co/LS8qx0w/1976059-camera-images-photo-picture-icon.png"
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

              <input type="submit" className={styles.submit} value="작성" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
