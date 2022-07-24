import {
  Typography,
  FormControl,
  Container,
  InputLabel,
  Box,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
} from "@mui/material";


const AddLiftSession = () => {
  return (
    <Container>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          bgcolor: "whitesmoke",
        }}
        noValidate
        autoComplete="off"
      >
        <Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h3">Log your lift sesh here</Typography>
            <br />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select a lift
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={}
                label="Select a Lift"
                // onChange={handleChange}
              >
                <MenuItem value="power_clean">Power Clean</MenuItem>
                <MenuItem value="front_squat">Front Squat</MenuItem>
                <MenuItem value="squat_clean">Squat Clean</MenuItem>
                <MenuItem value="push_jerk">Push Jerk</MenuItem>
                <MenuItem value="power_snatch">Power Snatch</MenuItem>
                <MenuItem value="squat_snatch">Squat Snatch</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={7}>
            <FormControl>
              <InputLabel htmlFor="weight">
                Enter Lift Weight (in pounds)
              </InputLabel>
              <br />
              <br />
              <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="75"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={7}>
            <Button variant="contained">Save</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AddLiftSession;
