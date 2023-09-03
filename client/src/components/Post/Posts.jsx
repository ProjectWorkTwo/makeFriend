import React, { useEffect, useState } from "react";
import Post from "./Post";
import styled from "styled-components";
import CreatePost from "./CreatePost";
import ButtonStyle from "../styles/Button";

const Posts = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postsData, setPostsData] = useState([]);

  const mergeUserNameAndPost = ()=>{

  }

  const postDataMapping = (postList)=>{
    setPostsData(prev => []);
    let postListData = [];
    postList.forEach((postUserAndPostData)=>{
      let userName = postUserAndPostData.userName;
      let postsData = postUserAndPostData.postData;
      let allPostOfThisAuthor = [];
      postsData.forEach((post)=>{
        
      })
    })

    // console.log(postList);
  }

  const getPostsData = async ()=>{
    const response = await fetch('http://localhost:8000/getPost');
    const data = await response.json();
  
    postDataMapping(data);
  }

  useEffect(()=>{
    getPostsData();

    // console.log(postData);
  }, [])

  const createPostHandle = () => {
    setShowCreatePost((prev) => !prev);
  };

  // const allPosts = [
  //   {
  //     userName: "UserName1",
  //     postTitle: "Post Title Here1",
  //     postedDate: "13 May 2023",
  //     postDescription: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
  //       sint fugiat quibusdam porro temporibus ipsam recusandae fugit
  //       molestiae, id eveniet delectus minima in omnis eaque!`,
  //     likeNum: 550,
  //     shareNum: 20,
  //   },
  //   {
  //     userName: "UserName2",
  //     postTitle: "Post Title Here2",
  //     postedDate: "13 May 2023",
  //     postDescription: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
  //       sint fugiat quibusdam porro temporibus ipsam recusandae fugit
  //       molestiae, id eveniet delectus minima in omnis eaque!`,
  //     likeNum: 550,
  //     shareNum: 20,
  //   },
  //   {
  //     userName: "UserName3",
  //     postTitle: "Post Title Here3",
  //     postedDate: "13 May 2023",
  //     postDescription: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
  //       sint fugiat quibusdam porro temporibus ipsam recusandae fugit
  //       molestiae, id eveniet delectus minima in omnis eaque!`,
  //     likeNum: 550,
  //     shareNum: 20,
  //   },
  //   {
  //     userName: "UserName4",
  //     postTitle: "Post Title Here4",
  //     postedDate: "13 May 2023",
  //     postDescription: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
  //       sint fugiat quibusdam porro temporibus ipsam recusandae fugit
  //       molestiae, id eveniet delectus minima in omnis eaque!.
  //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
  //       sint fugiat quibusdam porro temporibus ipsam recusandae fugit
  //       molestiae, id eveniet delectus minima in omnis eaque!`,
  //     likeNum: 550,
  //     shareNum: 20,
  //   },
  // ];

  return (
    <PostStyle>
      <ButtonStyle onClick={createPostHandle}>Create Post</ButtonStyle>
      {showCreatePost && <CreatePost useShowCreatePost={setShowCreatePost} />}
      {postsData.map((postData) => {
        return <Post postData={postData} key={postData.userName} />;
      })}
    </PostStyle>
  );
};

export default Posts;

const PostStyle = styled.div`
  background: var(--secondaryColor);
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
