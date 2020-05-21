window.onload = setInterval(clock, 1000);
function clock() {
  var d = new Date();

  var date = d.getDate();

  var month = d.getMonth();
  var montharr = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  month = montharr[month];

  var year = d.getFullYear();

  var day = d.getDay();
  var dayarr = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  day = dayarr[day];

  var hour = ("0" + d.getHours()).slice(-2);
  var min = ("0" + d.getMinutes()).slice(-2);
  var sec = ("0" + d.getSeconds()).slice(-2);

  document.getElementById("date").innerHTML =
    day + " " + date + " " + month + " " + year;
  document.getElementById("time").innerHTML = hour + ":" + min + ":" + sec;
}
