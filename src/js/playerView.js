import { getTimeCodeFromNum } from './default';

export class PlayerView {

  constructor(player, sectionName = '') {
    this.player = player;
    this.play = document.querySelector(sectionName + ' .play');
    this.play.addEventListener('click', () => {this.playAudio(); });
    this.progressActive = document.querySelector(sectionName + ' .progress-active');
    this.progressBar = document.querySelector(sectionName + ' .duration-player');
    this.progressBar.addEventListener('click', (e) => this.clickProgressBar(e));
    this.songIcon = document.querySelector(sectionName + ' .song-icon');
    this.songIcon.addEventListener('click', () => this.muteSong());
    this.volumeSong = document.querySelector(sectionName + ' .input-song');
    this.volumeSong.addEventListener('input', () => this.player.setVolume(this.volumeSong.value));
    this.durationTimer = document.querySelector(sectionName + ' .progress-duration');
    this.currentTimer = document.querySelector(sectionName + ' .progress-current');
    this.setInterval = setInterval(() => this.progressShow(), 500);
    this.player.setVolume(this.volumeSong.value);
    this.load = document.querySelector(sectionName + ' .load');
    this.playerShow = document.querySelector(sectionName + ' .current-load');
  }

  playAudio() {
    this.play.classList.toggle('pause');
    this.player.play();
  }

  pauseAudio () {
    this.play.classList.remove('pause');
    this.player.pause();
  }

  progressShow() {
    if (!isNaN(this.player.currentTimeAudio()) && !isNaN(this.player.durationAudio())) {
      this.progressActive.style.width = this.player.currentTime() * 100 + "%";
      this.hiddenLoad();
      this.currentTimer.innerHTML = isNaN(this.player.currentTimeAudio()) ? '' : getTimeCodeFromNum(this.player.currentTimeAudio());
      this.durationTimer.innerHTML = isNaN(this.player.durationAudio()) ? '' : getTimeCodeFromNum(this.player.durationAudio());
    }
  }

  clickProgressBar (e) {
    const timelineWidth = window.getComputedStyle(this.progressBar).width;
    this.player.setAudioCurrentTime(e.offsetX / parseInt(timelineWidth));
  }

  muteSong() {
    if(this.player.setMuteSong()) {
      this.songIcon.style.opacity = 0.4;
      return;
    }
    this.songIcon.style.opacity = 1;
  }

  startSong () {
    this.play.classList.remove('pause');
  }

  showLoad () {
    this.load.classList.remove('hidden');
    this.playerShow.classList.add('hidden');
  }

  hiddenLoad(){
    this.load.classList.add('hidden');
    this.playerShow.classList.remove('hidden');
  }

  clearIntervalAudio () {
    clearInterval(this.setInterval);
  }
}