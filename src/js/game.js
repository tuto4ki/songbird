import birdsDataRu from './birds';
import birdsDataEn from './birdsEn';
import Bird from './bird';
import { getRandom } from './default';
import { ListBirdsView } from './listBirdsView';
import srcAudioFalse from '../assets/sounds/answerFalse.mp3';
import srcAudioTrue from '../assets/sounds/answerTrue.mp3';
const audioFalse = new Audio(srcAudioFalse);
const audioTrue = new Audio(srcAudioTrue);
audioFalse.volume = audioTrue.volume = 0.3;
export class Game {

  constructor (gameView, level = 0) {
    this.birdsData = birdsDataRu;
    this.gameView = gameView;
    this.level = 0;
    this.birdQuestion = null;
    this.birdClick = null;
    this.listAnswer = [];
    this.ListBirdsView = new ListBirdsView(this);
    this.score = 0;
    this.levelLoad();
    this.audioTrue;
  }

  levelLoad () {
    this.birdClick = null;
    this.levelEnd = false;
    this.listAnswer = [];
    this.ListBirdsView.updateScore();
    for (let i = 0; i < this.birdsData[this.level].length; i++) {
      const bird = this.birdsData[this.level][i];
      this.listAnswer.push(new Bird(bird.id, bird.name, bird.species, bird.description, bird.image, bird.audio));
    }
    this.ListBirdsView.generationListBird();
    const ran = getRandom(0, this.listAnswer.length - 1);
    this.birdQuestion = this.listAnswer[ran];
    this.gameView.updateLevel(this.birdQuestion, this.level);
  }

  clickListBirds (bird) {
    let birdItem = this.listAnswer.find( item => item.name === bird.innerHTML);
    if (birdItem) {
      this.birdClick = birdItem;
      this.gameView.clickBird(birdItem);
      if (this.levelEnd) {
        return null;
      }
      if (birdItem === this.birdQuestion) {
        this.score += this.ListBirdsView.scoreLevel;
        this.ListBirdsView.updateScore();
        this.gameView.guessBird(this.birdQuestion);
        this.levelEnd = true;
        audioTrue.play();
        return true;
      }
      audioFalse.currentTime = 0;
      audioFalse.play();
      return false;
    }
  }

  nextLevel () {
    if (!this.levelEnd) {
      return;
    }
    if (this.level < this.birdsData.length - 1) {
      this.level++;
      this.levelLoad ();
    }
    else {
      this.ListBirdsView.gameEnd (this.score < this.birdsData.length * 5, this.score);
      this.gameEnd ();
    }
  }

  gameEnd () {
    this.level = 0;
    this.score = 0;
    this.levelLoad ();
  }

  localization (language) {
    if (language === 'ru')  this.birdsData = birdsDataRu;
    else  this.birdsData = birdsDataEn;
    for (let i = 0; i < this.birdsData[this.level].length; i++) {
      const bird = this.birdsData[this.level][i];
      this.listAnswer[i].name = bird.name;
      this.listAnswer[i].description = bird.description;
    }
   this.ListBirdsView.localization();

   this.gameView.localization(this.levelEnd ? this.birdQuestion : null, this.birdClick);
  }

}
