import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { styled } from "styled-components";
import ButtonStyle from "../styles/Button";
import ErrorMessage from "../LoginRegister/ErrorMessage";

import { FaXmark } from "react-icons/fa6";

// const modules = {
//     toolbar:[
//         [{'header': [1, 2, false]}],
//         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//         [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': -1}],
//         ['link', 'image'],
//         ['clean']
//     ]
// }

// const formates = [
//     'header',
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent',
//     'link', 'image'
// ]
const date = new Date();

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

const CreatePost = ({ useShowCreatePost }) => {
  const [createPostData, setCreatePostData] = useState({
    title: "",
    description: "",
    createdDate: "",
  });
  const [postError, setPostError] = useState(false);
  const handleCreatePost = (e) => {
    const currentDate = `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
    setCreatePostData((prev) => ({
      ...createPostData,
      [e.target.name]: e.target.value,
      createdDate: currentDate,
    }));

    console.log(createPostData);
  };

  const createPostSubmission = (e) => {
    e.preventDefault();

    if (createPostData.title === "" || createPostData.description === "") {
      setPostError((prev) => true);
    } else {
      setPostError((prev) => false);
    }
  };
  return (
    <CreatePostSyle>
      <div className="wrapper">
        <FaXmark
          onClick={() => {
            useShowCreatePost((prev) => !prev);
          }}
        />
        <h1>Create Post</h1>
        <form onSubmit={createPostSubmission}>
          <input
            type="text"
            name="title"
            id="postTitle"
            value={createPostData.title}
            onChange={handleCreatePost}
            placeholder="Post title"
          />
          <textarea
            name="description"
            id="postDescription"
            value={createPostData.description}
            onChange={handleCreatePost}
            placeholder="Post description"
          ></textarea>
          <ButtonStyle type="submit">Post</ButtonStyle>

          {postError && <ErrorMessage message={"Post can't be empty"} />}
        </form>
      </div>
    </CreatePostSyle>
  );
};

export default CreatePost;

const CreatePostSyle = styled.div`
  padding: 15px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: grid;
  place-items: center;

  h1 {
    padding-bottom: 15px;
    color: var(--primaryColor);
    user-select: none;
  }

  .wrapper {
    position: relative;
    background: #fff;
    width: 90%;
    max-width: 450px;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    padding: 20px;
    text-align: center;

    svg {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 25px;
      height: 25px;
      color: var(--primaryColor);
      cursor: pointer;
    }

    form {
      width: 100%;
      display: flex;
      gap: 20px;
      flex-direction: column;

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
