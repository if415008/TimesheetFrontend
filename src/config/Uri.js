export default {
  RESOURCE: "http://192.168.43.115:42343/api/",
  // RESOURCE: "http://192.168.1.225:42343/api/",

  //EMPLOYEE_DETAIL
  ENDPOINT_GET_EMPLOYEE_DETAIL: 'employeeDetails',
  ENDPOINT_CREATE_EMPLOYEE_DETAIL: 'employeeDetails',
  ENDPOINT_EDIT_EMPLOYEE_DETAIL: 'employeeDetails/{id}',
  ENDPOINT_DELETE_EMPLOYEE_DETAIL: 'employeeDetails{id}',
  ENDPOINT_GET_BY_ID_EMPLOYEE_DETAIL: 'employeeDetails/{id}',

  //EMPLOYEE
  ENDPOINT_GET_EMPLOYEE: 'employees',
  ENDPOINT_CREATE_EMPLOYEE: 'employees',
  ENDPOINT_EDIT_EMPLOYEE: 'employees/{id}',
  ENDPOINT_DELETE_EMPLOYEE: 'employees/{id}',
  ENDPOINT_GET_BY_ID_EMPLOYEE: 'employees/{id}',

  //PROJECT
  ENDPOINT_GET_PROJECT: 'projects',
  ENDPOINT_CREATE_PROJECT: 'projects',
  ENDPOINT_EDIT_PROJECT: 'projects/{id}',
  ENDPOINT_DELETE_PROJECT: 'projects/{id}',
  ENDPOINT_GET_BY_ID_PROJECT: 'projects/{id}',

  //SPRINT
  ENDPOINT_GET_SPRINT: 'sprints',
  ENDPOINT_CREATE_SPRINT: 'sprints',
  ENDPOINT_EDIT_SPRINT: 'sprints/{id}',
  ENDPOINT_DELETE_SPRINT: 'sprints/{id}',
  ENDPOINT_GET_BY_ID_SPRINT: 'sprints/{id}',

  //TASK
  ENDPOINT_GET_TASK: 'tasks',
  ENDPOINT_CREATE_TASK: 'tasks',
  ENDPOINT_EDIT_TASK: 'tasks/{id}',
  ENDPOINT_DELETE_TASK: 'tasks/{id}',
  ENDPOINT_GET_BY_ID_TASK: 'tasks/{id}',
  ENDPOINT_EDIT_TASK_START : 'tasks/start/{id}',
  ENDPOINT_EDIT_TASK_STOP : 'tasks/stop/{id}',

  //TIMESHEET
  ENDPOINT_GET_TIMESHEET: 'timesheets',
  ENDPOINT_CREATE_TIMESHEET: 'timesheets',
  ENDPOINT_EDIT_TIMESHEET: 'timesheets/{id}',
  ENDPOINT_DELETE_TIMESHEET: 'timesheets/{id}',
  ENDPOINT_GET_BY_ID_TIMESHEET: 'timesheets/{id}',
  ENDPOINT_CREATE_TIMESHEET_STOP: 'timesheets/stop/{id}',
};