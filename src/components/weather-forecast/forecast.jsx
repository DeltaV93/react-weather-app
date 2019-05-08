import React from "react";
import moment from "moment";

export default class Forecast extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const { data } = this.props;
        if (!data) return null;

        return( <section className="container--flex container--forecast">
            <div className="weather--box__forecast">
                <div className="weather__date">{moment(data.date).format("dddd")}</div>
                <div className="weather--main-content">
                    <div className="weather__img">
                        <img src={data.day.condition.icon} alt={data.day.condition.text} />
                    </div>
                    <div className="weather__degrees">{data.day.avgtemp_f}&deg;</div>
                </div>
                <div className="weather__details">{data.day.condition.text}</div>
            </div>
        </section>
        )
    }
}
