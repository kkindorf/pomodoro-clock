$(document).ready(function(){
  var pomodoroTime = $(".pomodoroTime");
  var breakTime = $(".breakTime");
  var theTime = $(".theTime");
  var breakPlus = $(".breakPlus");
  var breakMinus = $(".breakMinus");
  var clockPlus = $(".clockPlus");
  var clockMinus = $(".clockMinus");
  var sessionType = $(".session-type");
  var start = $(".start");
  var pause = $(".pause");
  var isPaused = true;
  var breakPaused = true;
  var count = 0;
  var pomodoro = {
    seconds: 60,
    minutes: 25,
    hours: 0
  };
  var breaker = {
    seconds: 60,
    minutes: 5
  };
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
  pause.on('click', function(){
      isPaused = true;
      breakPaused = true;
  });
  start.on('click', function(){
      $('button').attr('disabled', true);
      console.log('start clicked')
      count++;
      isPaused = false;
      breakPaused = false;
      if(count == 1){
        pomodoro.minutes--;
      }
  });
      timer = setInterval(function(){
        sessionType.text('Session');
        if(isPaused == false){
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

           breakTimer = setInterval(function(){
             sessionType.text('Break');
             if(breakPaused == false){
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
               sessionType.text('Session');
               pomodoro.minutes = 25;
               pomodoro.seconds = 60;
               breaker.minutes  = 5;
               breaker.seconds = 60;
               pomodoroTime.text(pomodoro.minutes+":00");
               breakTime.text(breaker.minutes+":00");
               theTime.text(pomodoro.minutes+":00");
               clearInterval(breakTimer);
             }
            }
           }, 1000)
         }
       }
     }, 1000);
})
