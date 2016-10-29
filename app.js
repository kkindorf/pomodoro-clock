$(document).ready(function(){
  var clock = $(".clock");
  var breakBox = $(".breakBox");
  var pomodoro = {
    seconds: 10,
    minutes: 0,
    hours: 0
  };
  var breakTime = {
    seconds: 60,
    minutes: 5
  }
  clock.text(pomodoro.minutes);
  breakBox.text(breakTime.minutes);
  var timer = setInterval(function(){
     pomodoro.seconds--;
     if(pomodoro.seconds < 10){
       clock.text(pomodoro.minutes +":0"+pomodoro.seconds);
     } else{
       clock.text(pomodoro.minutes +":"+pomodoro.seconds);
     }
     if(pomodoro.seconds === 0 && pomodoro.minutes > 0){
       pomodoro.minutes--;
       pomodoro.seconds = 60;
     }
     else if(pomodoro.minutes === 0 && pomodoro.seconds === 0){
       clearInterval(timer);
       breakTime.minutes--;
       var breakTimer = setInterval(function(){
         breakTime.seconds--;
         if(breakTime.seconds < 10){
           breakBox.text(breakTime.minutes +":0"+breakTime.seconds);
         } else{
           breakBox.text(breakTime.minutes +":"+breakTime.seconds);
         }
         if(breakTime.seconds === 0 && breakTime.minutes > 0){
           breakTime.minutes--;
           breakTime.seconds = 60;
         }
         else if(breakTime.minutes === 0 && breakTime.seconds === 0){
           clearInterval(breakTimer);
         }
       }, 1000)
     }
  }, 1000);
})
