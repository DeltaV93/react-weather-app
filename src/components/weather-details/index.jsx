import React from "react";

import "./styles.scss"
import Weather from "./weather"
import ActiveForecast from "./active"
import {Manager, Reference, Popper} from "react-popper";


export default class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelectLocationOpen: false,
        };
    }

    onLocationNameChange(e) {
        this.setState({
            locationName: e.target.value
        });
    }

    onToggleSelectLocation() {
        this.setState(prevState => ({
            isSelectLocationOpen: !prevState.isSelectLocationOpen
        }));
    }

    onSelectCity() {
        const {locationName} = this.state;
        const {eventEmitter} = this.props;
        eventEmitter.emit("updateWeather", locationName);
        this.setState({isSelectLocationOpen: false});
    }
    componentDidMount() {
        console.log(this.props)
    }

    render() {
        const {isSelectLocationOpen} = this.state;
        const { eventEmitter } = this.props;

        return <section className="container--details container--flex flex--col">
            <h1 className="title">Weather App</h1>
            <ActiveForecast {...this.props}/>
            <Manager>
                <Reference>
                    {({ref}) => (
                        <button ref={ref}
                                type="button"
                                onClick={this.onToggleSelectLocation.bind(this)}
                                className="btn btn--select-location">
                            Pick Location +</button>
                    )}
                </Reference>
                <Popper placement="top">
                    {({ref, style, placement, arrowProps}) =>
                        isSelectLocationOpen && (
                            <div className="container--flex popup-container"
                                 ref={ref}
                                 style={style}
                                 data-placement={placement}>
                                <button className="close"
                                        onClick={this.onToggleSelectLocation.bind(this)}
                                        aria-label="Close">x
                                </button>
                                <div className="form-container">
                                    <label htmlFor="location-name">Enter City or Postal Code</label>
                                    <input id="location-name"
                                           className="form-input"
                                           type="text"
                                           placeholder="City or Postal Code"
                                           onChange={this.onLocationNameChange.bind(this)}/>

                                    <button className="btn btn-select-location"
                                            onClick={this.onSelectCity.bind(this)}>
                                        Select
                                    </button>
                                </div>
                                <div ref={arrowProps.ref}
                                     style={arrowProps.style}/>
                            </div>
                        )}
                </Popper>
            </Manager>

        </section>
    }

}
