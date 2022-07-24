import React, { useState, useEffect, createContext, useContext } from "react";

const axios = require("axios");
const PostContext = createContext({});

export const usePosts = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  // state for the Post and axios calls
  const [posts, setPosts] = useState([]);
  // state for the modal
  const [open, setOpen] = useState(false);

  const postCalls = async (method, endpoint = "", dataPayload = null) => {
    try {
      const payload = {
        method: method,
        headers: {
          authorization: `JWT ${localStorage.getItem("access")}`,
          "Content-Type": "multipart/form-data",
        },
      };
      payload.url = endpoint
        ? `${process.env.REACT_APP_API_URL}/tlg/posts/${endpoint}`
        : `${process.env.REACT_APP_API_URL}/tlg/posts/`;
      if (dataPayload) {
        payload.data = dataPayload;
      }
      const { data } = await axios(payload);
      return data;
    } catch (error) {
      console.error(`Error ${method} call for Posts`, error.message);
    }
  };

  const handlePostDelete = async (id) => {
    const data = postCalls("delete", id);
    return data;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAllPosts = async () => {
    try {
      const data = await postCalls("get");
      if (data.length !== posts.length) {
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const handlePostSubmit = async (postData) => {
    try {
      await postCalls("post", "", postData);

      await getAllPosts();
    } catch (e) {
      console.log("There's an error", e);
    }
    setOpen(false);
  };

  // modal state change handlers
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        getAllPosts,
        handlePostDelete,
        handlePostSubmit,
        handleOpen,
        handleClose,
        open,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
