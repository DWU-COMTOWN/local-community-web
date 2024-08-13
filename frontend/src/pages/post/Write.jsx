import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../css/Write.module.css";
import axios from "axios";
import Dropdown  from "../../components/post/Dropdown.jsx";

export default function Write() {
  const userId = 1;
  const location = useLocation();
  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState();
  const [category, setCategory] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [view, setView] = useState(false); 
  const [previewImg, setPreviewImg] = useState([]);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('카테고리 선택');

  const handleSelect = (category) => {
    setSelectedCategory(category);
    setView(false); // 선택 후 드롭다운을 닫습니다.
  };

  useEffect(() => {
    setCategory(location.state.category);
    setCategoryId(location.state.categoryId);
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

    const postRequest = {
      title: title,
      content: content,
      userId: userId,
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
        formData,
        {
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
    <div className={styles.root}>
      <h2>{category} 게시판</h2>
      <div className={styles.parent}>
        <div className={styles.container}>
          <ul className={styles.flexContainer}>
              <li className={styles.categorySelector} onClick={() => {setView(!view)}}>
                {selectedCategory}{" "}
                <div className={styles.arrow}>
                  {view ? <img src="https://town-in.s3.ap-northeast-2.amazonaws.com/home/arrows_up.png" className={styles.upAndDown} /> : <img src="https://town-in.s3.ap-northeast-2.amazonaws.com/home/arrows_down.png" className={styles.upAndDown}/>}
                </div>
                {view && <Dropdown onSelect={handleSelect} />}
              </li>
              <li>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="제목을 입력하세요."
                  onChange={(event) => setTitle(event.target.value)}/>
              </li>
          </ul>
          <textarea
            className={styles.textarea}
            type="text"
            placeholder="내용을 입력하세요."
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
