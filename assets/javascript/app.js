// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyDpIAcpds2fbIEIAh7GPx4Iy9hBSH8hGqk",
  authDomain: "assignment07basic.firebaseapp.com",
  databaseURL: "https://assignment07basic.firebaseio.com",
  projectId: "assignment07basic",
  storageBucket: "assignment07basic.appspot.com",
  messagingSenderId: "544083161186"
};

firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment();
//Since the -1 year seems to be the thing to do, here we go!.


// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
event.preventDefault();

// Grabs user input
var trainName = $("#train-name-input").val().trim();
var trainDestination = $("#destination-input").val().trim();
var trainStartTime = $("#first-train-time-input").val().trim();
var trainFrequency = $("#frequency-input").val().trim();

//Math time to determine both when the next arrival time AND how many minutes away the next train currently is
var convertedTrainStartTime = moment(trainStartTime, "hh:mm").subtract(1, "day");
console.log(convertedTrainStartTime);
//Establishing the time difference between the current time, and that of the first train to run.
var timeDifference = currentTime.diff(moment(convertedTrainStartTime),"minutes");
//need the remainder establish how much time til the next train
var remainder = timeDifference % trainFrequency;
var trainMinAway = trainFrequency-remainder;
//use the trainMinAway solution to identify what time the next train is arriving
var trainNextArrival = moment().add(trainMinAway, "minutes").format("hh:mm a");

// Creates local "temporary" object for holding employee data
var newTrain = {
  name: trainName,
  destination: trainDestination,
  start: trainStartTime,
  frequency: trainFrequency,
  min: trainMinAway,
  next: trainNextArrival
};



// Uploads employee data to the database
database.ref().push(newTrain);

// Logs everything to console
console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.start);
console.log(newTrain.frequency);
console.log(newTrain.min)
console.log(newTrain.next)


//alert("Train successfully added");

// Clears all of the text-boxes
$("#train-name-input").val("");
$("#destination-input").val("");
$("#first-train-time-input").val("");
$("#frequency-input").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
console.log(childSnapshot.val());

// Store everything into a variable.
var trainName = childSnapshot.val().name;
var trainDestination = childSnapshot.val().destination;
var trainStart = childSnapshot.val().start;
var trainFrequency = childSnapshot.val().frequency;
var minAway = childSnapshot.val().min;
var nextArrival = childSnapshot.val().next;

// train Info
console.log(trainName);
console.log(trainDestination);
console.log(trainStart);
console.log(trainFrequency);
console.log(minAway);
console.log(nextArrival);




// Create the new row
var newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(trainDestination),
  $("<td>").text(trainStart),
  $("<td>").text(nextArrival),
  $("<td>").text(minAway)
  );

// Append the new row to the table
$("#schedule-table > tbody").append(newRow);
});