"use client";
import axios from "axios";
import React, { useState, useEffect, useContext, createContext } from "react"

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [forecast, setForecast] = useState([]);

    const [airQuality, setAirQuality] = useState({});

    const fetchForecast = async (lat, lon) => {
        try {
            const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
            
            setForecast(res.data);
        } catch (error) {
            console.log("Error fetching forecast data: ", error.message);
        }
    };

     // Air Quality
    const fetchAirQuality = async (lat, lon) => {
        try {
            const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
            setAirQuality(res.data);
        } catch (error) {
            console.log("Error fetching air quality data: ", error.message);
        }
    };

    useEffect(() => {
        fetchForecast();
        fetchAirQuality();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                forecast,
                airQuality,
                // fiveDayForecast,
                // uvIndex,
                // geoCodedList,
                // inputValue,
                // handleInput,
                // setActiveCityCoords,
            }}
        >
            <GlobalContextUpdate.Provider
                // value={{
                //     setActiveCityCoords,
                // }}
            >
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);