import React, { useState, useEffect, createContext, useContext } from "react";

const axios = require("axios");
const AthletesContext = createContext({});

export const useAthletes = () => useContext(AthletesContext);

export const AthletesProvider = ({ children }) => {
  const [athletes, setAthletes] = useState([]);
  const [individualAthlete, setIndividualAthlete] = useState("");

  const athletesCalls = async (method, endpoint = "", dataPayload = null) => {
    try {
      const payload = {
        method: method,
        headers: {
          authorization: `JWT ${localStorage.getItem("access")}`,
          "Content-Type": "multipart/form-data",
        },
      };

      payload.url = endpoint
        ? `${process.env.REACT_APP_API_URL}/tlg/athlete/${endpoint}/`
        : `${process.env.REACT_APP_API_URL}/tlg/athlete/`;
      if (dataPayload) {
        payload.data = dataPayload;
      }
      const { data } = await axios(payload);
      return data;
    } catch (error) {
      console.error(`Error ${method} call for Athletes`, error.message);
    }
  };

  const handleAthleteUpdate = async (athleteData, id) => {
    try {
      await athletesCalls("put", id, athleteData);
    } catch (e) {
      console.log("There's an error", e);
    }
  };

  const handleAthleteSubmit = async (athleteData) => {
    try {
      await athletesCalls("post", "", athleteData);
    } catch (e) {
      console.log("There's an error", e);
    }
  };

  const getAthleteInfo = async (athleteID) => {
    try {
      if (individualAthlete.length === 0) {
        const data = await athletesCalls("get", athleteID, null);

        setIndividualAthlete(data);
      }
    } catch (e) {
      console.log("There's an error", e);
    }
  };

  useEffect(() => {
    const getAllAthletes = async () => {
      try {
        const response = await athletesCalls("get");
        if (response.length !== athletes.length) {
          setAthletes(response);
        }
      } catch (error) {
        console.error("Error fetching api data", error);
      }
    };

    getAllAthletes();
  }, [athletes]);

  return (
    <AthletesContext.Provider
      value={{
        athletes,
        setAthletes,
        handleAthleteSubmit,
        getAthleteInfo,
        individualAthlete,
        handleAthleteUpdate,
      }}
    >
      {children}
    </AthletesContext.Provider>
  );
};
