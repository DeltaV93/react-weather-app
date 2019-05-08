import React from "react";
import moment from "moment";

export default class Forecast extends React.Component {

    constructor(props){
        super(props);
    }

    onSelectDetails(data) {
        const {eventEmitter} = this.props;
        eventEmitter.emit("updateForecast", data);
    }

    render() {
        const { data, activeViewDate } = this.props;
        if (!data) return null;

        return( <section className="container--flex container--forecast">
            <a onClick={((e) => this.onSelectDetails(data.date))} data-selected-date={data.date}
               className={
                   "weather--box__forecast " + (activeViewDate == data.date ? "weather--box__active": "" )
               }>
                <div className="weather__date">{moment(data.date).format("dddd")}</div>
                <div className="weather--main-content">
                    <div className="weather__img">
                        <img src={data.day.condition.icon} alt={data.day.condition.text} />
                    </div>
                    <div className="weather__degrees">{data.day.avgtemp_f}&deg;</div>
                </div>
                <div className="weather__details">{data.day.condition.text}</div>
            </a>
        </section>
        )
    }
}
