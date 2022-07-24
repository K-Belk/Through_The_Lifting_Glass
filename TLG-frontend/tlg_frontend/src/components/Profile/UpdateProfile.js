import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Button,
  Box,
  Typography,
  Container,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";

import AddPhotoAlternateTwoToneIcon from "@mui/icons-material/AddPhotoAlternateTwoTone";
import { useTeam } from "../../Providers/TeamProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useAthletes } from "../../Providers/AthleteProvider";
import moment from "moment";

import { useEffect } from "react";

let defaultValues = {
  grade: "",
  gender: "",
  weight: 0,
  dob: "",
  team: 0,
  profile_picture: "",
};

const UpdateProfile = () => {
  // context handlers
  const { user: currentUser } = useSelector((state) => state.auth);
  const {
    handleAthleteSubmit,
    getAthleteInfo,
    individualAthlete,
    handleAthleteUpdate,
  } = useAthletes();
  const { team } = useTeam();
  const navigate = useNavigate();


  // this components state
  // const [date, setDate] = useState(new Date());

  const [formValues, setFormValues] = useState(defaultValues);
  const [imgUpload, setImgUpload] = useState(false);
  // const [img, setImg] = useState(null);

  useEffect(() => {
    if (currentUser) {
      getAthleteInfo(currentUser.id);

      if (individualAthlete) {
        setFormValues({
          grade: individualAthlete.grade,
          gender: individualAthlete.gender,
          weight: individualAthlete.weight,
          dob: individualAthlete.dob,
          team: individualAthlete.team,
        });
      } else {
        setFormValues(defaultValues);
      }
    }
  }, [currentUser, getAthleteInfo, individualAthlete]);

  // event handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const profImage = e.target.files[0];

    setFormValues({
      ...formValues,
      profile_picture: profImage,
    });
  };
  // date change handler
  const handleChange = (date) => {
    const newDate = moment(date).format("YYYY-MM-DD");

    setFormValues({
      ...formValues,
      dob: newDate,
    });
  };
  // submit handler team
  const handleTeamSelect = (e) =>
    setFormValues({ ...formValues, team: e.target.value });

  // submit handler for athlete profile
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (individualAthlete) {
      await handleAthleteUpdate(formValues, individualAthlete.athlete.id);
    } else {
      await handleAthleteSubmit(formValues);
    }
    navigate("/profile");
  };

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ m: 2 }}
        style={{ backgroundColor: "black" }}
        href="/profile"
      >
        Return to Profile
      </Button>
      <Typography
        style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
        variant="h3"
      >
        Update Your Profile
      </Typography>
      <Container
        sx={{
          backgroundColor: "lightgray",
          mt: "50px",
          borderRadius: "30px",
          width: "50%",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Grid sx={{ mt: "10px" }} item style={{ width: "200px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="grade"
                  value={formValues.grade}
                  label="Grade"
                  onChange={handleInputChange}
                >
                  <MenuItem value="Freshman">Freshman</MenuItem>
                  <MenuItem value="Sophomore">Sophomore</MenuItem>
                  <MenuItem value="Junior">Junior</MenuItem>
                  <MenuItem value="Senior">Senior</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid sx={{ mt: "20px" }} item>
              <TextField
                id="weight-input"
                name="weight"
                label="Weight"
                type="number"
                value={formValues.weight}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid sx={{ mt: "20px" }} item>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Birthday"
                  inputFormat="MM/DD/yyyy"
                  value={formValues.dob}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid sx={{ mt: "20px" }} item>
              <FormControl>
                <FormLabel
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  Gender
                </FormLabel>
                <RadioGroup
                  name="gender"
                  value={formValues.gender}
                  onChange={handleInputChange}
                  row
                >
                  <FormControlLabel
                    key="male"
                    value="M"
                    control={<Radio size="small" />}
                    label="Male"
                  />
                  <FormControlLabel
                    key="female"
                    value="F"
                    control={<Radio size="small" />}
                    label="Female"
                  />
                </RadioGroup>
                <FormLabel
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  Team
                </FormLabel>
                <select
                  onChange={handleTeamSelect}
                  name="team"
                  value={formValues.team}
                  label="Team"
                >
                  <option value="Select a Team"> -- Team Name -- </option>
                  {team.map((team, idx) => (
                    <option key={idx} value={team.id}>
                      {team.team_name}
                    </option>
                  ))}
                </select>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <FormLabel
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  Upload a Profile Picture
                </FormLabel>
                <IconButton onClick={() => setImgUpload((val) => !val)}>
                  <AddPhotoAlternateTwoToneIcon />
                </IconButton>
              </FormControl>
            </Grid>
            <Grid>
              {imgUpload && (
                <input
                  accept="image/*"
                  type="file"
                  id="select-image"
                  // onChange={(e) => {handleImageChange(e.target.files[0].name)}}
                  onChange={handleImageChange}
                  // onChange={(e) => {setImg(e.target.files[0].name)}}
                />
              )}
            </Grid>
            <Button
              variant="contained"
              sx={{ mt: "20px", mb: "10px" }}
              style={{ backgroundColor: "black" }}
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default UpdateProfile;
