import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const btnStyle = {
  color: "white",
  borderWidth: 1,
  border: "2px solid",
  borderColor: "white",
};

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const WeatherModal = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [weatherIcon, setWeatherIcon] = useState();
  const [location, setLocation] = useState("");
  const WeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=28fe2489cee1c29d725c33f09ebaa172`;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      axios({
        method: "get",
        url: WeatherURL,
        withCredentials: false,
      }).then((response) => {
        setData(response.data);
        console.log(response.data);
      });

      handleOpen();
    }
  };

  const getWeatherIcon = async (iconID) => {
    const url = `http://openweathermap.org/img/wn/${iconID}@2x.png`;
    return url;
  };

  return (
    <div>
      <div>
        <input
          value={location}
          type="text"
          onKeyDown={searchLocation}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter City for Weather"
        />
      </div>
      {/* <Button style={btnStyle} onClick={handleOpen}>
        Check Weather
      </Button> */}
      {data && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Current Weather In {data.name}{" "}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <img
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Temp: {data.main.temp}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Feels Like: {data.main.feels_like}{" "}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Humidity: {data.main.humidity}%
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Min: {data.main.temp_min} Max: {data.main.temp_max}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Description: {toTitleCase(data.weather[0].description)}
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default WeatherModal;
