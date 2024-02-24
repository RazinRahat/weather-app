"use client";
import axios from "axios";
import React, { useState, useEffect, useContext, createContext } from "react"

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [forecast, setForecast] = useState([]);
    // const [geoCodedList, setGeoCodedList] = useState(defaultStates);
    // const [inputValue, setInputValue] = useState("");

    const [activeCityCoords, setActiveCityCoords] = useState([
        51.752021, -1.257726,
    ]);

    const [airQuality, setAirQuality] = useState({});
    const [fiveDayForecast, setFiveDayForecast] = useState({});
    const [uvIndex, seUvIndex] = useState({});
    

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
    
    // five day forecast
    const fetchFiveDayForecast = async (lat, lon) => {
        try {
            const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);

            setFiveDayForecast(res.data);
        } catch (error) {
            console.log("Error fetching five day forecast data: ", error.message);
        }
    };

    //fetch uv data
    const fetchUvIndex = async (lat, lon) => {
        try {
            const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);

            seUvIndex(res.data);
        } catch (error) {
            console.error("Error fetching the forecast:", error);
        }
    };

    useEffect(() => {
        fetchForecast();
        fetchAirQuality();
        fetchFiveDayForecast();
        fetchUvIndex();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                forecast,
                airQuality,
                fiveDayForecast,
                uvIndex,
                // geoCodedList,
                // inputValue,
                // handleInput,
                // setActiveCityCoords,
            }}
        >
            <GlobalContextUpdate.Provider
                value={{
                    setActiveCityCoords,
                }}
            >
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);