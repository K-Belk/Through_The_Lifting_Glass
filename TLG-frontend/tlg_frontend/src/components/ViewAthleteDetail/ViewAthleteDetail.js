import React from "react";
import { Avatar, Box, Grid, Card } from "@mui/material";
// import AthleteMaxList from "../AthleteMaxList/AthleteMaxList";
import PersonalInfoCard from "../PersonalInfoCard/PersonalInfoCard";
import LiftHistory from "../Lifts/LiftHistory";

const ViewAthleteDetail = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ margin: 3 }}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 300, height: 300 }}
            />
          </Grid>

          <Grid item sx={4}>
            <Card sx={{ marginTop: 5 }}>
              <PersonalInfoCard />
            </Card>
          </Grid>
        </Grid>
        <Grid>
          <Grid item sx={8}>
            Max but with only this user not all
            <Card sx={{ margin: 3 }}>
              {/* lift history causing to blow up */}
              {/* <LiftHistory/> */}
              {/* <AthleteMaxList /> */}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ViewAthleteDetail;
