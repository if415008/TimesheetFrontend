import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Button } from 'react-native'
import Moment from 'moment'
import { Calendar } from 'react-native-calendars';

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

  openCalendar() {
    this.calendar && this.calendar.open();
  }


  render() {
    const { navigate } = this.props.navigation;
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

        {/* <Button onPress = {() => this.props.navigation.navigate('exportScreen')} title="home"/> */}

        <View>
          <Button
            onPress={() => navigate('ExportScreen')}
            title="Select Range Date"
          />
        </View>

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
    marginLeft: 5,
    marginRight: 5
  },
  buttonContainer: {
  }
});