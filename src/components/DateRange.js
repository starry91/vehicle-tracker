import React, { Component } from 'react'
import DateRangePicker from 'react-daterange-picker'
import 'react-daterange-picker/dist/css/react-calendar.css' // For some basic styling. (OPTIONAL)

class DateRange extends Component {
    render() {
        return (
            <div>
                <DateRangePicker
                    onSelect={this.props.onSelect}
                    numberOfCalendars={2}
                    selectionType='range'
                    minimumDate={new Date()}
                    value={this.props.value}
                />
            </div>
        )
    }
}

export default DateRange;