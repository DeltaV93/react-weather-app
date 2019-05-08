import React, {Component} from "react";
import axios from "axios"
import "./App.css";

import "./sass/app.scss"

import WeatherDetails from "./components/weather-details/"
import ForecastDetails from "./components/weather-forcast/"

// TODO || move this to a env file
const WEATHER_KEY = "7303bd4d91ca462db7d233449190705";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: "Los Angeles",
            numForecastDays: 5,
            isLoading: true,
            refreshedTime: 300,
        }
    }

    updateWeather() {
        const {cityName, numForecastDays} = this.state;
        const url = `http://api.apixu.com/v1/forecast.json?key=${WEATHER_KEY}&q=${cityName}&days=${numForecastDays}`;

        // when app loads pull the data on the
        // this includes 5 day forecast for selected city
        axios.get(url).then(response => {
            return response.data;
        }).then((data) => {
            // TODO || return app data as one object vs multiple to make code more fixable
            this.setState({
                isLoading: false,
                tempF: data.current.temp_f,
                isDay: data.current.is_day,
                text: data.current.condition.text,
                iconURL: data.current.condition.icon,
                forecastDays: data.forecast.forecastday,
                locationData: data.location,
                currentData: data.current
            });
            console.log(this.state.locationData)
        }).catch(err => {
            console.error("We cannot pull weather data at the moment", err)
        });
    }

    componentDidMount() {

        const {eventEmitter} = this.props;
        // TODO || get user location from the browser

        // load default data
        this.updateWeather();

        // keep the weather current by making the ajax call every 5 mins
        setInterval(this.updateWeather.bind(this), 300000);

        eventEmitter.on("updateWeather", (data) => {
            // setState has a callback method built in
            this.setState({
                cityName: data
            }, () => this.updateWeather());

        });

    }

    render() {

        const {
            isLoading,
            cityName,
            tempF,
            isDay,
            text,
            iconURL,
            forecastDays,
            locationData,
            currentData
        } = this.state;

        return (
            <div className="wrapper container--flex">
                <main className="container container--main">
                    {isLoading && <h3>Loading Weather Detail ...</h3>}
                    {!isLoading && (
                        <section className="section--top">
                            <WeatherDetails
                                locationData={locationData}
                                currentData={currentData}
                                location={cityName}
                                tempF={tempF}
                                isDay={isDay}
                                text={text}
                                iconURL={iconURL}
                                eventEmitter={this.props.eventEmitter}/>
                        </section>
                    )}
                    <section className="section--bottom">
                        <ForecastDetails forecastDays={forecastDays}/>
                    </section>

                </main>

            </div>
        );
    }
}

export default App;
