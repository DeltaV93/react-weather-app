import React from "react";

export default class Weather extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        const {locationData, currentData } = this.props;

        return <section>
            <h2 className="weather__location text-center">
                {locationData.name}
            </h2>
            <div className="weather--box flex--row">
                <section className="weather--box__main-content container--flex flex--col">
                    <div className="weather--main-content">
                        <div className="weather__img">
                            <img src={currentData.condition.icon}
                                 alt={"image describing " + currentData.condition.text + " weather"} />
                        </div>
                        <div className="weather__degrees">{currentData.temp_f}&deg;</div>
                    </div>
                    <div className="weather__details">{currentData.condition.text}</div>
                </section>
                <section className="weather--box__details-content flex--col">
                    <h3>Forecast Details</h3>
                    <ul className="list--unstyled">
                        <li className="list__item">
                            <p><b>High of</b>: {currentData.feelslike_f}&deg;</p>
                        </li>
                        <li className="list__item">
                            <p><b>Feels Like</b>: {currentData.feelslike_f}&deg;</p>
                        </li>
                    </ul>
                </section>
            </div>
        </section>

    }
}
