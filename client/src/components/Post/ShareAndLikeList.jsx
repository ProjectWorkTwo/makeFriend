import React from "react";
import { styled } from "styled-components";
import { FaXmark } from "react-icons/fa6";
import profileImg from "../../assets/avatar/avatar1.png";
import { Link } from "react-router-dom";

const ShareAndLikeList = ({ reacterList, closeShareAndLikePopUp }) => {
  return (
    <ShareAndLikeListStyle>
      <div className="wrapper" >
        <FaXmark onClick={() => closeShareAndLikePopUp()} />
        <h4>Who liked your post:</h4>
        <div className="reactedList">
          <ul>
            {reacterList.map((reacter) => {
              const { profilePic, userName, fullName } = reacter;
              console.log(userName, fullName);
              <li key={userName}>
                <Link to={`/profile/${userName}`}>
                  {/* <img src={profilePic} alt={fullName} /> {fullName} */}
                  <img src={profileImg} alt={fullName} /> {fullName}
                </Link>
              </li>;
            })}
          </ul>
        </div>
      </div>
    </ShareAndLikeListStyle>
  );
};

export default ShareAndLikeList;

const ShareAndLikeListStyle = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  display: grid;
  place-items: center;

  .wrapper {
    height: 90%;
    max-height: 400px;
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

    & > svg {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 25px;
      height: 25px;
      color: var(--primaryColor);
      cursor: pointer;
    }

    h4 {
      font-size: 20px;
      color: var(--primaryColor);
      border-bottom: 2px solid var(--primaryColor);
      padding-bottom: 15px;
    }
    .reactedList {
      height: 100%;
      overflow-y: auto;
      ul {
        padding: 10px 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 15px;

        li a {
          display: flex;
          gap: 10px;
          align-items: center;
          color: var(--primaryColor500);

          img {
            width: 40px;
            height: 40px;
            object-fit: cover;
            border-radius: 50%;
          }
        }
      }
    }
  }
`;
