import React from "react";
import moment from "moment";

export default class Forecast extends React.Component {

    constructor(props) {
        super(props);
    }

    onSelectDetails(data) {
        const {eventEmitter} = this.props;
        eventEmitter.emit("updateForecast", data);
    }

    render() {
        const {data, activeViewDate} = this.props;
        if (!data) return null;

        return (<a className={
                "container--forecast lg-5 sm-25 lg-5 " + (activeViewDate == data.date ? "weather--box__active" : "")}
                   onClick={((e) => this.onSelectDetails(data.date))} data-selected-date={data.date}>
                <div
                    className="weather--box__forecast h--center">
                    <div className="weather__date text--center">
                        <h3>{moment(data.date).format("dddd")}</h3>
                    </div>
                                            <div className="weather__img">
                            <img src={data.day.condition.icon} alt={data.day.condition.text}/>
                        </div>
                        <div className="weather__degrees">
                            <p className="text--bold">{data.day.avgtemp_f}&deg;</p>
                        </div>
                    <div className="weather__details">{data.day.condition.text}</div>
                </div>
            </a>
        )
    }
}
