// import { Container, Box } from '@mui/system
import { React, useEffect } from "react";

import { usePosts } from "../../Providers/PostProvider";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Header from "../Header/Header.js";
import { Card, Typography, Box, IconButton } from "@mui/material";
import { Container } from "@mui/system";

import AddPost from "../AddaPost/AddPost";

const Posts = () => {
  const { posts, setPosts, handlePostDelete, getAllPosts } = usePosts();
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
  const defaultImage =
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  const PostCard = ({ item }) => (
    <Container
      className="post"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "385px",
      }}
    >
      <img
        className="postImg"
        src={item.image || defaultImage}
        style={{
          width: "385px",
          height: "auto",
          objectFit: "cover",
          borderRadius: "7px",
          marginTop: "10px",

        }}
        alt="post"
      />
      <Container
        className="postInfo"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography className="postTitle" sx={{fontFamily: 'Alice',
  fontSize: '40px',
  fontWeight: 900,
  marginTop: '15px',
  cursor: 'pointer'}}>{item.title}</Typography>
        <span className="postDate" 
        style={{fontFamily: '"Lora", "serif"', 
        fontStyle: 'italic',
        fontSize: '15px',
        fontWeight: 400,
        color: '#999999',
        }}
        >{item.date}</span>
      </Container>
      <Typography className="postDesc"
      sx={{fontFamily: "Varela Round", 
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '24px',
      color: '#444444',
      marginTop: '15px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      webkitLineClamp: 4,
      webkitBoxOrient: 'vertical'}}
      
      >{item.content}</Typography>
      <IconButton
        aria-label="delete post"
        onClick={(e) => handleDelete(e, item.id)}
      >
        <DeleteForeverIcon />
      </IconButton>
    </Container>
  );

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      await handlePostDelete(id);
    } catch (e) {
      console.error("Error deleting post", e);
    }
    let newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
  };

  return (
    <div>
      <Header />
      <Container sx={{ bgcolor: "darkgrey" }}>
        {posts.map((item, index) => (
          <Container
            key={index}
            sx={{ display: "flex", justifyContent: "space-around", mb: "25px" }}
          >
            <Box sx={{ minWidth: 550 }}>
              <Card
                variant="outlined"
                sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}
              >
                <PostCard item={item} />
              </Card>
            </Box>
          </Container>
        ))}
      </Container>
    </div>
  );
};

export default Posts;
