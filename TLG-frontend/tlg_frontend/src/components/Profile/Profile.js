
import React from "react";
import { Avatar, Box, Grid, Card, Button } from "@mui/material";
// import AthleteMaxList from "../AthleteMaxList/AthleteMaxList";
import PersonalInfoCard from "../PersonalInfoCard/PersonalInfoCard";
import LiftHistory from "../Lifts/LiftHistory";

const ViewAthleteDetail = () => {
    return (
        <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="center">
          {/* <Grid item xs={6} sx={{ margin: 3 }}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 300, height: 300 }}
              />
          </Grid> */}

        <Grid item sx={4}>
            <Card sx={{ marginTop: 3 }}>
            <PersonalInfoCard />
            <Button variant="outlined" href="/update-profile" sx={{ margin:1 }}>Edit Profile</Button>
            </Card>
        </Grid>
        </Grid>
        <Grid>
          <Grid item sx={8}>
            <Card sx={{ margin: 3 }}>
              <LiftHistory/>
              {/* <AthleteMaxList /> */}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ViewAthleteDetail;
// import { Grid } from '@mui/material';
// import ViewAthleteDetail from '../ViewAthleteDetail/ViewAthleteDetail';

// const Profile = () => {
//     return (
//         <div>
//             <ViewAthleteDetail/>
//             <Grid>
//             </Grid>
//         </div>
//     )
// }

// export default Profile;