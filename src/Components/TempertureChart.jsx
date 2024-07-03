import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Countries } from "./Countries";
import { Line } from "react-chartjs-2";
import LineChart from "./barChart";
import styles from "./Chart.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export const TempertureChart = (props) => {
  const [dataTemp, setDataTemp] = useState([]);
  const [country, setCountry] = useState("");
  const [countryname, setCountryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]);
  const [citiesNames, setCitiesNames] = useState([]);

  const [userData, setUserData] = useState({
    labels: citiesNames.map((data) => data),
    datasets: [
      {
        label: "Temperature of the cities",
        data: dataTemp.map((data) => data),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    fillTemperatures();
    setError(null);
  }, [citiesNames]);

  useEffect(() => {
    fillCitiesNames();
    setError(null);
  }, [cities]);

  useEffect(() => {
    setUserData({
      labels: citiesNames.map((data) => data),
      datasets: [
        {
          label: "Temperature of the cities",
          data: dataTemp.map((data) => data),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
            "#BAD67F",
            "#D4B064",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
    setError(null);
  }, [dataTemp]);

  const fillTemperatures = () => {
    setDataTemp([]);
    if (cities.length === 0) return;
    citiesNames.map((city) => {
      fetchData(city);
    });
  };

  const fillCitiesNames = () => {
    if (cities.length === 0) return;

    const names = cities.map((city) => city.name);

    setCitiesNames(names);

    setCities(cities);
  };

  const fetchData = async (city) => {
    setLoading(true);

    try {
      if (city === "") return;

      const response = await axios.get(
        "http://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: city,
            appid: "abed82ca7b2539f97f935b5d65ff1d80",
            units: "metric",
          },
        }
      );
      setLoading(false);

      const newItem = response.data.main.temp;
      setDataTemp((prev) => [...prev, newItem]);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? <p> Loading</p> : <p> </p>}
      {error ? <p>Error: {error.message}</p> : <p> </p>}
      <Countries
        country={country}
        setCountry={setCountry}
        cities={cities}
        setCities={setCities}
        countryname={countryname}
        setCountryName={setCountryName}
      />
      <h1>{country}</h1>
      <div class="graf">
        <LineChart chartData={userData} />
      </div>
    </div>
  );
};

export default TempertureChart;
