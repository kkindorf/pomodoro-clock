# pomodoro-clock
A Timer App Built with jQuery

This was a a pretty complicated project when I first got started with it. When I first started coming up with a plan for this project, I didn't fully understand how setInterval worked with Javascript, but completing this project really helped me develop a solid understanding of how setInterval and setTimeout work.

Basically, the most complicated function in the app is of course, the time() function:

   function time() {
        timer = setInterval(function() {
            if (isPaused == false) {
                pomodoro.seconds--;
                if (pomodoro.seconds < 10) {
                    theTime.text(pomodoro.minutes + ":0" + pomodoro.seconds);
                } else {
                    theTime.text(pomodoro.minutes + ":" + pomodoro.seconds);
                }
                if (pomodoro.seconds === 0 && pomodoro.minutes > 0) {
                    pomodoro.minutes--;
                    pomodoro.seconds = 60;
                } else if (pomodoro.minutes === 0 && pomodoro.seconds === 0) {
                    clearInterval(timer);
                    theTime.text(breaker.minutes + ":00")
                    sessionType.text('Break');
                    breaker.minutes--;
                    alert.play();
                    breakTimer = setInterval(function() {
                        if (breakPaused == false) {
                            breaker.seconds--;
                            if (breaker.seconds < 10) {
                                theTime.text(breaker.minutes + ":0" + breaker.seconds);
                            } else {
                                theTime.text(breaker.minutes + ":" + breaker.seconds);
                            }
                            if (breaker.seconds === 0 && breaker.minutes > 0) {
                                breaker.minutes--;
                                breaker.seconds = 60;
                            } else if (breaker.minutes === 0 && breaker.seconds === 0) {
                                $('button').attr('disabled', false);
                                sessionType.text('Session');
                                pomodoro.minutes = 25;
                                pomodoro.seconds = 60;
                                breaker.minutes = 5;
                                breaker.seconds = 60;
                                count = 1;
                                startCount = 0;
                                minus = 0;
                                isPaused = true;
                                breakPaused = true;
                                pomodoroTime.text(pomodoro.minutes + ":00");
                                breakTime.text(breaker.minutes + ":00");
                                theTime.text(pomodoro.minutes + ":00");
                                restart.play();
                                clearInterval(breakTimer);
                                time();
                            }
                        }
                    }, 1000)
                }
            }
        }, 1000);
    };
    
Believe me, I know there are a lot of things I could probably do to clean this code up so that is one of my TODO's with this application. 

How this function works: 

Essentially the time() function has two setInterval functions inside of it. The first setInterval, timer, is used to constantly update the pomodoro minutes and seconds until they both hit zero. Every second, the interval runs and the time is decreased from the minutes and seconds in a sequential order. Once the the pomodoro minutes and seconds both hit zero, the breakTimer interval is triggered to start which uses the same logic as the timer interval except it gets applied to the breakTime object.

Once both timer objects are at zero for all data points, the clock restarts at 25 minutes and the time function runs again, acting essentially on a continuous loop for counting time! 

