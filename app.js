$(document).ready(function(){
  var pomodoroTime = $(".pomodoroTime");
  var breakTime = $(".breakTime");
  var theTime = $(".theTime");
  var breakPlus = $(".breakPlus");
  var breakMinus = $(".breakMinus");
  var clockPlus = $(".clockPlus");
  var clockMinus = $(".clockMinus");
  var start = $(".start");
  var pomodoro = {
    seconds: 60,
    minutes: 25,
    hours: 0
  };
  var breaker = {
    seconds: 60,
    minutes: 5
  };
  var reset = function(){
    pomdoro.minutes = 25;
    breaker.minutes = 5;
    pomodoroTime.text(pomodoro.minutes+":00");
    breakTime.text(breaker.minutes+":00");
    theTime.text(pomodoro.minutes+":00");
  }
  pomodoroTime.text(pomodoro.minutes+":00");
  breakTime.text(breaker.minutes+":00");
  theTime.text(pomodoro.minutes+":00");
  breakPlus.click(function(){
    if(breaker.minutes === 10){
      return;
    }
    breaker.minutes++;
    breakTime.text(breaker.minutes+":00");
  })
  breakMinus.click(function(){
    if(breaker.minutes === 1){
      return;
    }
    breaker.minutes--;
    breakTime.text(breaker.minutes+":00");
  })
  clockPlus.click(function(){
    if(pomodoro.minutes === 60){
      pomodoroTime.text(pomodoro.minutes+":00");
      theTime.text(pomodoro.minutes+":00");
      return;
    }
    pomodoro.minutes++;
    pomodoroTime.text(pomodoro.minutes+":00");
    theTime.text(pomodoro.minutes+":00");
  })
  clockMinus.click(function(){
    if(pomodoro.minutes === 1){
      return;
    }
    pomodoro.minutes--;
    pomodoroTime.text(pomodoro.minutes+":00");
    theTime.text(pomodoro.minutes+":00");
  })

start.on('click', function(){
  $('button').attr('disabled', true);
  pomodoro.minutes--;
  var timer = setInterval(function(){
     pomodoro.seconds--;
     if(pomodoro.seconds < 10){
       theTime.text(pomodoro.minutes +":0"+pomodoro.seconds);
     } else{
       theTime.text(pomodoro.minutes +":"+pomodoro.seconds);
     }
     if(pomodoro.seconds === 0 && pomodoro.minutes > 0){
       pomodoro.minutes--;
       pomodoro.seconds = 60;
     }
     else if(pomodoro.minutes === 0 && pomodoro.seconds === 0){
       clearInterval(timer);
       breaker.minutes--;
       theTime.text(breaker.minutes+":00")
       var breakTimer = setInterval(function(){
         breakMinus.click(function(){
           return;
         })
         breaker.seconds--;
         if(breaker.seconds < 10){
           theTime.text(breaker.minutes +":0"+breaker.seconds);
         } else{
           theTime.text(breaker.minutes +":"+breaker.seconds);
         }
         if(breaker.seconds === 0 && breaker.minutes > 0){
           breaker.minutes--;
           breaker.seconds = 60;
         }
         else if(breaker.minutes === 0 && breaker.seconds === 0){
           $('button').attr('disabled', false);
           clearInterval(breakTimer);
         }
       }, 1000)
    
     }
  }, 1000);

})

})
