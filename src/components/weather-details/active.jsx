import React from "react";

export default class ActiveForecast extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {activeViewingData, locationData} = this.props;

        return <section>
            <h2 className="weather__location text--center">
                {locationData.name}
            </h2>
          <div className="weather--box flex--row">
                <section className="weather--box__main-content container--flex flex--col">
                    <p>Daily Average</p>
                    <div className="weather--main-content">
                        <div className="weather__img">
                            <img src={activeViewingData.day.condition.icon}
                                 alt={"image describing " + activeViewingData.day.condition.text + " weather"} />
                        </div>
                        <div className="weather__degrees">

                            {activeViewingData.day.avgtemp_f }&deg;
                        </div>
                    </div>
                    <div className="weather__details">{activeViewingData.day.condition.text}</div>
                </section>
                <section className="weather--box__details-content flex--col">
                    <h3>Forecast Details</h3>
                    <ul className="list--unstyled">
                        <li className="list__item text--left">
                            <p><b>High of</b>: {activeViewingData.day.maxtemp_f}&deg;</p>
                        </li>
                        <li className="list__item text--left">
                            <p><b>Low of</b>: {activeViewingData.day.mintemp_f}&deg;</p>
                        </li>
                        <li className="list__item text--left">
                            <p><b>Average Humidity</b>: {activeViewingData.day.avghumidity}&deg;</p>
                        </li>
                    </ul>
                </section>
            </div>
        </section>
    }

}
