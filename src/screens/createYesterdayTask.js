import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import Resource from '../network/Resource'
import moment from 'moment'
import DatePicker from 'react-native-datepicker'

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

export default class create extends Component {

  constructor(props){
    super(props)

    this.state = {
      //defauilt value of the date time
      date: '',
      currentTime: 0,
      isStarted: [],
      SprintId : 1,
      TaskName : '',
      TaskId :1,
      StartTime :moment().format("hh:mm"),
      EndTime :moment().format("hh:mm"),
      TotalTimeByTask :'',
      TotalTimeToday :'',
      flag: false,
      loading: true,
      loadingTimesheet: true,
      data: [],
      show: true,

    }
  }

  submitTask(){
    let body = {
      "SprintId" : this.state.SprintId,
      "TaskName" : this.state.TaskName
    }

    Resource.createTask(body)
    .then((res) => {
      this.resetForm();
      alert("Submit Sukses")
    })
    .catch((err) => {
      alert(JSON.stringify(err))
    })
  }

  resetForm(){
    this.setState({
       // SprintId : 1,
       TaskName : "",
       StartTime : "",
       EndTime :"",
       TotalTimeByTask : "",
       TotalTimeToday : "",
    })
  }


  // Get Task
  getData(){
    this.setState({loading: true})
    
    Resource.getTask()
    .then((res) => {
      this.setState({loadingTimesheet: false})
      let started = []
      res.data.map((d) => {
        started.push(d.isStarted)
      })

      this.setState({loading: false, data: res.data, isStarted: started})
    })
    .catch((err) => {
      alert(err)
    })
  }

  render() {
    return (
      <View style={{padding: 30}}>
        <TextInput 
          style={myStyle.form}
          value={this.state.taskName}
          onChangeText={(taskName) => this.setState({taskName})}
          
          placeholder="Task Name"
        />
        <TextInput 
          style={myStyle.form} 
          value={this.state.startTime}
          onChangeText={(startTime) => this.setState({startTime})}
          keyboardType={'numeric'}
          placeholder="hh:mm"
        />
        <TextInput 
          style={myStyle.form} 
          value={this.state.endTime}
          onChangeText={(endTime) => this.setState({endTime})}
          keyboardType={'numeric'}
          placeholder="hh:mm"
        />
       
        <TouchableOpacity style={{marginTop: 20}} onPress={() => this.submitTask()}>
          <View style={{backgroundColor:"#F7CA18", padding: 10}}>
            <Text style={{color:"#FFF", textAlign:"center"}}>SUBMIT</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
