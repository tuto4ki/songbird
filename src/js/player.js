import { PlayerView } from "./playerView";

export class Player {

  constructor (sectionName, func = null) {
    this.audio = new Audio();
    this.view = new PlayerView(this, sectionName);
    this.isPlay = false;
    this.func = func;
  }

  loadAudio (link) {
    this.audio.src = link;
    this.isPlay = false;
    this.view.showLoad();
    this.view.startSong();
  }

  play () {
    this.isPlay = !this.isPlay;
    if (this.isPlay) {
      this.audio.play();
      if (this.func) this.func(this);
    }
    else {
      this.audio.pause();
    }
  }

  pause () {
    this.isPlay = false;
    this.audio.pause();
  }

  currentTime () {
    return this.audio.currentTime / this.audio.duration;
  }

  setAudioCurrentTime (time) {
    this.audio.currentTime = time * this.audio.duration;
  }

  setMuteSong () {
    this.audio.muted = !this.audio.muted;
    return this.audio.muted;
  }

  setVolume(newValue) {
    this.audio.volume = newValue;
  }

  currentTimeAudio () {
    return this.audio.currentTime;
  }

  durationAudio () {
    return this.audio.duration;
  }

  deleteAudio () {
    this.audio.currentTime = 0;
    this.audio.pause();
    this.view.clearIntervalAudio();
  }
}