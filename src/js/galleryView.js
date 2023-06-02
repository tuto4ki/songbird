import Bird from "./bird";
import { BirdView } from "./birdView";
import birdsDataRu from './birds';
import birdsDataEn from './birdsEn'
import { Player } from "./player";
let birdsData = birdsDataRu;
export class GalleryView {

  constructor (language) {
    this.listBirds  = [];
    this.listBirdsView = [];
    this.playerActive = [];
    this.activeIndex = 0;
  }

  createGallery (language) {
    if (language === 'en') {
      birdsData = birdsDataEn;
    }
    this.galleryActive = document.createElement('div');
    this.galleryActive.classList.add('gallery-active');
    this.main = document.createElement('div');
    this.main.classList.add('gallery');
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper-list');
    this.gallery = document.createElement('div');
    this.gallery.classList.add('slider-birds');
    this.gallery.addEventListener

    for (let i = 0; i < birdsData.length; i++) {
      for (let j = 0; j < birdsData[i].length; j++) {
        const bird = birdsData[i][j];
        let birdObj = new Bird (bird.id, bird.name, bird.species, bird.description, bird.image, bird.audio);
        this.listBirds.push (birdObj);
        let birdViewObj = new BirdView (birdObj, 'bird' + i + j, language);
        this.listBirdsView.push(birdViewObj);
        this.gallery.append(birdViewObj.getView());
      }
    }
    this.wrapper.append(this.gallery);
    this.main.append(this.wrapper);
  }
  
  getGallery (language) {
    this.createGallery (language)
    return this.main;
  }

  addAudioGallery () {
    const birds = this.gallery.childNodes;
    for (let i = 0; i < birds.length; i++) {
      let audio = new Player('.' + birds[i].className, (audioClick) => {
        for (let i = 0; i < this.playerActive.length; i++) {
          if (audioClick !== this.playerActive[i]) {
            this.playerActive[i].view.pauseAudio();
          }
        }
      });
      //audio.loadAudio(this.listBirds[i].audio);
      let load = birds[i].querySelector('.load-audio');
      load.addEventListener('click', () => {this.listBirdsView[i].loadAudio(); audio.loadAudio(this.listBirds[i].audio);});
      this.playerActive.push(audio);
    }
  }

  closeGallery () {
    for (let i = 0; i < this.playerActive.length; i++) {
      this.playerActive[i].deleteAudio();
    }
  }

  localization (language) {
    if (language == 'ru') {
      birdsData = birdsDataRu;
    }
    else {
      birdsData = birdsDataEn;
    }
    const birds = this.gallery.childNodes;
    for (let i = 0; i < birds.length; i++) {
      let className = birds[i].className;
      let ii = className[4];
      let j = className[5];
      this.listBirds[i].name = birdsData[ii][j].name;
      this.listBirds[i].description = birdsData[ii][j].description;
      this.listBirdsView[i].localization(this.listBirds[i]);
    }
  }

}