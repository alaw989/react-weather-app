import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

const ip = "http://ip-api.com/json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: "",
      city: "",
      state: ""
    };
  }

  componentDidMount() {

    let currentComponent = this;

    axios.get(ip)
      .then(response => {

        navigator.geolocation.getCurrentPosition(success);

        const city = response.data.city;
        const state = response.data.regionName;
        console.log(response.data);

        function success(position) {
          const url = `https://api.darksky.net/forecast/6c2e47ef2096d8cbfc738b0df8ff7917/${
            position.coords.latitude
            },${position.coords.longitude}`;

          console.log(position);

          return axios(url, {
            method: "GET",
            mode: "no-cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            }
          }).then(response => {
            const weatherData = response.data;
            console.log(weatherData);
            currentComponent.setState({
              weather: weatherData.currently.apparentTemperature,
              city: city,
              state: state
            });
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Your Location: {this.state.city}, {this.state.state}</h1>
          <h2 className="App-title">Temperature: {this.state.weather} </h2>{" "}
        </header>{" "}
      </div>
    );
  }
}
export default App;
