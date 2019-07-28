import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Button } from 'react-native'
//import CalendarPicker from 'react-native-calendar-picker'
import Moment from 'moment'
import CalendarPicker from 'react-native-calendar-picker';


export default class exportTimesheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      startDate: new Date(),
      endDate: new Date(),

      selectedEndDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onDayPress = this.onDayPress.bind(this);
    //Calendar for range
    this.confirmDate = this.confirmDate.bind(this);
    this.openCalendar = this.openCalendar.bind(this);

  }

  // onDateChange(date) {
  //   this.setState({
  //     selectedStartDate: date,
  //   });
  // }


  onDateChange(date, type) {
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
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
        <View>
          <Text>Export Your Timesheet</Text>
        </View>
        <View></View>

        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          maxDate={new Date()}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={this.onDateChange}
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