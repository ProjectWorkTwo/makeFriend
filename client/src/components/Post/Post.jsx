import React, { useState } from "react";
import { styled } from "styled-components";
import avatar from "../../assets/avatar/avatar1.png";
import { BsFillHeartFill } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";

const Post = ({postData}) => {
    const {userName, postTitle, postedDate, postDescription, likeNum, shareNum} = postData;  return (
    <PostStyle>
      <div className="wrapper">
        <div className="top">
          <div className="avatar">
            <img src={avatar} alt="" />
          </div>
          <div className="info">
            <h4>
              <Link to={`/profile/${userName}`}>{userName}</Link>
            </h4>
            <p>{postedDate}</p>
          </div>
        </div>
        <div className="center">
          <h3>{postTitle}</h3>
          <hr />
          <p>{postDescription}</p>
        </div>
        <div className="bottom">
          <button className="like">
            <BsFillHeartFill /> <span>{likeNum}</span>
          </button>
          <button className="share">
            <FaShare /> <span>{shareNum}</span>
          </button>
        </div>
      </div>
    </PostStyle>
  );
};

export default Post;

const PostStyle = styled.div`
  width: 100%;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .top {
    width: 100%;
    display: flex;
    gap: 15px;
    align-items: center;

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      gap: 5px;

      h4 {
        font-size: 22px;
        a {
          text-decoration: none;
          color: var(--primaryColor);
          transition: 0.3s ease-in-out;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      p {
        font-size: 16px;
      }
    }
  }

  .center {
    display: flex;
    flex-direction: column;
    h3 {
      color: var(--primaryColor);
      font-size: 22px;
    }
    hr {
      width: 100%;
      height: 2px;
      background: var(--primaryColor500);
      margin: 10px 0;
    }
    p {
      color: var(--lightText);
    }
  }

  .bottom {
    display: flex;
    gap: 10px;

    button {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      background: #fff;
      padding: 10px;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      border: 2px solid var(--primaryColor);
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

      &:hover {
        background: var(--primaryColor);
        transform: scale(0.95);
      }

      span{
        font-size: 18px;
        transition: 0.3s ease-in-out;
      }
      &:hover span{
        color: #fff;
      }

      svg {
        width: 25px;
        height: 25px;
        color: var(--primaryColor);
        transition: 0.3s ease-in-out;
      }
      &:hover svg {
        color: var(--secondaryColor);
      }
    }
  }
`;
