import React, { useState } from "react";
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
} from "@mui/material";

import { useTeam } from "../../Providers/TeamProvider";

const defaultValues = {
  "team_name": "",
  "primary_color": "",
  "secondary_color": "",
  "gender": "",
};

const NewTeam = () => {
  const { handleTeamSubmit } = useTeam();

  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleTeamSubmit(formValues);
  };

  return (
    <Box>
      <Typography
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
        variant="h3"
      >
        Create a team
      </Typography>
      <Container
        sx={{
          backgroundColor: "lightgray",
          mt: "80px",
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
            <Grid sx={{ mt: "20px" }} item style={{ width: "400px," }}>
              <TextField
                style={{ width: "400px" }}
                id="name-input"
                name="team_name"
                label="Team Name (School Name + Mascot)"
                type="text"
                value={formValues.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid sx={{ mt: "20px" }} item style={{ width: "400px" }}>
              <TextField
                style={{ width: "400px" }}
                id="color1_input"
                name="primary_color"
                label="First Color"
                type="text"
                value={formValues.primary_color}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid sx={{ mt: "20px" }} item style={{ width: "400px" }}>
              <TextField
                style={{ width: "400px" }}
                id="color2_input"
                name="secondary_color"
                label="Second Color"
                type="text"
                value={formValues.secondary_color}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
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
                    value="Boys"
                    control={<Radio size="small" />}
                    label="Boys"
                  />
                  <FormControlLabel
                    key="female"
                    value="Girls"
                    control={<Radio size="small" />}
                    label="Girls"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item></Grid>

            <Button
              variant="contained"
              style={{ backgroundColor: "black", marginBottom: "10px" }}
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

export default NewTeam