import {
  Button,
  Box,
  Container,
  ImageList,
  ImageListItem,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ImageGallery = () => {
  // TO DO :
  // make call to save selected images stored in imageGallery
  // make API call to get photos from backend, return a JSON object and save in imageGallery instead of itemData

  // state
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageGallery, setImageGallery] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  console.log(imageGallery);
  // if selected image changes, create an object url for the selected image for image preview

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAllImages = async () => {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/tlg/image-gallery/`,
      config
    );
    if (imageGallery.length !== res.data.length) {
      setImageGallery(res.data);
    }
  };

  // useEffect to get all images from backend
  useEffect(() => {
    // get all images from backend

    getAllImages();
  }, [imageGallery, getAllImages]);
  console.log("before upload:", imageGallery);

  // function to handle image selection
  const uploadImage = async () => {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/tlg/image-gallery/`,
        { image: selectedImage },
        config
      );
    } catch (error) {
      console.log(error);
    }
    console.log("after upload:", imageGallery);
    setImageGallery([...imageGallery]);

    setSelectedImage(null);
  };

  // upload an image
  const fileInput = () => {
    return (
      <div>
        <input
          accept="image/*"
          type="file"
          id="select-image"
          style={{ display: "none" }}
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />
        <label htmlFor="select-image">
          <Button
            variant="contained"
            sx={{ backgroundColor: "black" }}
            component="span"
          >
            Upload Image
          </Button>
        </label>
      </div>
    );
  };

  // image preview
  const previewPhoto = () => {
    return (
      <div>
        {imageUrl && selectedImage && (
          <div>
            <Box mt={2} textAlign="center">
              <div>Image Preview:</div>
              <img src={imageUrl} alt={selectedImage.name} height="100px" />
            </Box>
            <Button
              variant="contained"
              sx={{ backgroundColor: "black" }}
              component="span"
              onClick={uploadImage}
            >
              CLICK THIS TO UPLOAD THE PREVIEW
            </Button>
          </div>
        )}
      </div>
    );
  };
  const deleteImage = async (e, id) => {
    console.log("ID I think I'm getting:", id);
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/tlg/image-gallery/${id}`,
        config
      );
    } catch (error) {
      console.log(error);
    }
    setImageGallery(imageGallery.filter((image) => image.id !== id));
  };

  // image gallery
  return (
    <Container>
      <Container
        sx={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          backgroundColor: "lightgrey",
          minWidth: "100%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1633680266538-70b2320747f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fHdoaXRlYm9hcmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60)",
          height: "405px",
        }}
      >
        <Box>
          {/* <Container sx={{backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: 'url(https://images.unsplash.com/photo-1633680266538-70b2320747f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fHdoaXRlYm9hcmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60)', height: '405px',   }} > */}
          <Typography
            sx={{
              fontFamily: "Alice-Regular",
              color: "black",
              position: "absolute",
              top: "25%",
              left: "50%",
              transform: "translate(-50%, -80%)",
              fontSize: "110px",
            }}
          >
            Image Gallery
          </Typography>

          {/* </Container> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: "100px",
              position: "absolute",
              top: "25%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {fileInput()}
            {previewPhoto()}
          </Box>
        </Box>
      </Container>
      <ImageList sx={{ width: 1150 }} cols={4} rowHeight={310}>
        {imageGallery.map((item, idx) => (
          <Container sx={{ backgroundColor: "lightgrey" }}>
            <ImageListItem key={idx} sx={{ mt: 2 }}>
              <img
                style={{ maxHeight: "250px", maxWidth: "250px" }}
                src={item.image}
                alt={item.author}
                loading="lazy"
              />
              <Container sx={{ display: "flex", justifyContent: "center" }}>
                <IconButton
                  sx={{ mt: "10px" }}
                  onClick={(e) => deleteImage(e, item.id)}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Container>
            </ImageListItem>
          </Container>
        ))}
      </ImageList>
    </Container>
  );
};

export default ImageGallery;
