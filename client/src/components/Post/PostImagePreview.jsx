import React from "react";
import { styled } from "styled-components";
import { FaXmark } from "react-icons/fa6";
import CloseIcon2 from "../styles/CloseIcon2";

const PostImagePreview = ({ imgLink, imgTitle, closeImgPreview }) => {
  return (
    <ImgPreview>
      <CloseIcon2 onClick={() => closeImgPreview()}>
        <FaXmark />
      </CloseIcon2>
      <img src={imgLink} alt={imgTitle} />
    </ImgPreview>
  );
};

export default PostImagePreview;

const ImgPreview = styled.figure`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.8);

  img {
    width: 90%;
    max-width: 500px;
    height: 90%;
    max-height: 600px;
    object-fit: contain;
  }
  CloseIcon{
    background: red !important;
  }
`;
