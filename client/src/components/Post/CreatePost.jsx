import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import ButtonStyle from "../styles/Button";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";

import { FaXmark } from "react-icons/fa6";
import { BsImage } from "react-icons/bs";
import UploadImgLabel from "../styles/UploadImgLabel";
import CloseIcon from "../styles/CloseIcon";

import PropTypes from "prop-types";

const CreatePost = ({
  setShowCreatePost,
  realTimeFetchPostData,
  autoHideCreatePost,
}) => {
  const navigate = useNavigate();
  const [createPostData, setCreatePostData] = useState({
    userName: JSON.parse(localStorage.getItem("userLoginData")).userName,
    title: "",
    description: "",
    postImg: "",
  });
  const [successFeedBack, setSuccessFeedBack] = useState(false);
  const [serverErrorFeedBack, setServerErrorFeedBack] = useState(false);

  const [postError, setPostError] = useState(false);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const handleCreatePost = (e) => {
    setCreatePostData((prev) => ({
      ...createPostData,
      [e.target.name]: e.target.value,
    }));

    setSuccessFeedBack((prev) => false);
    setServerErrorFeedBack((prev) => false);
    setPostError((prev) => false);
  };

  const handleImgUpload = (e) => {
    setCreatePostData((prev) => ({
      ...createPostData,
      postImg: e.target.files[0] || "",
    }));
  };
  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  };
  const createPostSubmission = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem("userLoginData")) {
      navigate("/login", { replace: true });
      return;
    }

    if (createPostData.title === "" || createPostData.description === "") {
      setPostError((prev) => true);
      return;
    } else {
      setPostError((prev) => false);
    }
    const date = new Date();

    const postData = {
      ...createPostData,
    };

    const formData = new FormData();
    for (let key in postData) {
      formData.append(key, createPostData[key]);
    }
    formData.append("createdDate", getCurrentDate());
    formData.append("currentTime", "" + date.getTime());

    console.log(formData);
    const res = await fetch("http://localhost:8000/createPost", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (res.status === 201 || res.status === 200) {
      setSuccessFeedBack((prev) => true);
      setServerErrorFeedBack((prev) => false);
      realTimeFetchPostData();

      setTimeout(() => {
        autoHideCreatePost();
      }, 500);
    } else {
      setSuccessFeedBack((prev) => false);
      setServerErrorFeedBack((prev) => true);
    }
  };
  return (
    <CreatePostSyle>
      <div className="wrapper">
        <CloseIcon
          onClick={() => {
            setShowCreatePost((prev) => !prev);
          }}
        >
          <FaXmark />
        </CloseIcon>
        <h1>Create Post</h1>
        <form onSubmit={createPostSubmission} encType="multipart/form-data">
          <input
            type="text"
            name="title"
            id="postTitle"
            value={createPostData.title}
            onChange={handleCreatePost}
            placeholder="Post title"
            required
          />
          <UploadImgLabel htmlFor="postImg" className="imgUploadBtn">
            <span>Upload Image</span>
            <BsImage />
          </UploadImgLabel>
          <input
            type="file"
            accept="image/*"
            id="postImg"
            onChange={handleImgUpload}
            hidden
          />
          <textarea
            name="description"
            id="postDescription"
            value={createPostData.description}
            onChange={handleCreatePost}
            placeholder="Post description"
            required
          ></textarea>
          <ButtonStyle type="submit">Post</ButtonStyle>

          {postError && <ErrorMessage message={"Post can't be empty"} />}

          {serverErrorFeedBack && <ErrorMessage message={"Server Error"} />}
          {successFeedBack && (
            <SuccessMessage message={"Posted Successfully"} />
          )}
        </form>
      </div>
    </CreatePostSyle>
  );
};

CreatePost.propTypes = {
  setShowCreatePost: PropTypes.func,
  realTimeFetchPostData: PropTypes.func,
  autoHideCreatePost: PropTypes.func,
};

export default CreatePost;

const CreatePostSyle = styled.div`
  padding: 15px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
  display: grid;
  place-items: center;

  .wrapper {
    position: relative;
    background: #fff;
    width: 90%;
    max-width: 500px;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    padding: 20px;
    text-align: center;

    h1 {
      padding-bottom: 15px;
      color: var(--primaryColor);
      user-select: none;
    }
    form {
      width: 100%;
      display: flex;
      gap: 20px;
      flex-direction: column;

      .imgUploadBtn {
        width: 100%;
      }

      input,
      textarea {
        border: 2px solid var(--primaryColor);
        padding: 10px;
        border-radius: 8px;
        font-size: 18px;
      }

      textarea {
        min-height: 200px;
        resize: none;
      }
    }
  }
`;
