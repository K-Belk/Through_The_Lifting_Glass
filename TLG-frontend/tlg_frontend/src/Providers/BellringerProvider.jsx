import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
const BellRingerContext = createContext({});
export const useBellRinger = () => useContext(BellRingerContext);
export const BellRingerProvider = ({ children }) => {
  const [bellRinger, setBellRinger] = useState([]);
  const bellRingerCalls = async (method, endpoint = "", dataPayload = null) => {
    try {
      const payload = {
        method: method,
        headers: {
          authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      payload.url = endpoint
        ? `${process.env.REACT_APP_API_URL}/tlg/bell-ringer-by-team/${endpoint}`
        : `${process.env.REACT_APP_API_URL}/tlg/bell-ringer-by-team/`;
      if (dataPayload) {
        payload.data = dataPayload;
        ;
      }
      const { data } = await axios(payload);
      return data;
    } catch (error) {
      console.error(`Error ${method} call for BellRinger`, error.message);
    }
  }
  useEffect(() => {
    const getBellRinger = async () => {
      try {
        const data = await bellRingerCalls("get");
        if (data.length !== bellRinger.length) {
          setBellRinger(data);
        }
      } catch (error) {
        console.error("Error fetching bellRinger", error);
      }
    };
    getBellRinger();
  }
  , [bellRinger]);
  return (
    <BellRingerContext.Provider
      value={{
        bellRinger,
        setBellRinger,
      }}
    >
      {children}
    </BellRingerContext.Provider>
  );
}
