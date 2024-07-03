import React, { useState, useEffect } from "react";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
import "semantic-ui-css/semantic.min.css";
import "./Countries.css";

export const Countries = ({
  country,
  setCountry,
  cities,
  setCities,
  countryName,
  setCountryName,
}) => {
  const [dataCountries, setDataCountries] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataCountries();
    setError(null);
  }, []);

  const fetchDataCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");

      setDataCountries(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const fetchDataCities = async (countryCode) => {
    try {
      const response = await axios.get(
        "https://spott.p.rapidapi.com/places?=",
        {
          headers: {
            "X-RapidAPI-Host": "spott.p.rapidapi.com",
            "X-RapidAPI-Key":
              "1910a52470msh958174fcc9d32e2p1d1e2djsna5cc8369e71f",
          },
          params: {
            limit: 10,
            type: "CITY",
            country: countryCode,
          },
        }
      );

      setCities(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const dataHandler = async (e) => {
    setCountry(e.target.value);
    if (e.target.value === "" || e.target.value === "Seleccionar País") return;
    fetchDataCities(e.target.value);
  };

  return (
    <div class="filtro">
      {loading ? <p> Loading</p> : <p> </p>}

      <select
        name="skills"
        multiple=""
        class="ui fluid search dropdown"
        onChange={dataHandler}
      >
        <option class="item" value="">
          Seleccionar País
        </option>
        {dataCountries.map((item) => (
          <option
            class="item"
            key={item.cca2}
            value={item.cca2}
            text={item.name.common}
          >
            {item.name.common}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Countries;
