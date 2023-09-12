import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import avatar from "../../assets/avatar/avatar1.png";
import { BsFillHeartFill } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";
import ShareAndLikeList from "./ShareAndLikeList";
import DOMPurify from "dompurify";
import PostImagePreview from "./PostImagePreview";

import PropTypes from "prop-types";

const Post = ({ postData, setShowGoToLogin }) => {
  const {
    fullName,
    userName,
    title,
    createdDate,
    description,
    postLikeShareList,
    _id: postId,
    postImg,
  } = postData;

  const authorUserName = localStorage.getItem("userLoginData");

  const formateDescription = (description) => {
    return description
      .replaceAll("\n", "<br/>")
      .replace("\t", "&nbsp;&nbsp;&nbsp;");
  };

  const descriptionShort =
    description.length > 150 ? description.slice(0, 151) : description;

  const [liked, setLiked] = useState(false);
  const [totalLikeList, setTotalLikeList] = useState([]);
  const [totalShareList, setTotalShareList] = useState([]);
  const [toogleText, setToggleText] = useState(false);
  const [showHideLike, setShowHideLike] = useState(false);
  const [showHideShare, setShowHideShare] = useState(false);
  const [showHideImgPreview, setShowHideImgPreview] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const getProfilePic = async () => {
      const res = await fetch(
        `http://localhost:8000/getProfilePic/${userName}`
      );

      const { profilePic } = await res.json();

      if (res.status !== 200) {
        setProfilePic((prev) => avatar);
      } else {
        setProfilePic((prev) => `http://localhost:8000/uploads/${profilePic}`);
      }
    };
    getProfilePic();
  }, []);

  const PostLikeShareList = async () => {
    // const res = await fetch(`http://localhost:8000/getLikeShareList/${postId}`);
    // const data = await res.json();
    // const { likeList, shareList } = data;
    // console.log(likeList, shareList);
    // let isUserLikedPost = -1;
    // if (likeList.length) {
    //   isUserLikedPost = likeList.findIndex(
    //     (user) => user.userName === userName
    //   );
    // }
    // if (isUserLikedPost === -1) {
    //   setLiked((prev) => false);
    // } else {
    //   setLiked((prev) => true);
    // }
    // setTotalLikeList((prev) => likeList);
    // setTotalShareList((prev) => shareList);
  };

  useEffect(() => {
    PostLikeShareList();
  }, []);

  // const UpdateLikeList = async () => {
  //   console.log(totalLikeList);
  //   const res = await fetch(`http://localhost:8000/getLikeShareList/${postId}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(
  //       {totalLikeList, liked, fullName}
  //     ),
  //   });
  // };

  // useEffect(() => {
  //   UpdateLikeList();
  // }, [liked]);

  const handleShowHideLike = () => {
    if (!authorUserName) {
      return setShowGoToLogin((prev) => true);
    }

    setShowHideLike((prev) => true);
    setShowHideShare((prev) => false);
  };
  const handleShowHideShare = () => {
    if (!authorUserName) {
      return setShowGoToLogin((prev) => true);
    }

    setShowHideShare((prev) => true);
    setShowHideLike((prev) => false);
  };

  const closeShareAndLikePopUp = () => {
    setShowHideLike(false);
    setShowHideShare(false);
  };
  const closeImgPreview = () => {
    setShowHideImgPreview(false);
  };

  const showHideImagePreviewHandle = () => {
    if (!authorUserName) {
      return setShowGoToLogin((prev) => true);
    }

    setShowHideImgPreview((prev) => !prev);
  };

  const handleToggleText = () => {
    if (!authorUserName) {
      return setShowGoToLogin((prev) => true);
    }
    setToggleText((prev) => !prev);
  };

  const resetDescription = () => {
    return description.length > 20
      ? toogleText
        ? formateDescription(description)
        : formateDescription(descriptionShort)
      : formateDescription(description);
  };

  const UpdateLikeList = async () => {
    // console.log(totalLikeList);
    // const res = await fetch(`http://localhost:8000/getLikeShareList/${postId}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(
    //     {totalLikeList, liked, fullName, userName, postId}
    //   ),
    // });
  };

  const handleShare = ()=>{
    if (!authorUserName) {
      return setShowGoToLogin((prev) => true);
    }
  }

  const addOrRemoveLike = () => {
    if (!authorUserName) {
      return setShowGoToLogin((prev) => true);
    }

    UpdateLikeList();
    let existIndex = false;
    existIndex = totalLikeList.findIndex((element) => {
      // console.log(element);
      return element.userName === userName;
    });
    if (existIndex === -1) {
      setTotalLikeList((prev) => [
        ...prev,
        {
          userName,
          fullName,
        },
      ]);
      console.log(totalLikeList);
      setLiked((prev) => true);
    } else {
      totalLikeList.splice(existIndex, 1);
      setTotalLikeList((prev) => totalLikeList);
      console.log(totalLikeList);
      setLiked((prev) => false);
    }
    // console.log(liked);
    // const userData = {
    //   likedUserName: userName,
    //   fullName,
    // };
    // console.log(
    //   totalLikeList.find(
    //     (data) =>
    //       data.likedUserName === userData.likedUserName &&
    //       data.fullName === userData.fullName
    //   )
    // );
    // totalLikeList = Array.from(new Set([...totalLikeList, {
    //   likedUserName: userName,
    //   fullName
    // }]));
    // console.log(totalLikeList);
    // console.log(isExist);
    // if(totalLikeList.includes(userName))
  };

  const likeHandle = async () => {
    // const res = await fetch("http://localhost:8000/likingPost", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     userName,
    //     fullName,
    //     addOrRemove,
    //     postId
    //   }),
    // });
    // let data = await res.json();
  };
  return (
    <PostStyle>
      {showHideLike && (
        <ShareAndLikeList
          reacterList={totalLikeList}
          closeShareAndLikePopUp={closeShareAndLikePopUp}
        />
      )}
      {showHideShare && (
        <ShareAndLikeList
          reacterList={totalShareList}
          closeShareAndLikePopUp={closeShareAndLikePopUp}
        />
      )}

      {showHideImgPreview && (
        <PostImagePreview
          imgLink={`http://localhost:8000/uploads/${postImg}`}
          imgTitle={title}
          closeImgPreview={closeImgPreview}
        />
      )}

      <div className="wrapper">
        <div className="top">
          <div className="avatar">
            <img src={profilePic} alt="" />
          </div>
          <div className="info">
            <h4>
              <Link to={`/profile/${userName}`}>{fullName}</Link>
            </h4>
            <Link to={`/profile/${userName}`} className="userName">
              {userName}
            </Link>
            <p>{createdDate}</p>
          </div>
        </div>
        <div className="center">
          <h3>{title}</h3>
          <hr />
          <article>
            {postImg && (
              <figure onClick={showHideImagePreviewHandle}>
                <img
                  src={`http://localhost:8000/uploads/${postImg}`}
                  alt={title}
                />
              </figure>
            )}

            <div className="content">
              {/* dangerouslySetInnerHTML is like innerHTML in DOM */}
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(resetDescription()),
                }}
              ></p>
              {description !== descriptionShort && (
                <span className="textToogle" onClick={handleToggleText}>
                  {" "}
                  {toogleText ? "...See less" : "...See More"}
                </span>
              )}
            </div>
          </article>
        </div>
        <div className="bottom">
          <div className="likeInfo">
            <span onClick={handleShowHideLike}>
              {totalLikeList.length >= 1000
                ? `${Number((totalLikeList.length / 1000).toFixed(1))} k `
                : totalLikeList.length + " "}
              Likes
            </span>
            {/* <button
              className={`like ${liked ? "active" : ""}`}
              onClick={likeHandle}
            >
              <BsFillHeartFill />
            </button> */}
            <button
              className={`like ${liked ? "active" : ""}`}
              onClick={addOrRemoveLike}
            >
              <BsFillHeartFill />
            </button>
          </div>
          <div className="shareInfo">
            <span onClick={handleShowHideShare}>
              {totalShareList.length >= 1000
                ? `${Number((totalShareList.length / 1000).toFixed(1))} k `
                : totalShareList.length + " "}{" "}
              Shares
            </span>
            <button className="share" onClick={handleShare}>
              <FaShare />
            </button>
          </div>
        </div>
      </div>
    </PostStyle>
  );
};

Post.propTypes = {
  fullName: PropTypes.string,
  userName: PropTypes.string,
  title: PropTypes.string,
  createdDate: PropTypes.string,
  description: PropTypes.string,
  postLikeShareList: PropTypes.array,
  _id: PropTypes.string,
  postImg: PropTypes.string,
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
      flex-shrink: 0;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      background: url(${avatar});
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      gap: 2px;

      h4 {
        font-size: 20px;
        text-transform: capitalize;
        line-height: normal;
        a {
          text-decoration: none;
          color: var(--primaryColor);
          transition: 0.3s ease-in-out;

          &:hover {
            text-decoration: underline;
          }
        }
      }
      .userName {
        font-size: 15px;
        color: var(--primaryColor);
      }

      p {
        font-size: 14px;
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
      margin: 15px 0;
    }
    article {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 15px;

      figure {
        width: 100%;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .content {
        p {
          font-size: 16px;
          color: var(--lightText);
          line-height: 1.5;
          display: inline;
        }
        span.textToogle {
          color: var(--primaryColor);
          font-weight: 500;
          text-transform: capitalize;
          cursor: pointer;
          margin-left: 10px;
          user-select: none;
          display: inline;
          transition: 0.2s ease;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .bottom {
    display: flex;
    gap: 10px;

    .likeInfo,
    .shareInfo {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 5px;

      span {
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }

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
        gap: 15px;

        &:hover,
        &.active {
          background: var(--primaryColor);
          transform: scale(0.95);
        }

        span {
          font-size: 20px;
          transition: 0.3s ease-in-out;
        }
        &:hover span,
        &.active span {
          color: #fff;
        }

        svg {
          width: 25px;
          height: 25px;
          color: var(--primaryColor);
          transition: 0.3s ease-in-out;
        }
        &:hover svg,
        &.active svg {
          color: var(--secondaryColor);
        }
      }
    }
  }
`;
