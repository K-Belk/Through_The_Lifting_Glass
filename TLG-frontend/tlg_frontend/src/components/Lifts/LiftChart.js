import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Container } from "@mui/system";
import { useLifts } from "../../Providers/LiftProvider";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";
import { LiftProvider } from "../../Providers/LiftProvider";
// dont get rid of Chart, even though it is not highlighted it is holding the graph together
import Chart from "chart.js/auto";

const AthleteLiftHistory = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { getLiftHistory, lifts, setLifts } = useLifts();

  let dataLength = 0;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getLifts = async () => {
    await getLiftHistory(currentUser.id, true);
  };
  // when the component mounts, get the lifts based off of user auth
  useEffect(() => {
    if (currentUser) getLifts();
  }, [currentUser, getLifts]);

  // when the lifts change, get the lifts
  useEffect(() => {
    getLifts();
  }, [lifts, getLifts]);

  // creating dataset for each lift
  const createDataSet = () => {
    const liftTypes = {
      clean: { label: "clean", backgroundColor: "red", borderColor: "red" },
      clean_jerk: {
        label: "clean_jerk",
        backgroundColor: "green",
        borderColor: "green",
      },
      snatch: { label: "snatch", backgroundColor: "blue", borderColor: "blue" },
      bench: {
        label: "bench",
        backgroundColor: "purple",
        borderColor: "purple",
      },
    };

    lifts.map((lift) => {
      if (liftTypes[lift.lift]["data"]) {
        liftTypes[lift.lift]["data"].push(lift.weight);
      } else {
        liftTypes[lift.lift].fill = false;
        liftTypes[lift.lift].borderWidth = 2;
        liftTypes[lift.lift].lineTension = 0.5;
        liftTypes[lift.lift].data = [lift.weight];
      }
    });

    dataLength = liftTypes.length;
    return Object.values(liftTypes);
  };

  const data = {
    // labels are dates on x axis
    labels: lifts.map((lift) => ""),
    datasets: createDataSet(),
  };
  const displayGraph = () => {
    return (
      <Line
        type="line"
        data={data}
        options={{
          title: {
            display: true,
            text: "Athlete Lift History",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
          scales: {
            xAxis: {
              ticks: {
                display: true,
                autoSkip: true,
              },
              title: {
                display: true,
                text: "Lift Sesh Progress By #Lifts",
                padding: 10,
                font: {
                  size: 15,
                },
              },
            },
            yAxis: {
              title: {
                display: true,
                text: "Weight (in Lbs)",
                padding: 10,
                font: {
                  size: 15,
                },
              },
            },
          },
        }}
      />
    );
  };

  return (
    <LiftProvider>
      <Container
        sx={{
          backgroundColor: "whitesmoke",
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <div>{lifts && displayGraph()}</div>
      </Container>
    </LiftProvider>
  );
};

export default AthleteLiftHistory;
