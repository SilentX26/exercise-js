'use strict';

const getGreetings = curHours => {
    if(curHours < 12) {
        return 'pagi';
    } else if(curHours >= 12 && curHours < 16) {
        return 'siang';
    } else if(curHours >= 16 && curHours < 19) {
        return 'sore';
    } else if(curHours >= 19) {
        return 'malam';
    }
}

const fixSeconds = second => (second < 10) ? '0' + second : second;

const refreshClock = () => {
    const hoursEl = document.getElementById('hour');
    const minutesEl = document.getElementById('minute');
    const secondsEl = document.getElementById('second');
    const datetimeEl = document.querySelector('.datetime');
    const greetingsEl = document.querySelector('.greetings');
    
    const datetimeObj = new Date();
    const curHours = datetimeObj.getHours();
    const curMinutes = datetimeObj.getMinutes();
    const curSeconds = fixSeconds(datetimeObj.getSeconds());
    const curDatetime = `${ datetimeObj.getDate() } - ${ datetimeObj.getMonth() } - ${datetimeObj.getFullYear()}`;

    hoursEl.innerHTML = curHours;
    minutesEl.innerHTML = curMinutes;
    secondsEl.innerHTML = curSeconds;

    datetimeEl.innerHTML = curDatetime;
    greetingsEl.innerHTML = `Selamat ${ getGreetings(curHours) }, Randika.`;
}

window.onload = refreshClock;
setInterval(refreshClock, 1000);