import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import resume from "../../css/icons/resume.png";
import lifter from "../../css/icons/weightlifter.png";
import graph from "../../css/icons/wave-graph.png";
import bell from "../../css/icons/notification.png";
import blog from "../../css/icons/blog.png";
import calendar from "../../css/icons/calendar.png";
import chat from "../../css/icons/chat.png";
import picture from "../../css/icons/picture.png";

const AthleteDash = () => {
  const athleteNav = [
    {
      id: 1,
      image: resume,
      name: "Personal Info",
      description: "View and edit your personal information",
      button: "Go to profile",

      path: "/profile",
    },
    {
      id: 2,
      image: lifter,
      name: "Log a Lift",
      description: "Log your lift",
      button: "Log a lift",
      path: "/add-lift-session",
    },
    {
      id: 3,
      image: graph,
      name: "Lift History",
      description: "View your lift history",
      button: "Go To Progress",
      path: "/progress",
    },
    {
      id: 4,
      image: bell,
      name: "Bell Ringers",
      description: "View who is bell ringing ",
      button: "Go To Bell Ringers",
      path: "/bell-ringers",
    },
    {
      id: 5,
      image: picture,
      name: "Image Gallery",
      description: "View the image gallery",
      button: "Go To Images",
      path: "/images",
    },
    {
      id: 6,
      image: blog,
      name: "Posts",
      description: "View the posts",
      button: "Go To Posts",
      path: "/posts",
    },
    {
      id: 7,
      image: calendar,
      name: "Calendar",
      description: "View the calendar",
      button: "Go To Calendar",
      path: "/calendar",
    },
    {
      id: 8,
      image: chat,
      name: "Chat",
      description: "Chat with other athletes",
      button: "Go To Chat",
      path: "/chat",
    },
  ];
  return (
    <Box sx={{ flexGrow: 1, minHeight: "400px" }}>
      <Grid container sx={{ display: "flex", justifyContent: "space-around" }}>
        {athleteNav.map((item) => (
          <Grid
            item
            xs={14}
            mt={10}
            md={2.5}
            lg={2.5}
            minHeight={250}
            key={item.id}
            sx={{ backgroundColor: "lightgray", borderRadius: "30px" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    mt:2
                  }}
                >
                  <img
                    src={item.image}
                    alt="feature"
                    style={{ width: "100%", height: "120px" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2">{item.description}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button variant="contained" href={item.path} sx={{backgroundColor:'black', mt:1}}>
                    {item.button}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AthleteDash;
