import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";



import {
  Container,
  TextField,
  FormControl,
  Button,
  FormControlLabel,
  Switch,
  Typography,

} from "@mui/material";

import Modal from '@mui/material/Modal';

import axios from "axios";


const defaultValues = {
  title: "",
  content: "",
  start: "",
  end: "",
  color: "black",
  allDay: false,
};

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState(defaultValues);
  // const [eventModalOpen, setEventModalOpen] = useState(false);
  // const [eventDesc, setEventDesc] = useState({});

  //  map to format res from getTeamEvents to format for calendar event, [{event1},{event2}]
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTeamEvents = async () => {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/tlg/calendar/`,
      config
    );

    if (events.length !== res.data.length) {
      setEvents(res.data);
    }
  };

  useEffect(() => {
    getTeamEvents();
  }, [events, getTeamEvents]);

  const addTeamEvent = async (data) => {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/tlg/calendar/`,
        { data },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateClick = (date) => {
    setModalOpen(true);
    setFormValues({
      ...formValues,
      start: date.dateStr,
      end: date.dateStr,
    });
  };

  const handleDateSelect = (selectInfo) => {
    // let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection
  };
  const handleEventSubmit = async (data) => {
    addTeamEvent(formValues);
    setModalOpen(false);
    getTeamEvents();
  };

  const handleEventContent = (e) => {
    // console.log(e)
  };

  const handleEventClick = (e) => {
    console.log(e);
    // setEventDesc(
    //   {
    //     title: e.event._def.title,
    //     content: e.event.extendedProps.content,
    //     start: e.event.start,
    //     end: e.event.end,
    //   }
    // );
    // console.log(eventDesc)
    // setEventModalOpen(true);
  };

  // const handleEvents = (events) => {
  //   setEvents(events);
  // };
  const handleStartDateChange = (date) => {
    setFormValues({
      ...formValues,
      start: date,
    });
  }
  const handleEndDateChange = (date) => {
    const newDate = moment(date).format("YYYY-MM-DD");
    setFormValues({
      ...formValues,
      end: newDate,
    });
  }

  const handleInputChange = (e) => {

    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  
  // function to handle all day event
  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: checked,
    });
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Modal
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalOpen}
        onClose={handleClose}
      >
        <div style={{backgroundColor:"white"}}>
        <Container sx={{ mt: 2 }}>
          <TextField
            id="title-input"
            name="title"
            label="Title"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </Container>
        <Container sx={{ mt: 2 }}>
          <TextField
            id="event-input"
            name="content"
            label="Event Description"
            type="text"
            value={formValues.content}
            onChange={handleInputChange}
          />
        </Container>
        <Container sx={{ mt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Container sx={{ mt: 2 }}>
              <FormControl name="start_date">
                <DesktopDatePicker
                  name = 'start_date'
                  label="Start Date"
                  inputFormat="MM/DD/yyyy"
                  value={formValues["start"]}
                  onChange={handleStartDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
            </Container>
            <Container sx={{ mt: 2 }} 
                >
              <FormControl name="end">
                <DesktopDatePicker
                  name = 'end'
                  label="End Date"
                  inputFormat="MM/DD/yyyy"
                  value={formValues["end"]}
                  onChange={handleEndDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
            </Container>
          </LocalizationProvider>
        </Container>
        <Container>
          <FormControlLabel
            control={
              <Switch
                checked={formValues.allDay}
                onChange={handleSwitchChange}
                name="allDay"
              />
            }
            label="All Day"
          />
        </Container>
        <Container>
          <Button type="submit" onClick={handleEventSubmit}>
            {" "}
            Submit
          </Button>
        </Container>
        </div>
      </Modal>
      

      <Container sx={{ backgroundColor: "lightgrey" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          // initialEvents={bullshitEvents} // alternatively, use the `events` setting to fetch from a feed
          events={events}
          select={handleDateSelect}
          eventContent={handleEventContent}
          eventClick={handleEventClick}

          /* you can update a remote database when these fire:
    eventAdd={function(){}}
    eventChange={function(){}}
    eventRemove={function(){}}
    */
        />
      </Container>
    </div>
  );
};

export default Calendar;
