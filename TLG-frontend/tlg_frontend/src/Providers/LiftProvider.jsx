import React, { useState, createContext, useContext } from "react";

const axios = require("axios");
const LiftContext = createContext({});

export const useLifts = () => useContext(LiftContext);

export const LiftProvider = ({ children }) => {
  // state for the Lift and axios calls
  const [lifts, setLifts] = useState([]);

  const liftCalls = async (method, endpoint = "", dataPayload = null) => {
    try {
      const payload = {
        method: method,
        headers: {
          authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      payload.url = endpoint
        ? `${process.env.REACT_APP_API_URL}/tlg/lift-history/${endpoint}/`
        : `${process.env.REACT_APP_API_URL}/tlg/lift-history/`;

      if (dataPayload) {
        payload.data = dataPayload;
      }
      const { data } = await axios(payload);
      return data;
    } catch (error) {
      console.error(`Error ${method} call for Lifts`, error.message);
      return error;
    }
  };

  const getLiftHistory = async (currentUser) => {
    try {
      const data = await liftCalls("get", currentUser);

      if (data.length !== lifts.length) {
        setLifts(data);
      }
    } catch (error) {
      console.log("Error fetching lifts ", error);
    }
  };

  const handleLiftUpdate = async (liftData, currentUser) => {
    try {
      const data = await liftCalls("put", currentUser, liftData);

      setLifts([...lifts, data]);
    } catch (error) {
      // console.log("There's an error", error);
    }
  };

  const handleLiftSubmit = async (liftData) => {
    let submitted = "success";
    try {
      const data = await liftCalls("post", "", liftData);

      if (!data.status) {
        submitted = "error";
      }
    } catch (error) {
      // console.log("There's an error", error);
      submitted = "error";
    }

    return submitted;
  };

  const handleLiftDelete = async (liftData, currentUser) => {
    try {
      await liftCalls("delete", currentUser, liftData);
    } catch (error) {
      console.log("There's an error", error);
    }
  };

  return (
    <LiftContext.Provider
      value={{
        lifts,
        setLifts,
        handleLiftSubmit,
        getLiftHistory,
        handleLiftUpdate,
        handleLiftDelete,
      }}
    >
      {children}
    </LiftContext.Provider>
  );
};
