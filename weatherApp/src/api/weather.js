import axios from "axios";
import { apiKey } from "../contants";

// Hava durumu tahmini için API isteği oluşturur
const forecastEndpoint = (params) =>
  `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

// Lokasyon araması için API isteği oluşturur
const locationsEndpoint = (params) =>
  `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

// Genel API çağrısı
const apiCall = async (endpoint) => {
  const options = {
    method: "GET",
    url: endpoint,
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (err) {
    console.error("API request failed with an error:", err);
    return null;
  }
};

// Hava durumu tahmini için veri çeker
export const fetchWeatherForecast = (params) => {
  return apiCall(forecastEndpoint(params));
};

// Lokasyon bilgilerini çeker
export const fetchLocations = (params) => {
  return apiCall(locationsEndpoint(params));
};
