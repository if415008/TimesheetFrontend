import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity,Button, FormInput, ScrollView, Label, FlatList  } from 'react-native'
import Dialog from "react-native-dialog";
import Moment from 'moment';
import Resource from '../network/Resource'

export default class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //defauilt value of the date time
      date: '',
      currentTime: 0,
      isStarted: [],
      SprintId : 1,
      TaskName : '',
      TaskId :1,
      StartTime :'',
      EndTime :'',
      loading: true,
      loadingTimesheet: true,
      data: []
    }
  }

  state = {
    isModalVisible: false
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible })

    state = {
      isModal: false
    };
  
  toggleModal = () =>
      this.setState({ isModal: !this.state.isModal })

  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    that.setState({
      //Setting the value of the date time
      date:
        date + '/' + month + '/' + year,
    });
    this.getData();
    this.getDataTimesheet();
  }

  // TIMESHEET
  //Create Timesheet
  btnPlay(index){
    if(this.state.isStarted[index]){
      return (
        <Image style={{width: 35, height:35}} source={require("../assets/images/stop.png")}/>
      )
    } else {
      return (
        <Image style={{width: 45, height:45, tintColor:"#FFF"}} source={require("../assets/images/play.png")}/>
      )
    }
  }
  
  resetForm(){
    this.setState({
      // SprintId : 1,
      StartTime : "",
      EndTime : ""
    })
  }

  onPlayPress(index){

    let startedList = this.state.isStarted

    let isThisTaskStarted = startedList[index];

    if(!isThisTaskStarted){
      //Pangggil Endpoint Start
      startedList[index] = true
    } else {
      //panggil endpoint stop
      startedList[index] = false
    }

    let newObj = {
      "taskName": "task baru",
      "timesheetDate": "2019-07-19T03:20:06.463+00:00",
      "startTime": "2019-07-19T03:20:06.463+00:00",
      "endTime": "2019-07-19T03:20:06.463+00:00",
      "totalTimeByTask": 0,
      "totalTimeToday": 0,
      "employeeId": 1,
      "employee": null,
      "projectId": 1,
      "sprintId": 1,
      "taskId": 1,
      "task": null,
      "id": 1,
      "created": "2019-07-19T10:21:20.8190729+07:00",
      "createdBy": "Unknown",
      "modified": null,
      "modifiedBy": null
    }

    let dataTimeSheet = this.state.dataTimeSheet

    dataTimeSheet.push(newObj);

    this.setState({isStarted : startedList, dataTimeSheet:dataTimeSheet})

    // alert(Moment().format("hh:mm:ss"))
    
    let body={
      "StartTime" : Moment().format("HH:mm:ss"),
      "EndTime" : this.state.EndTime,
      "TaskId" : this.state.TaskId
    }
    

    // alert(JSON.stringify(body))
    // Resource.createTimesheet(body)
    // .then((res) => {
    //   this.resetForm();
    //   alert("Sukses")
    // })
    // .catch((err) => {
    //   alert(JSON.stringify(err))
    // })
  }

//Get Timesheet
getDataTimesheet(){
  this.setState({loading: true})
  
  Resource.getTimesheet()
  .then((res) => {
    this.setState({loadingTimesheet: false, dataTimeSheet: res.data})
  })
  .catch((err) => {
    alert(err)
  })
}

deleteTimesheet(timesheet){
  let id = timesheet.id

  Resource.deleteTimesheet(id)
  .then((res) => {
    alert("Berhasil di delete")
    this.deleteItemById(timesheet.id)
  })
  .catch((err) => {
    alert(err)
  })
}

deleteItemById(id){
  const filteredData = this.state.data.filter(item => item.id !== id);
  this.setState({ data: filteredData });
}

//TASK
//Create Task
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
      TaskName : ""
    })
  }

  // Get Task
  getData(){
    this.setState({loading: true})
    
    Resource.getTask()
    .then((res) => {
      let started = []
      res.data.map((d) => {
        started.push(false)
      })

      this.setState({loading: false, data: res.data, isStarted: started})
    })
    .catch((err) => {
      alert(err)
    })
  }

  deleteTask(task){
    let id = task.id

    Resource.deteleTask(id)
    .then((res) => {
      alert("Berhasil di delete")
      this.deleteItemById(task.id)
    })
    .catch((err) => {
      alert(err)
    })
  }

  deleteItemById(id){
    const filteredData = this.state.data.filter(item => item.id !== id);
    this.setState({ data: filteredData });
  }

  render() {
    return (
      <ScrollView>
      <View>
         <View style={[styles.view, styles.withBottomBorder]}>
              <Text style={styles.title}> 
              {this.state.date} &nbsp;
              {this.state.date < 24 ? `Good Morning` : `Good Evening`}
              </Text>
      </View> 

  {/* TASK */}
        <View style={{marginBottom :5, marginTop:10., padding:10, borderBottomColor: "#aaa", borderBottomWidth: 1, flexDirection: "row"}}>
            <FlatList
              refreshing={this.state.loading}
              onRefresh={() => this.getData()}
              data={this.state.data}
              renderItem={({item, index}) => ( 
                <ScrollView>
                <View style={{marginBottom:1, padding:5, borderBottomColor: "#aaa", borderBottomWidth: 1, flexDirection: "row"}}>
                <View style={{flex:1}}>
                  <Text>{item.id}</Text>
                </View>
                <View style={{flex:5}}>
                  <Text>{item.taskName}</Text>
                </View>
                <TouchableOpacity style={{marginHorizontal:20}} onPress={() => this.onPlayPress(index)}>
                  <View style={{backgroundColor:"#006183", padding:3, justifyContent:"center", alignItems:"center", width:30, height:30, borderRadius: 15}}>
                    {this.btnPlay(index)}
                  </View>
                </TouchableOpacity>
                </View>
                </ScrollView>
              )}
            />
        </View>
              

{/* INPUTAN TASK */}
      <View>
                <TextInput style={styles.inputtask}
                    value={this.state.TaskName}
                    placeholder="TaskName"
                    onChangeText={(TaskName) => this.setState({TaskName})}
                    maxLength={20}/>
                    
                    <TouchableOpacity style={{marginTop: 20, marginLeft:10, marginRight:250}} onPress={() => this.submitTask()}>
          <View style={{backgroundColor:"#006183", padding: 10}}>
            <Text style={{color:"#FFF", textAlign:"center"}}>SUBMIT</Text>
          </View>
        </TouchableOpacity>
              </View>
              
{/* HISTORY TIMESHEET */}
              {/* History Today */}
              <View style={styles.history}>
                <Text style={styles.historyfont}>History Today</Text>
                <View style={{marginBottom :1, padding:10, flexDirection: "row"}}>
                <View style={{marginLeft :5}}>
                  <Text style={{width :85, height :15, justifyContent:"center", alignItems:"center"}}>Task
                  </Text>
                </View>
                <View style={{marginLeft :5}}>
                  <Text style={{width :40, height :15}}>Start</Text>
                </View>
                <View style={{marginLeft :8}}>
                  <Text style={{ width :40, height :15}}>End </Text>
                </View>
                <View style={{marginLeft :5}}>
                  <Text style={{ width :35, height :15}}>Total </Text>
                </View>
                </View>
                {/*Label*/}
          <View>
          <FlatList
              refreshing={this.state.loadingTimesheet}
              onRefresh={() => this.getDataTimesheet()}
              data={this.state.dataTimeSheet}
              renderItem={({item, index}) => ( 
            <View style={{marginTop :1, padding:10, borderBottomColor: "#aaa", borderBottomWidth: 1, flexDirection: "row"}}>
                <View style={{flex:4}}>
                  <Text style={{ borderRadius: 1,borderWidth:1, width :85, height :30, justifyContent:"center", alignItems:"center"}}>{item.taskName}
                  </Text>
                </View>
                <View style={{flex:2}}>
                  <Text style={{ borderRadius: 1,borderWidth:1, width :40, height :30}}>{item.startTime}</Text>
                </View>
                <View style={{flex:2}}>
                  <Text style={{ borderRadius: 1,borderWidth:1, width :40, height :30}}>{item.endTime}</Text>
                </View>
                <View style={{flex:2}}>
                  <Text style={{ borderRadius: 1,borderWidth:1, width :30, height :30}}>10 </Text>
                </View>
                <View>
                <TouchableOpacity onPress={this._toggleModal}>
                  <View style={{ padding:5, justifyContent:"center", alignItems:"center", width:30, height:30, borderRadius: 15}}>
                    <Image style={{width: 20, height:20, tintColor:"#000000"}} source={require("../assets/images/add.png")}/>
                  </View>
                </TouchableOpacity>
                {/* Pop Up Add*/}
                <Dialog.Container visible={this.state.isModal}>
                    <Dialog.Title>Add Task</Dialog.Title>
                    <Dialog.Input label="Task" style={{borderWidth:1}} onChangeText={(task) => this.handleTask(task)}
                    ></Dialog.Input>
                    <Dialog.Input label="Start" style={{borderWidth:1}} onChangeText={(start) => this.handleStart(start)}
                    ></Dialog.Input>
                    <Dialog.Input label="End" style={{borderWidth:1}} onChangeText={(end) => this.handleEnd(end)}
                    ></Dialog.Input>
                    <Dialog.Input label="Total" style={{borderWidth:1}} onChangeText={(total) => this.handleTotal(total)}
                    ></Dialog.Input>
                    <Dialog.Button label="Save" onPress={this.toggleModal} />
                </Dialog.Container>
                </View>
                <TouchableOpacity onPress={this._toggleModal}>
                  <View style={{ padding:5, justifyContent:"center", alignItems:"center", width:30, height:30, borderRadius: 15}}>
                    <Image style={{width: 15, height:15, tintColor:"#000000"}} source={require("../assets/images/edit.png")}/>
                  </View>
                </TouchableOpacity>
                {/* Pop Up Edit */}
                <View>
                <Dialog.Container visible={this.state.isModalVisible}>
                    <Dialog.Title>Edit Task</Dialog.Title>
                    <Dialog.Input label="Task" style={{borderWidth:1}} onChangeText={(task) => this.handleTask(task)}
                    ></Dialog.Input>
                    <Dialog.Input label="Start" style={{borderWidth:1}} onChangeText={(start) => this.handleStart(start)}
                    ></Dialog.Input>
                    <Dialog.Input label="End" style={{borderWidth:1}} onChangeText={(end) => this.handleEnd(end)}
                    ></Dialog.Input>
                    <Dialog.Input label="Total" style={{borderWidth:1}} onChangeText={(total) => this.handleTotal(total)}
                    ></Dialog.Input>
                    <Dialog.Button label="Save" onPress={this._toggleModal} />
                </Dialog.Container>
                </View>
                <TouchableOpacity onPress={() => this.deleteTask(this.state.data[index])}>
                  <View style={{ padding:5, justifyContent:"center", alignItems:"center", width:30, height:30, borderRadius: 15}}>
                    <Image style={{width: 15, height:15, tintColor:"#000000"}} source={require("../assets/images/delete.png")}/>
                  </View>
                </TouchableOpacity>
              </View>
             )}
             />
          </View> 
              </View>
              
              {/* History Yesterday */}
              <View style={styles.history}>
                <Text style={styles.historyfont}>History Yesterday</Text>
                <View style={{marginBottom :1, padding:10, flexDirection: "row"}}>
                <View style={{marginLeft :5}}>
                  <Text style={{width :85, height :15, justifyContent:"center", alignItems:"center"}}>Task
                  </Text>
                </View>
                <View style={{marginLeft :5}}>
                  <Text style={{width :40, height :15}}>Start</Text>
                </View>
                <View style={{marginLeft :8}}>
                  <Text style={{ width :40, height :15}}>End </Text>
                </View>
                <View style={{marginLeft :5}}>
                  <Text style={{ width :35, height :15}}>Total </Text>
                </View>
                </View>
                <View style={{marginBottom :5, padding:10, borderBottomColor: "#aaa", borderBottomWidth: 1, flexDirection: "row"}}>
                <View style={{flex:4}}>
                  <Text style={{ borderRadius: 1,borderWidth:1, width :85, height :30, justifyContent:"center", alignItems:"center", position: "absolute"}}>100
                  </Text>
                </View>
                <View style={{flex:2}}>
                  <Text style={{ borderRadius: 1,borderWidth:1, width :40, height :30}}>12.30</Text>
                </View>
                <View style={{flex:2}}>
                  <Text style={{ borderRadius: 1,borderWidth:1, width :40, height :30}}>24.30 </Text>
                </View>
                <View style={{flex:2}}>
                  <Text style={{ borderRadius: 1,borderWidth:1, width :30, height :30}}>10 </Text>
                </View>
                <TouchableOpacity onPress={this._toggleModal}>
                  <View style={{ padding:5, justifyContent:"center", alignItems:"center", width:30, height:30, borderRadius: 15}}>
                    <Image style={{width: 20, height:20, tintColor:"#000000"}} source={require("../assets/images/add.png")}/>
                  </View>
                </TouchableOpacity>
                {/* Pop Up Add */}
                <Dialog.Container visible={this.state.isModalVisible}>
                    <Dialog.Title>Add Task</Dialog.Title>
                    <Dialog.Input label="Task" style={{borderWidth:1}} onChangeText={(task) => this.handleTask(task)}
                    ></Dialog.Input>
                    <Dialog.Input label="Start" style={{borderWidth:1}} onChangeText={(start) => this.handleStart(start)}
                    ></Dialog.Input>
                    <Dialog.Input label="End" style={{borderWidth:1}} onChangeText={(end) => this.handleEnd(end)}
                    ></Dialog.Input>
                    <Dialog.Input label="Total" style={{borderWidth:1}} onChangeText={(total) => this.handleTotal(total)}
                    ></Dialog.Input>
                    <Dialog.Button label="Save" onPress={this._toggleModal} />
                </Dialog.Container>
                <TouchableOpacity onPress={this._toggleModal}>
                  <View style={{ padding:5, justifyContent:"center", alignItems:"center", width:30, height:30, borderRadius: 15}}>
                    <Image style={{width: 15, height:15, tintColor:"#000000"}} source={require("../assets/images/edit.png")}/>
                  </View>
                </TouchableOpacity>
                <Dialog.Container visible={this.state.isModalVisible}>
                    <Dialog.Title>Edit Task</Dialog.Title>
                    <Dialog.Input label="Task" style={{borderWidth:1}} onChangeText={(task) => this.handleTask(task)}
                    ></Dialog.Input>
                    <Dialog.Input label="Start" style={{borderWidth:1}} onChangeText={(start) => this.handleStart(start)}
                    ></Dialog.Input>
                    <Dialog.Input label="End" style={{borderWidth:1}} onChangeText={(end) => this.handleEnd(end)}
                    ></Dialog.Input>
                    <Dialog.Input label="Total" style={{borderWidth:1}} onChangeText={(total) => this.handleTotal(total)}
                    ></Dialog.Input>
                    <Dialog.Button label="Save" onPress={this._toggleModal} />
                </Dialog.Container>
                <TouchableOpacity onPress={() => this.deleteTask(this.state.data[index])}>
                  <View style={{ padding:5, justifyContent:"center", alignItems:"center", width:30, height:30, borderRadius: 15}}>
                    <Image style={{width: 15, height:15, tintColor:"#000000"}} source={require("../assets/images/delete.png")}/>
                  </View>
                </TouchableOpacity>
              </View>
              </View>
              {/* <View>
              <TouchableOpacity onPress={this._toggleModal}>
          <Text>Show Dialog</Text>
        </TouchableOpacity>
        <Dialog.Container visible={this.state.isModalVisible}>
          <Dialog.Title>Account delete</Dialog.Title>
          <Dialog.Description>
            Do you want to delete this account? You cannot undo this action.
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this._toggleModal} />
          <Dialog.Button label="Delete" onPress={this._toggleModal} />
        </Dialog.Container>
      </View> */}
    </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  history: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    marginTop : 50,
    marginLeft :10,
  },
  historyfont:{
    fontSize : 20
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color:'#fff'
  },

  view: {
    width: 200,
    height: 50,
    backgroundColor: '#ffa',
    margin: 10,
    padding: 10
  },
  withBottomBorder: {
    borderBottomColor: '#01093A',
    borderBottomWidth: 10,
    backgroundColor: '#006183'
  },
  input: {
    margin: 10,
    height: 40,
    borderColor: '#000066',
    borderWidth: 1
 }, 
 inputtask: {
  margin: 10,
  marginTop: 5,
  height: 40,
  borderColor: '#000066',
  borderWidth: 1
}, 
 textInput: {
  borderColor: '#CCCCCC',
  borderTopWidth: 1,
  borderBottomWidth: 1,
  height: 50,
  fontSize: 25,
  paddingLeft: 20,
  paddingRight: 20
},

touch1:{
}

});