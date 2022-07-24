import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/system";
import { useLifts } from "../../Providers/LiftProvider";
import { useSelector } from "react-redux";
import { LiftProvider } from "../../Providers/LiftProvider";
import { darken } from "@mui/material/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// CRUD
import Button from "@mui/material/Button";
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/DeleteOutlined';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Close';

// Update Functionality
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";

const useFakeMutation = () => {
  return React.useCallback(
    (lift) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          if (lift.name?.trim() === "") {
            reject();
          } else {
            resolve(lift);
          }
        }, 200)
      ),
    []
  );
};

function computeMutation(newRow, oldRow) {
  if (newRow.date_of_lift !== oldRow.date_of_lift) {
    return `Date from '${oldRow.date_of_lift}' to '${newRow.date_of_lift}'`;
  }
  if (newRow.lift !== oldRow.lift) {
    return `Lift from '${oldRow.lift}' to '${newRow.lift}'`;
  }
  if (newRow.weight !== oldRow.weight) {
    return `Weight from '${oldRow.weight}' to '${newRow.weight}'`;
  }
  return null;
}

export default function LiftDataGrid() {
  const mutateRow = useFakeMutation();
  const noButtonRef = React.useRef(null);
  const [promiseArgumentsUpdate, setPromiseArguments] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { getLiftHistory, lifts, handleLiftUpdate, handleLiftDelete } =
    useLifts();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getLifts = async () => {
    await getLiftHistory(currentUser.id);
  };
  // when the component mounts, get the lifts based off of user auth
  useEffect(() => {
    if (currentUser) getLifts();
  }, [currentUser, getLifts]);

  // when the lifts change, get the lifts
  useEffect(() => {
    getLifts();
  }, [lifts, getLifts]);

  // generates Rows
  const displayRows = () => {
    return lifts.map((lift) => {
      return {
        id: lift.id,
        date_of_lift: lift.date_of_lift,
        lift: lift.lift,
        weight: lift.weight,
      };
    });
  };

  const processRow = React.useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);

        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    []
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArgumentsUpdate;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArgumentsUpdate;
    try {
      // Make the HTTP request to save in the backend
      const res = await mutateRow(newRow);

      // await getLifts()
      await handleLiftUpdate(newRow, currentUser.id);
      setSnackbar({ children: "Lift successfully saved", severity: "success" });
      resolve(res);
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({ children: "Lift couldn't be updated", severity: "error" });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleRowDelete = async (cellValues) => {
    try {
      await handleLiftDelete(cellValues.row, currentUser.id);
      setSnackbar({
        children: "Lift successfully deleted",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({ children: "Lift couldn't be deleted", severity: "error" });
    }
  };

  const renderConfirmDialog = () => {
    if (!promiseArgumentsUpdate) {
      return null;
    }
    const { newRow, oldRow } = promiseArgumentsUpdate;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <Dialog maxWidth="xs" open={!!promiseArgumentsUpdate}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will change ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <LiftProvider>
      <Container
        sx={{
          backgroundColor: "whitesmoke",
          "& .clean": {
            bgcolor: "#FF7F7F",
            "&:hover": {
              bgcolor: darken("#FF7F7F", 0.15),
            },
          },
          "& .clean_jerk": {
            bgcolor: "#90EE90",
            "&:hover": {
              bgcolor: darken("#90EE90", 0.15),
            },
          },
          "& .snatch": {
            bgcolor: "#ADD8E6",
            "&:hover": {
              bgcolor: darken("#ADD8E6", 0.15),
            },
          },
          "& .bench": {
            bgcolor: "#CBC3E3",
            "&:hover": {
              bgcolor: darken("#CBC3E3", 0.15),
            },
          },
        }}
      >
        <div style={{ height: 400, width: "100%", margin: 20 }}>
          {renderConfirmDialog()}
          {lifts && (
            <DataGrid
              rows={displayRows()}
              getRowClassName={(params) => `${params.row.lift}`}
              columns={[
                {
                  field: "date_of_lift",
                  headerName: "Date",
                  width: 333,
                  editable: true,
                  headerAlign: "center",
                },
                {
                  field: "lift",
                  headerName: "Lift",
                  width: 333,
                  editable: true,
                  headerAlign: "center",
                },
                {
                  field: "weight",
                  type: "number",
                  headerName: "Weight",
                  width: 333,
                  editable: true,
                  headerAlign: "center",
                },
                {
                  field: "delete",
                  width: 100,
                  headerName: "Delete",
                  headerAlign: "center",
                  renderCell: (cellValues) => {
                    return (
                      <DeleteForeverIcon
                        onClick={() => {
                          handleRowDelete(cellValues);
                        }}
                      >
                        Delete
                      </DeleteForeverIcon>
                    );
                  },
                },
              ]}
              processRow={processRow}
              experimentalFeatures={{ newEditingApi: true }}
            />
          )}
          {!!snackbar && (
            <Snackbar
              open
              onClose={handleCloseSnackbar}
              autoHideDuration={6000}
            >
              <Alert {...snackbar} onClose={handleCloseSnackbar} />
            </Snackbar>
          )}
        </div>
      </Container>
    </LiftProvider>
  );
}
