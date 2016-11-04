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
var reset = $(".reset");
var body = $("body");
var isPaused = true;
var breakPaused = true;
var count = 1;
var pomodoro = {
    seconds: 60,
    minutes: 25,
    hours: 0
};
var breaker = {
    seconds: 60,
    minutes: 5
};
/*set initial text here*/
pomodoroTime.text(pomodoro.minutes + ":00");
breakTime.text(breaker.minutes + ":00");
theTime.text(pomodoro.minutes + ":00");
sessionType.text('Session');

$(document).ready(function() {
    breakPlus.click(function() {
        count = 1;
        breaker.seconds = 60;
        if (breaker.minutes === 10) {
            return;
        }
        breaker.minutes++;
        breakTime.text(breaker.minutes + ":00");
    })
    breakMinus.click(function() {
        count = 1;
        breaker.seconds = 60;
        if (breaker.minutes === 1) {
            return;
        }
        breaker.minutes--;
        breakTime.text(breaker.minutes + ":00");
    })
    clockPlus.click(function() {
        count = 1;
        pomodoro.seconds = 60;
        if (pomodoro.minutes === 60) {
            pomodoroTime.text(pomodoro.minutes + ":00");
            theTime.text(pomodoro.minutes + ":00");
            return;
        }
        pomodoro.minutes++;
        setPomodoroMin = pomodoro.minutes;
        pomodoroTime.text(pomodoro.minutes + ":00");
        theTime.text(pomodoro.minutes + ":00");
    })
    clockMinus.click(function() {
        count = 1;
        pomodoro.seconds = 60;
        if (pomodoro.minutes === 1) {
            return;
        }
        pomodoro.minutes--;
        pomodoroTime.text(pomodoro.minutes + ":00");
        theTime.text(pomodoro.minutes + ":00");
    })
    pause.on('click', function() {
        isPaused = true;
        breakPaused = true;


    });
    start.on('click', function() {
        $("button").attr("disabled", true);
        isPaused = false;
        breakPaused = false;
        if (count == 1) {
            pomodoro.minutes--;
        }
        count++;
    });
    reset.on('click', function() {
        $("button").attr("disabled", false);
        breakPlus.show();
        breakMinus.show();
        clockPlus.show();
        clockMinus.show();
        clearInterval(timer);
        pomodoro.minutes = 25;
        pomodoro.seconds = 60;
        breaker.minutes = 5;
        breaker.seconds = 60;
        count = 1;
        isPaused = true;
        breakPaused = true;
        pomodoroTime.text(pomodoro.minutes + ":00");
        breakTime.text(breaker.minutes + ":00");
        theTime.text(pomodoro.minutes + ":00");
        time();
    })
    time();

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
                    breaker.minutes--;
                    theTime.text(breaker.minutes + ":00")
                    breakTimer = setInterval(function() {
                        sessionType.text('Break');
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
                                isPaused = true;
                                breakPaused = true;
                                pomodoroTime.text(pomodoro.minutes + ":00");
                                breakTime.text(breaker.minutes + ":00");
                                theTime.text(pomodoro.minutes + ":00");
                                clearInterval(breakTimer);
                                breakPlus.show();
                                breakMinus.show();
                                clockPlus.show();
                                clockMinus.show();
                                time();
                            }
                        }
                    }, 1000)
                }
            }
        }, 1000);
    };
})
