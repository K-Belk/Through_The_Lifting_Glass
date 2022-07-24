import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
const TeamContext = createContext({});

export const useTeam = () => useContext(TeamContext);

export const TeamProvider = ({ children }) => {
  // state for the Team and axios calls
  const [team, setTeam] = useState([]);

  const teamCalls = async (method, endpoint = "", dataPayload = null) => {
    try {
      const payload = {
        method: method,
        headers: {
          authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      payload.url = endpoint
        ? `${process.env.REACT_APP_API_URL}/tlg/team/${endpoint}`
        : `${process.env.REACT_APP_API_URL}/tlg/team/`;
      if (dataPayload) {
        payload.data = dataPayload;
      }
      const { data } = await axios(payload);
      return data;
    } catch (error) {
      console.error(`Error ${method} call for Teams`, error.message);
    }
  };

  const handleTeamSubmit = async (teamData) => {
    try {
      await teamCalls("post", "", teamData);
    } catch (e) {
      console.log("There's an error", e);
    }
  };
  useEffect(() => {
    const getTeam = async () => {
      try {
        const data = await teamCalls("get");
        if (data.length !== team.length) {
          setTeam(data);
        }
      } catch (error) {
        console.error("Error fetching team", error);
      }
    };
    getTeam();
  }, [team]);

  return (
    <TeamContext.Provider
      value={{
        team,
        setTeam,
        handleTeamSubmit,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};
