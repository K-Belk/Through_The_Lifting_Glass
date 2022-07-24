import AddPhotoAlternateTwoToneIcon from "@mui/icons-material/AddPhotoAlternateTwoTone";
import AddReactionTwoToneIcon from "@mui/icons-material/AddReactionTwoTone";
import CloseIcon from "@mui/icons-material/Close";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import Picker from "emoji-picker-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { usePosts } from "../../Providers/PostProvider";

const AddPost = () => {
  const {user: currentUser} = useSelector((state) => state.auth);
  const { handleOpen, handleClose, handlePostSubmit, open } = usePosts();

  const [showPicker, setShowPicker] = useState(false);
  const [imgUpload, setImgUpload] = useState(false);
  const [img, setImg] = useState(null);
  const [inputStr, setInputStr] = useState("");
  const [data, setData] = useState({
    title: "",
    content: inputStr,
    image: img,
  });

  const onEmojiClick = (e, emojiObject, name) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
    handleChange(e, name);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title: data.title,
      content: inputStr,
      image: img,
    };

    handlePostSubmit(postData);
  };

  return (
    <div>
      {currentUser && currentUser.account_type && currentUser.account_type=== 2 ? (
      <Button variant="contained" onClick={handleOpen} sx={{backgroundColor:'black'}}>
        Tell the team
      </Button>
      ):<></>}
      <Modal
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Card
          sx={{
            minWidth: "600px",
            minHeight: "400px",
            backgroundColor: "#333737",
            borderRadius: "30px",
          }}
        >
          {" "}
          <Grid container justify="space between" alignItems="center">
            <CardHeader sx={{ textAlign: "center" }} title="Create a Post" />
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <CardContent>
            <Container style={{ width: "100%" }}>
              <TextField
                style={{ width: "100%", backgroundColor: "#858787" }}
                required
                id="outlined-required"
                name="title"
                value={data.title}
                placeholder="Enter Title"
                onChange={handleChange}
              />
            </Container>
            <Container style={{ width: "100%" }}>
              <TextField
                style={{ width: "100%", backgroundColor: "#d6d7d7" }}
                id="outlined-multiline-static"
                name="content"
                multiline
                minRows={4}
                placeholder="Got a thought?"
                value={inputStr}
                onChange={(e) => setInputStr(e.target.value, e.target.name)}
              />
            </Container>
            <Container>
              <IconButton onClick={() => setImgUpload((val) => !val)}>
                <AddPhotoAlternateTwoToneIcon />
              </IconButton>
              <IconButton onClick={() => setShowPicker((val) => !val)}>
                <AddReactionTwoToneIcon />
              </IconButton>
              <Container>
                {imgUpload && (
                  <input
                    accept="image/*"
                    type="file"
                    id="select-image"
                    onChange={(e) => {
                      setImg(e.target.files[0]);
                    }}
                  />
                )}
              </Container>
              <Modal
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={showPicker}
                onClose={() => setShowPicker((val) => !val)}
              >
                {
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Picker
                      onEmojiClick={onEmojiClick}
                      pickerStyle={{ width: "14%" }}
                    />
                  </Box>
                }
              </Modal>
            </Container>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <Button
              style={{
                width: "80%",
                backgroundColor: "black",
                borderRadius: "20px",
              }}
              variant="outlined"
              size="large"
              onClick={handleSubmit}
            >
              Post
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
};

export default AddPost;
