// Your code here
// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]){
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(data){
    return data.map(createEmployeeRecord)
}

function createTimeInEvent(employee, dateString){
    const [date, time] = dateString.split(" ")
    const hour = parseInt(time, 10)
    const timeInEvent = {
        type: "TimeIn",
        date,
        hour
    }

    employee.timeInEvents.push(timeInEvent)

    return employee
}


function createTimeOutEvent(employee, dateString){
    const [date, time] = dateString.split(" ")
    const hour = parseInt(time, 10)
    const timeOutEvent = {
        type: "TimeOut",
        date,
        hour
    }

    employee.timeOutEvents.push(timeOutEvent)

    return employee
}

function hoursWorkedOnDate(employee, dateString){
    const timeInEvent = employee.timeInEvents.find(event => event.date === dateString)
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === dateString)

    const timeInHour = timeInEvent.hour
    const timeOutHour = timeOutEvent.hour

    return(timeOutHour - timeInHour) / 100
}

function wagesEarnedOnDate(employee, dateString){
    const hoursWorked = hoursWorkedOnDate(employee, dateString)
    const rate = employee.payPerHour

    return hoursWorked * rate
}

function allWagesFor(employee){
    const datesWorked = employee.timeInEvents.map(event => event.date)

    return datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0)
}

function calculatePayroll(employees){
    return employees.reduce((totalPayroll, employee) => {
        return totalPayroll + allWagesFor(employee)
    }, 0)
}