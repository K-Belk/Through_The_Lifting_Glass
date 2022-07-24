import { Container, Typography, BottomNavigation, BottomNavigationAction } from "@mui/material";
import React from "react";
import Hero from "../components/Hero/Hero";
import Section from "../components/Section/Section";
import KeyboardDoubleArrowUpTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowUpTwoTone';
import "../../src/index.css";
import Testimonials from "../components/Testimonials/Testimonials";


const HomePage = () => {
 

  const styles = {
    heroContainer: {
      backgroundImage: `url("https://images.unsplash.com/photo-1434754205268-ad3b5f549b11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnwxMDUyMjAxM3x8ZW58MHx8fHw%3D")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "94vh",
      minWidth: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <>
      <Container sx={styles.heroContainer}>
        <Hero />
      </Container>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h1"
          sx={{
            color: "whitesmoke",
            marginTop: "4rem",
            fontSize: "4.9rem",
            fontFamily: "Alice-Regular",
          }}
        >
          What can TLG do for you and your team?
        </Typography>
      </Container>
      <Container>
        <Section />
      </Container>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h1"
          sx={{
            color: "whitesmoke",
            marginTop: "4rem",
            fontSize: "4.9rem",
            fontFamily: "Alice-Regular",
          }}
        >
          What everyone says about TLG...
        </Typography>
      </Container>
      <Container>
        <Testimonials />
      </Container>
      <BottomNavigation sx={{bgcolor: "#141010"}}>
        <BottomNavigationAction icon={<KeyboardDoubleArrowUpTwoToneIcon sx={{bgcolor:'lightgray'}}/>} onClick={toTop} />
        </BottomNavigation>
    </>
  );
};

export default HomePage;
