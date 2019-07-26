import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Button } from 'react-native'
//import CalendarPicker from 'react-native-calendar-picker'
import Moment from 'moment'
import { Calendar } from 'react-native-calendars';
//import DatePicker from 'react-native-datepicker';
import Calendar2 from 'react-native-calendar-select';


export default class main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      startDate: new Date(),
      endDate: new Date()
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onDayPress = this.onDayPress.bind(this);
    //Calendar for range
    this.confirmDate = this.confirmDate.bind(this);
    this.openCalendar = this.openCalendar.bind(this);

  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
    this.props.navigation.navigate('ProfileScreen', { bookingDate: day })
  }

  _onPressBack() {
    const { goBack } = this.props.navigation
    goBack()
  }

  // when confirm button is clicked, an object is conveyed to outer component
  // contains following property:
  // startDate [Date Object], endDate [Date Object]
  // startMoment [Moment Object], endMoment [Moment Object]
  confirmDate({ startDate, endDate, startMoment, endMoment }) {
    this.setState({
      startDate,
      endDate
    });
  }
  openCalendar() {
    this.calendar && this.calendar.open();
  }

  render() {
    let customI18n = {
      'w': ['', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
      'weekday': ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      'text': {
        'start': 'From',
        'end': 'To',
        'date': 'Date',
        'save': 'Save',
        'clear': 'Reset'
      },
      'date': 'DD / MM'  // date format
    };
    // optional property, too.
    let color = {
      subColor: '#f0f0f0'
    };
    const {
      state: {
        currentDate,
      },
      props: { navigation },
    } = this;

    return (
      <View>
        <Calendar
          minDate={Moment().startOf('day') - 1}
          maxDate={new Date()}
          theme={{
            calendarBackground: 'white',
            selectedDayTextColor: 'white',
            dayTextColor: 'red',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: 'white'
          }}
          onDayPress={this.onDayPress}
          style={{
            marginTop: 40,
            height: 350,
            borderWidth: 1
          }}
          markedDates={this.state.selectedDay}
        />

        <View>
          <Text>Export Your Timesheet</Text>
        </View>

        <Button style={{ backgroundColor: '#424242', color: 'yellow' }} title="Select Date Period" onPress={this.openCalendar}></Button>
        <Calendar2
          i18n="en"
          ref={(calendar) => { this.calendar = calendar; }}
          customI18n={customI18n}
          color={color}
          format="YYYYMMDD"
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onConfirm={this.confirmDate}
        />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    //marginBottom: 50,
    //marginTop: 30,
    marginLeft: 5,
    marginRight: 5
  },
  buttonContainer: {
  }
});