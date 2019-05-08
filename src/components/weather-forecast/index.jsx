import React from "react";

import Forecast from "./forecast"
import "./styles.scss"

export default class ForecastDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { forecastDays, viewingForecastDate } = this.props;

        return <section className="container--flex no-padding">
            <div className="weather--box weather__box--forecast">
                {forecastDays &&
                    forecastDays.map((day, index) => {
                        return <Forecast activeViewDate={viewingForecastDate} data={day} key={index} />;
                    })}
            </div>

        </section>;
    }


}
