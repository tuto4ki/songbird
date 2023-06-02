import { Player } from './player';
import defaultImage from '../assets/images/birdDefault.png';

export class GameView {

  constructor () {
    this.currentPicture = document.querySelector('.current-picture');
    this.currentName = document.querySelector('.current-name');
    this.playerCurrent = new Player('.current-description');
    this.showPreview = document.querySelector('.show-preview');
    this.selectedName = document.querySelector('.show-preview .h3')
    this.showExercise = document.querySelector('.show-exercise');
    this.selectedSpecies = document.querySelector('.show-preview .species');
    this.selectedDescription = document.querySelector('.show-preview .show-description')
    this.playerSelected = new Player('.show-player');
    this.selectedPicture = document.querySelector('.show-preview .show-picture');
    this.questionList = document.querySelectorAll('.questions-item');
  }

  updateLevel (bird, level = 0) {
    this.currentPicture.src = defaultImage;
    this.currentName.innerHTML = '******';
    this.showPreview.classList.add('hidden');
    this.showExercise.classList.remove('hidden');
    this.playerCurrent.loadAudio(bird.audio);
    this.playerSelected.pause();
    this.questionList.forEach((item) => {item.classList.remove('questions-active');});
    this.questionList[level].classList.add('questions-active');
  }

  clickBird (bird) {
    this.showPreview.classList.remove('hidden');
    this.showExercise.classList.add('hidden');
    this.selectedName.innerHTML = bird.name;
    this.selectedSpecies.innerHTML = bird.species;
    this.selectedDescription.innerHTML = bird.description;
    this.playerSelected.loadAudio(bird.audio);
    this.selectedPicture.src = bird.image;
  }

  guessBird (bird) {
    this.currentPicture.src = bird.image;
    this.currentName.innerHTML = bird.name;
    this.playerCurrent.view.pauseAudio();
  }

  localization (bird, birdClick) {
    try {
      if (birdClick) {
        this.selectedName.innerHTML = birdClick.name;
        this.selectedDescription.innerHTML = birdClick.description;
      }
      if (bird) {
        this.currentName.innerHTML = bird.name;
      }
    }
    catch (error) {
      console.log(error);
    }
  }

}
