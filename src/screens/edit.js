import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import Resource from '../network/Resource'
import Moment from 'moment'

const myStyle = StyleSheet.create({
  form: {
    borderColor: "#EFEFEF",
    backgroundColor: "#FEFEFE",
    borderWidth: 1,
    height: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10
  }
})

export default class edit extends Component {

  constructor(props) {
    super(props)

    this.data = this.props.navigation.getParam("data", null)

    this.state = {
      date: this.data.date,
      currentTime: 0,
      isStarted: [],
      SprintId: 1,
      TaskName: this.data.TaskName,
      TaskId: 1,
      startTime: this.data.startTime,
      endTime: this.data.endTime,
      loading: true,
      loadingTimesheet: true,
      data: [],
      isVisible: false
    }
  }

  submitTask() {
    let body = {
      "StartTime": this.state.startTime,
      "EndTime": this.state.endTime,
      "TaskId": this.state.TaskId
    }



    Resource.editTimesheet(body, this.data.id)
      .then((res) => {
        this.resetForm();
        alert("Edit Sukses")
      })
      .catch((err) => {
        alert(JSON.stringify(err))
      })
  }

  resetForm() {
    this.setState({
      // SprintId : 1,
      StartTime: "",
      EndTime: "",
      TaskName: ""
    })
    alert(JSON.stringify(resetForm))
  }


  render() {
    return (
      <View style={{ padding: 30 }}>
        <View>
          <TextInput style={myStyle.form} >{this.data.taskName}
          </TextInput>
        </View>
        <View>
          <TextInput style={myStyle.form} value={Moment(this.data.StartTime).format("HH:mm")}>
          </TextInput>
        </View>
        <View>
          <TextInput style={myStyle.form} value={Moment(this.data.EndTime).format("HH:mm")}>
          </TextInput>
        </View>
        <View>
          <TextInput style={myStyle.form} >10 </TextInput>
        </View>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => this.submitTask()}>
          <View style={{ backgroundColor: "#F7CA18", padding: 10 }}>
            <Text style={{ color: "#FFF", textAlign: "center" }}>SUBMIT</Text>
          </View>
        </TouchableOpacity>
      </View>



    )
  }
}
