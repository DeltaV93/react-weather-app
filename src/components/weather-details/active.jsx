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
          <div className="weather--box row">
                <div className="lg-5">&nbsp;</div>
                <section className="weather--box__main-content lg-8">
                    <h3 className="text--bold">Daily Average</h3>
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
                <section className="weather--box__details-content sm-25 lg-6">
                    <h3>Forecast Details</h3>
                    <ul className="list--unstyled">
                        <li className="list__item text--center">
                            <p><b>High of</b>: {activeViewingData.day.maxtemp_f}&deg;</p>
                        </li>
                        <li className="list__item text--center">
                            <p><b>Low of</b>: {activeViewingData.day.mintemp_f}&deg;</p>
                        </li>
                        <li className="list__item text--center">
                            <p><b>Average Humidity</b>: {activeViewingData.day.avghumidity}&deg;</p>
                        </li>
                    </ul>
                </section>
              <div className="lg-6">&nbsp;</div>
            </div>
        </section>
    }

}
