import React from "react";

import Forecast from "./forecast"
import "./styles.scss"

export default class ForecastDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {forecastDays, viewingForecastDate} = this.props;

        return <section className="forecast--box">
            <div className="weather--box weather__box--forecast row">
                {forecastDays &&
                forecastDays.map((day, index) => {
                    return <Forecast activeViewDate={viewingForecastDate}
                                     data={day}
                                     key={index}
                                     eventEmitter={this.props.eventEmitter}/>;
                })}
            </div>

        </section>;
    }


}
