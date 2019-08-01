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
      taskName: this.data.taskName,
      startTime: Moment(this.data.StartTime).format("HH:mm"),
      endTime: Moment(this.data.endTime).format("HH:mm"),
      loading: true,
      loadingTimesheet: true,
      data: [],
      isVisible: false
    }
  }

  submitTask() {
    let body = {
      "taskName" : this.state.taskName,
      "StartTime": this.state.startTime,
      "EndTime": this.state.endTime
    }

    Resource.editTimesheet(body, this.data.id)
      .then((res) => {
        this.resetForm();
        // alert("Edit Sukses")
        alert(JSON.stringify(body))
      })
      .catch((err) => {
        alert(JSON.stringify(err))
      })
  }

  resetForm() {
    this.setState({
      // SprintId : 1,
      taskName: "",
      StartTime: "",
      EndTime: ""
      
    })
    // alert(JSON.stringify(resetForm))
  }


  render() {
    return (
      <View style={{ padding: 30 }}>

        {/* <TextInput
          style={myStyle.form}
          value={this.state.task_due}
          onChangeText={(task_due) => this.setState({ task_due })}
          placeholder="Task Due"
        />
 */}

        <View>
          <TextInput style={myStyle.form}
          value = {this.state.taskName}
          onChangeText = {(taskName)=> this.setState({taskName})}>
          </TextInput>
        </View>
        <View>
          <TextInput style={myStyle.form} value={this.state.StartTime}
          onChangeText = {(StartTime)=> this.setState({StartTime})}>
          </TextInput>
        </View>
        <View>
          <TextInput style={myStyle.form} value={this.state.EndTime}
          onChangeText = {(EndTime)=> this.setState({EndTime})}>
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
