import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
const MaxLiftContext = createContext({});

export const useMaxLift = () => useContext(MaxLiftContext);

export const MaxLiftProvider = ({ children }) => {
  const [maxLift, setMaxLift] = useState([]);

  const maxLiftCalls = async (method, endpoint = "", dataPayload = null) => {
    try {
      const payload = {
        method: method,
        headers: {
          authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      payload.url = endpoint
        ? `${process.env.REACT_APP_API_URL}/tlg/max-lift-by-team/${endpoint}`
        : `${process.env.REACT_APP_API_URL}/tlg/max-lift-by-team/`;
      if (dataPayload) {
        payload.data = dataPayload;
      }
      const { data } = await axios(payload);
      return data;
    } catch (error) {
      console.error(`Error ${method} call for MaxLift`, error.message);
      return error;
    }
  };
  useEffect(() => {
    const getMaxLift = async () => {
      try {
        const data = await maxLiftCalls("get");

        if (data.length !== maxLift.length) {
          setMaxLift(data);
        }
      } catch (error) {
        console.error("Error fetching maxLift", error);
      }
    };
    getMaxLift();
  }, [maxLift]);

  return (
    <MaxLiftContext.Provider
      value={{
        maxLift,
        setMaxLift,
      }}
    >
      {children}
    </MaxLiftContext.Provider>
  );
};
