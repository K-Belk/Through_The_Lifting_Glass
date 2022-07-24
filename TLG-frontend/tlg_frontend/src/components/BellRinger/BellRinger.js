import React from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import bell from "../../css/icons/notification.png";
import { useBellRinger } from "../../Providers/BellringerProvider";

const BellRinger = () => {
  const { bellRinger } = useBellRinger();
  console.log(bellRinger);


  return (
    <Box>
      <Container
        sx={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          backgroundColor: "lightgrey",
          minWidth: "100%",
        }}
      >
        <img src={bell} style={{ height: "100px" }} alt="bellRinger" />
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h1"
            sx={{ fontFamily: "Alice-Regular", display: "flex" }}
          >
            Bell Ringers
          </Typography>
        </Container>
        <img
          src={bell}
          style={{ display: "flex", height: "100px" }}
          alt="bellRinger"
        />
      </Container>
      <Container sx={{ backgroundColor: "black", height:'600px', display:'flex'}}>
        <Container sx={{mt:7}}>
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Athlete Name </TableCell>
                <TableCell>Date </TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Weight</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bellRinger ? (
                bellRinger.map((lift, index) => (
                  
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {lift.athlete.first_name + " " + lift.athlete.last_name}
                    </TableCell>
                    <TableCell>{lift.max_lift.date_of_lift}</TableCell>
                    <TableCell align="right">{lift.max_lift.lift}</TableCell>
                    <TableCell align="right">{lift.max_lift.weight}</TableCell>
                  </TableRow>
                ))
              ) : (
                <>Loading</>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        </Container>
      </Container>
    </Box>
  );
};

export default BellRinger;
