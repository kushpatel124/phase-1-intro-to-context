function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(array) {
  let objs = array.map(x => (
    createEmployeeRecord(x)
  ));
  return objs
}


function createTimeInEvent(employeeObject, date) {
  const words = date.split(' ');
  let timeInEventObj = {
    type: "TimeIn",
    hour: parseFloat(words[1]),
    date: words[0]
  }
  employeeObject.timeInEvents.push(timeInEventObj)
  return employeeObject
}

function createTimeOutEvent(employeeObject, date) {
  const words = date.split(' ');

  let timeOutEventObj = {
    type: "TimeOut",
    hour: parseFloat(words[1]),
    date: words[0],
  }
  employeeObject.timeOutEvents.push(timeOutEventObj)
  return employeeObject
}

function hoursWorkedOnDate(employeeObject, date) {

  let objOfInterest1 = employeeObject.timeOutEvents.find(event => event.date === date)
  let theTimeOut = objOfInterest1.hour
  let objOfInterest2 = employeeObject.timeInEvents.find(event => event.date === date)
  let theTimeIn = objOfInterest2.hour

  let hours = (theTimeOut - theTimeIn) / 100
  return hours;
}

function wagesEarnedOnDate(employeeObject, date) {
  let payRate = employeeObject.payPerHour
  let payOwned = payRate * hoursWorkedOnDate(employeeObject, date)
  return payOwned;
}

function allWagesFor(employeeObject) {
  let totalSum = 0;
  employeeObject.timeInEvents.forEach(event => totalSum += (wagesEarnedOnDate(employeeObject, event.date)))
  return totalSum;
}

function calculatePayroll(employeeArray) {
  let fullSum = 0;
  employeeArray.forEach(event => fullSum += (wagesEarnedOnDate(employeeObject, event.date)))
  return fullSum;

}


