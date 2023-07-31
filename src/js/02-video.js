import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const key = 'videoplayer-current-time';
let currentTime = localStorage.getItem(key) || 0;

player.on('timeupdate', throttle(getTime, 1000));

function getTime(e) {
  currentTime = e.seconds;
  saveTime(currentTime);
}

function saveTime(currentTime) {
  localStorage.setItem(key, currentTime);
}

player.setCurrentTime(currentTime);
