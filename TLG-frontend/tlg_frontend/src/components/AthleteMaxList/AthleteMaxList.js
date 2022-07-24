import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Container } from "@mui/material";
import { useMaxLift } from "../../Providers/MaxLiftProvider";

const AthleteMaxList = () => {
  const { maxLift } = useMaxLift();

  const columns = [
    { field: "name", headerName: "Athlete Name", width: 250 },
    { field: "lift1", headerName: "Clean", width: 250 },
    { field: "lift2", headerName: "Clean & Jerk", width: 200 },
    { field: "lift3", headerName: "Snatch", width: 250 },
    { field: "lift4", headerName: "Bench", width: 250 },
  ];

  const liftRows = [];
  // eslint-disable-next-line array-callback-return
  maxLift ? (
    maxLift.map((lifts, index) => {
      liftRows.push({
        id: index,
        name: lifts.name,
        lift1: lifts.clean,
        lift2: lifts.clean_jerk,
        lift3: lifts.snatch,
        lift4: lifts.bench,
      });
    })
  ) : (
    <></>
  );

  return (
    <Container
      sx={{
        backgroundColor: "whitesmoke",
      }}
    >
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={liftRows}
          components={{ Toolbar: GridToolbar }}
        />
      </div>
    </Container>
  );
};

export default AthleteMaxList;
