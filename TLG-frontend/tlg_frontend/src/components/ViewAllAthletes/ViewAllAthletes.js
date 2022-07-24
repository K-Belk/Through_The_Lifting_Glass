import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useAthletes } from "../../Providers/AthleteProvider";
import { useAthleteByTeam } from "../../Providers/AthleteByTeam";


const ViewAllAthletes = () => {
  const { athletes, setAthletes } = useAthletes([]);
  const { athleteByTeam, setAthleteByTeam, athleteByTeamCalls } = useAthleteByTeam([]);


  const columns = [
    { field: "first_name", headerName: "First Name", width: 250 },
    { field: "last_name", headerName: "Last Name", width: 250 },
    { field: "grade", headerName: "Grade", width: 200 },
    { field: "weight_class", headerName: "Weight Class", width: 250 },
  ];

  const athleteRows = []
  athleteByTeam.map((athlete, index) => {
    athleteRows.push({
      id: index,
      first_name: athlete.athlete.first_name,
      last_name: athlete.athlete.last_name,
      grade: athlete.grade,
      weight_class: athlete.weightclass,
    })
  })

  useEffect(() => {
    const getAllAthleteByTeam = async () => {
      try {
        const response = await athleteByTeamCalls("get");

        if (response.length !== athleteByTeam.length) {
          setAthleteByTeam(response);
        
        }
      } catch (error) {
        console.error("Error fetching api data", error);
      }
    }

    getAllAthleteByTeam();
  }, [athleteByTeam]);

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={athleteRows}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default ViewAllAthletes;
