import React, {Component} from "react";
import axios from "axios";
import "./App.css";

import "./sass/app.scss"

import WeatherDetails from "./components/weather-details/"
import ForecastDetails from "./components/weather-forecast/"

// TODO || move this to a env file
const WEATHER_KEY = "7303bd4d91ca462db7d233449190705";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: "Los Angeles",
            viewingForecastDate: "",
            activeViewingData: [],
            numForecastDays: 5,
            isLoading: true,
            refreshedTime: 300,
        }
    }

     /**
     * Summary
     * Dose a ajax GET request to pull weather data based on info the user provides*
     * and set the state for the whole app
     *
     * @return {null}     nose not return any data, just sets the state.
     */
    updateWeather() {
        const {cityName, numForecastDays} = this.state;
        const url = `http://api.apixu.com/v1/forecast.json?key=${WEATHER_KEY}&q=${cityName}&days=${numForecastDays}`;

        // when app loads pull the data on the
        // this includes 5 day forecast for selected city
        axios.get(url).then(response => {
            return response.data;
        }).then((data) => {

            let setForecastDate;
            let viewingData;
            let forecastList = data.forecast.forecastday;
            // if viewingForecastDate is set, we can update later
            // if not, we need to set it as the current date
            if(!this.state.viewingForecastDate){
                setForecastDate = data.forecast.forecastday[0].date;
                viewingData =  data.forecast.forecastday[0];
            } else {
                setForecastDate = this.state.viewingForecastDate;
                 // Used to find the the current forecast based
                // on current setForecastDate
                forecastList.map( (forecast, index) => {
                    if (forecast.date === setForecastDate) {
                        viewingData = forecastList[index];
                    }
                });
            }

            this.setState({
                isLoading: false,
                viewingForecastDate: setForecastDate,
                activeViewingData: viewingData,
                forecastDays: data.forecast.forecastday,
                locationData: data.location,
                currentData: data.current
            });

        }).catch(err => {
            // if the ajax fails just console log a mess
            // TODO || Improve UX by adding alert messages to notify the user of the error
            console.error("We cannot pull weather data at the moment", err)
        });
    }
    /**
     * Summary
     * When user clicks on a forecast the current view needs to be updated
     * and set the state for the whole app
     *
     * @newDate {string}          active date in string form
     * @forecastList {list}       list of 5 day forecast for current location
     *
     * @return {null}     dose not return any data, just sets the state.
     */
    updateForecast(newDate, forecastList){
        let viewingData;

        // TODO || code cleanup: move this out into a function used by two functions
        // Used to find the the current forecast based
        // on current setForecastDate
        forecastList.map( (forecast, index) => {
            if (forecast.date === newDate) {
                viewingData = forecastList[index];
            }
        });

        this.setState({
                viewingForecastDate: newDate,
                activeViewingData: viewingData,
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

        eventEmitter.on("updateForecast", (data) => {
            // setState has a callback method built in
            this.updateForecast(data, this.state.forecastDays)

        });

    }

    render() {

        const {
            isLoading,
            forecastDays,
            locationData,
            currentData,
            viewingForecastDate,
            activeViewingData,
        } = this.state;

        return (
            <div className="container h--center v--center">
                <header>
                    <h1 className="title text--center">Weather App</h1>
                </header>

                <main className="container container--main sm-25">
                    {isLoading && <h3>Loading Weather Detail ...</h3>}
                    {!isLoading && (
                        <section className="section--top">
                            <WeatherDetails locationData={locationData}
                                currentData={currentData}
                                viewingForecastDate={viewingForecastDate}
                                activeViewingData={activeViewingData}
                                eventEmitter={this.props.eventEmitter}/>
                        </section>
                    )}
                    <section className="section--bottom">
                        <ForecastDetails  forecastDays={forecastDays}
                                          eventEmitter={this.props.eventEmitter}
                                          viewingForecastDate={viewingForecastDate}/>
                    </section>

                </main>

            </div>
        );
    }
}

export default App;
