import React from "react";

import Forecast from "./forecast"

export default class ForecastDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { forecastDays } = this.props;

        return <section className="container--flex">
            <div className="weather--box weather__box--forecast">
                {forecastDays &&
                    forecastDays.map((day, index) => {
                        return <Forecast data={day} key={index} />;
                    })}
            </div>

        </section>;
    }


}
