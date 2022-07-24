import React, { useEffect } from "react";
import { Tab, Box, Tabs, Typography } from "@mui/material";
import ViewAllAthletes from "../components/ViewAllAthletes/ViewAllAthletes";
import AthleteMaxList from "../components/AthleteMaxList/AthleteMaxList";
import Posts from "../components/Posts/Posts";
import { Container } from "@mui/system";
import liftAPI from "../api/liftApi";

const CoachDashboard = () => {
  const [value, setValue] = React.useState("athletes");

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  useEffect(() => {
    const getTeamLiftHistory = async (team_id) => {
      await liftAPI.fetchTeamLiftHistory(team_id);
    };
    getTeamLiftHistory(1);
  }, []);

  return (
    <div>
      <Container>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            backgroundColor: "whitesmoke",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="athletes" value="athletes" />
            <Tab label="Progress" value="progress" />
            <Tab label="Info Board" value="posts" />
          </Tabs>
        </Box>
      </Container>
      {value === "athletes" && (
        <div>
          <Container>
            <Box sx={{display:'flex',justifyContent:'center', backgroundColor:'gray'}}>
              <Typography variant="h1" sx={{fontFamily:'Alice-Regular', justifyContent:'center', mt: 4, mb:4}}>Team Roster</Typography>
            </Box>
          </Container>
          <Container
            sx={{
              backgroundColor: "whitesmoke",
              
            }}
          >
            <ViewAllAthletes />
          </Container>
        </div>
      )}
      {value === "progress" && (
        <div>
          <Container>
          <Box sx={{display:'flex',justifyContent:'center', backgroundColor:'gray'}}>
              <Typography variant="h1" sx={{fontFamily:'Alice-Regular', justifyContent:'center', mt: 4, mb:4}}>Team MAX Progress</Typography>
            </Box>
          </Container>
          <Container>
            <AthleteMaxList />
          </Container>
        </div>
      )}
      {value === "posts" && (
        <div>
          <Container>
            <Posts />
          </Container>
        </div>
      )}
    </div>
  );
};

export default CoachDashboard;
