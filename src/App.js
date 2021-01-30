import React, { Component } from "react";
import DateRangePicker from "react-daterange-picker";
import "./App.css";
import LeafletMap from "./components/LeafletMap";
import DateRange from "./components/DateRange";
import 'react-daterange-picker/dist/css/react-calendar.css' // For some basic styling. (OPTIONAL)
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import originalMoment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(originalMoment);

// data for list of markers
const marker_data = [
  {
    lat: 34.5,
    lng: -115.5,
    name: "ABC Hospitals",
    info: 10
  },
  {
    lat: 34.56,
    lng: -115.56,
    name: "FEK Hospitals",
    info: 10
  },
  {
    lat: 33,
    lng: -114.5,
    name: "NRI Hospitals",
    info: 10
  },
];

// default map center
const default_loc = {
  lat: 33.5,
  lng: -115
};

// data for dropdown
const options = [
  'one', 'two', 'three'
];
const defaultOption = options[0];

class App extends Component {
  constructor(props) {
    super(props);

    const today = moment();
    const todayRange = moment.range(today.clone().subtract(7, "days"), today.clone());
    console.log("today range: ", todayRange);

    this.state = {
      dateRange: todayRange,
      id: options[0],
      data: marker_data
    };
    this.onDateSelect = this.onDateSelect.bind(this);
    this.onDropDownSelect = this.onDropDownSelect.bind(this);
  }

  onDateSelect(dateRange) {
    console.log("Seleted date range: ", dateRange);
    this.setState({
      dateRange: dateRange
    });
  }

  onDropDownSelect(option) {
    console.log("select option is:", option);
    this.setState({ id: option.value });
  }

  getCenterLoc() {
    if (this.state.data.length > 0) {
      return { lat: this.state.data[0].lat, lng: this.state.data[0].lng };
    }
    return default_loc;
  }

  render() {
    return (
      <div id="container">
        <LeafletMap data={this.state.data} center={this.getCenterLoc()} />
        <DateRange value={this.state.dateRange} onSelect={this.onDateSelect} />
        <Dropdown options={options} onChange={this.onDropDownSelect} value={defaultOption} placeholder="Select an option" />
        <h1>You have selected: {this.state.id}, {this.state.dateRange.start.format("YYYY-MM-DD")}, {this.state.dateRange.end.format("YYYY-MM-DD")}</h1>
      </div>
    );
  }
}

export default App;