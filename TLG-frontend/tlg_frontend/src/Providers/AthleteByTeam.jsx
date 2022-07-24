import React, { useState, createContext, useContext } from "react";
import axios from "axios";

const AthleteByTeamContext = createContext({});

export const useAthleteByTeam = () => useContext(AthleteByTeamContext);

export const AthleteByTeamProvider = ({ children }) => {
  const [athleteByTeam, setAthleteByTeam] = useState([]);

  const athleteByTeamCalls = async (method, endpoint = "", dataPayload = null) => {
    try {
      const payload = {
        method: method,
        headers: {
          authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };

      payload.url = endpoint
        ? `${process.env.REACT_APP_API_URL}/tlg/athlete-by-team/${endpoint}`
        : `${process.env.REACT_APP_API_URL}/tlg/athlete-by-team/`;
      if (dataPayload) {
        payload.data = dataPayload;
      }
      const { data } = await axios(payload);
      return data;
    } catch (error) {
      console.error(`Error ${method} call for AthleteByTeam`, error.message);
    }
  }

  

  return(
    <AthleteByTeamContext.Provider
      value={{
        athleteByTeam,
        athleteByTeamCalls,
        setAthleteByTeam
      }}
    >
      {children}
    </AthleteByTeamContext.Provider>

  );
}