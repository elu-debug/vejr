var weather;
var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
//var lat = 'lat';
//var longi = 'long';
var apiKey = '&APPID=4026be34041646fbd34bb6757ed62cbf';
var units = '&units=metric';
var city ='city';
var sprog = '&lang=da';
var styrke = '&speed';
var generelt = '&main';
var beskrivelse = '&description';
var vejrdata;
let angle = 0;
//var url2 = 'https://api.openweathermap.org/data/2.5/weather?q=Aarhus,dk&appid=4026be34041646fbd34bb6757ed62cbf&units=metric&lang=da';

function setup()
{
  createCanvas(450, 200);
  //background(255, 204, 0);
  //fill(255,0,0);
  fill(0);
  var button = select('#submit');
  button.mousePressed(weatherAsk);
  input = select ('#city');
  function weatherAsk() {
    var url = api + input.value() + apiKey + units + styrke + generelt + beskrivelse + sprog;
    var search = input.value();
    console.log(search.value);

    loadJSON(url, gotData);
  }
}
function gotData(data) {
  print(data);
  weather = data;
}

function draw() {
  background(120);

  if (weather) {
    var temp = weather.main.temp;
    var humidity = weather.main.humidity;
    var country = weather.sys.country;
    var vindretning = weather.wind.deg;
    var styrke = weather.wind.speed;

    var currentYear = year();
    var currentMonth = month();
    var currentDay = day();
    var currentHour = hour();
    var currentMinute = minute();
    var currentSecond = second();
    var currentDate = currentDay + '-' + nf(currentMonth, 2) + '-' + nf(currentYear, 2);
    var currentTime = currentHour + ':' + nf(currentMinute, 2) + ':' + nf(currentSecond, 2);

    text('Dato/tid ' + currentDate + ', ' + currentTime, 10, 10, 250, 100);

    
      var vejrdata2 = ['Temp. grader', 'Fugtighed %', 'Land'].toString();
      var vejrdata = [temp, humidity, country].toString();
      text(vejrdata2.replace(/,/g,"          "), 10, 50);

      text(vejrdata.replace(/,/g,"                        "), 10, 80);
noStroke();

    text('N', 348, 50 );
    text('S', 348, 175);
    text('V', 285, 110);
    text('Ø', 408, 110);

    ellipse(350, 110, 110);
    fill('black');
    text(Math.round(styrke*3.6) + ' km/t ', 330, 127);
    text(Math.round(styrke) + 'm/s', 330, 145);
    
       
    text('Retning ' + vindretning + '° ', 320, 100)
      ellipse(350, 110, 5);
    fill('white');
  }

  let v0 = createVector(350, 110);
  let v1 = createVector(50, 0);
  angleMode(DEGREES);
  drawArrow(v0, v1.rotate(vindretning + 90), v1.mag());
  //angle = vindretning + 90;
}

// draw an arrow for a vector at a given base position
function drawArrow(base, vec, myColor) {
  push();
  //stroke(myColor);
  strokeWeight(3);
  //fill(myColor);
 fill(255, 0, 0);
  translate(base.x, base.y);
  line(0, 0, -vec.x, -vec.y);
  rotate(vec.heading());
  let arrowSize = 12;
  translate(-vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);

  pop();
}
