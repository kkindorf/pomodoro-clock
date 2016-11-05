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
var isPaused = true;
var breakPaused = true;
var startCount = 0;
var count = 1;
var minus = 0;
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
        if (startCount == 0) {
            breaker.minutes++;
            breakTime.text(breaker.minutes + ":00");
        }
        if (sessionType.text() === 'Break') {
            breaker.minutes++;
            theTime.text(breaker.minutes + ':00');
            breakTime.text(breaker.minutes + ":00");
            breaker.seconds = 60;
            count = 1;

        }
    })
    breakMinus.click(function() {
        if (startCount == 0) {
            if (breaker.minutes === 1) {
                return;
            }
            breaker.minutes--;
            if (breaker.seconds > 0) {
                breakTime.text(breaker.minutes + ":00");
            }

        }
        if (sessionType.text() === 'Break' && startCount > 0) {
            breakTime.text(breaker.minutes + ":00");
            if (breaker.minutes === 1) {
                return;
            }
            if (minus === 0) {
                breaker.minutes++;
            }
            minus++;
            breaker.minutes--;
            theTime.text(breaker.minutes + ':00');
            breakTime.text(breaker.minutes + ":00");
            breaker.seconds = 60;
            count = 1;

        }

    })

    clockPlus.click(function() {
        if (sessionType.text() == 'Break') {
            return;
        }
        pomodoroTime.text(pomodoro.minutes + ":00");
        count = 1;
        pomodoro.seconds = 60;
        if (pomodoro.minutes === 60) {
            pomodoroTime.text(pomodoro.minutes + ":00");
            theTime.text(pomodoro.minutes + ":00");
            return;
        }

        pomodoro.minutes++;
        pomodoroTime.text(pomodoro.minutes + ":00");
        theTime.text(pomodoro.minutes + ":00");
    })
    clockMinus.click(function() {
        if (sessionType.text() == 'Break') {
            return;
        }
        if (minus === 0) {
            pomodoro.minutes++;
        }
        minus++;
        pomodoroTime.text(pomodoro.minutes + ":00");
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
        $("button").attr('disabled', false);
        isPaused = true;
        breakPaused = true;
        clearInterval();
    });
    start.on('click', function() {
        minus = 0;
        startCount++;
        $("button").attr('disabled', true);
        isPaused = false;
        breakPaused = false;
        if (count == 1) {
            pomodoro.minutes--;
        }
        if (count == 1 && sessionType.text() == 'Break') {
            breaker.minutes--;
        }
        count++;
    });
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
                    theTime.text(breaker.minutes + ":00")
                    sessionType.text('Break');
                    breaker.minutes--;
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
                                clearInterval(breakTimer);
                                time();
                            }
                        }
                    }, 1000)
                }
            }
        }, 1000);
    };
})
