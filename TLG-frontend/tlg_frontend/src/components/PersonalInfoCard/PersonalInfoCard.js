import React from "react";
import { CardContent, Typography, Box, Grid, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { useAthletes } from "../../Providers/AthleteProvider";
import { useEffect } from "react";

const PersonalInfoCard = () => {
  // const { name, address, weightClass } = props;
  const { user: currentUser } = useSelector((state) => state.auth);
  const { getAthleteInfo, individualAthlete } = useAthletes();
  // const [athleteInfo, setAthleteInfo] = useState([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAthleteInformation = async () => {
    await getAthleteInfo(currentUser.id);
  };
  useEffect(() => {
    if (currentUser) getAthleteInformation();
  }, [currentUser, getAthleteInformation]);

  useEffect(() => {
    getAthleteInformation();
  }, [individualAthlete, getAthleteInformation]);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container justifyContent="center" sx={{ mt: 3 }}>
          <Avatar
            alt="Remy Sharp"
            src={individualAthlete.profile_picture}
            sx={{ width: 300, height: 300 }}
          />
        </Grid>
        <CardContent sx={{ width: 400 }}>
          {individualAthlete && (
            <div>
              <Typography variant="body2">
                Name:{individualAthlete.athlete.first_name}{" "}
                {individualAthlete.athlete.last_name}{" "}
              </Typography>
              <Typography variant="body2">
                Team: {individualAthlete.team.team_name}{" "}
              </Typography>
              <Typography variant="body2">
                Grade: {individualAthlete.grade}{" "}
              </Typography>
              <Typography variant="body2">
                Birthday: {individualAthlete.dob}
              </Typography>
              <Typography variant="body2">
                Weight: {individualAthlete.weight}
              </Typography>
              <Typography variant="body2">
                Weight Class: {individualAthlete.weightclass}
              </Typography>
            </div>
          )}
        </CardContent>
      </Box>
    </div>
  );
};

export default PersonalInfoCard;
