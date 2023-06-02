export class ListBirdsView {

  constructor (game) {
    this.game = game;
    this.listBirdsHtml = document.querySelector('.answers-list');
    this.listBirdsHtml.addEventListener('click', event => this.onClickList(event));
    this.buttonNext = document.querySelector('.answer-next-step');
    this.buttonNext.addEventListener ('click', () => { this.game.nextLevel()});
    this.scoreView = document.querySelector('.score-number');
    this.scoreView.innerHTML = '0';
    this.scoreLevel = 5;
    this.gamePage = document.querySelector('.game');
    this.gameEndPage = document.querySelector('.game-end');
  }

  generationListBird () {
    this.buttonNext.classList.add('not-active');
    this.listBirdsHtml.innerHTML = '';
    for (let i = 0; i < this.game.listAnswer.length; i++) {
      let bird = document.createElement('li');
      bird.className = 'answers-item';
      bird.innerHTML = this.game.listAnswer[i].name;
      this.listBirdsHtml.appendChild(bird);
    }
  }

  onClickList(event) {
    if (event.target.classList.contains('answers-item')) {
      const isChecked = this.game.clickListBirds(event.target);
      if (isChecked === null) {
        return;
      }
      if (event.target.classList.contains('answers-false') || event.target.classList.contains('answers-true')) {
        return;
      }
      if (isChecked) {
        this.buttonNext.classList.remove('not-active');
        event.target.classList.add('answers-true');
      }
      else {
        if (this.scoreLevel > 0)
          this.scoreLevel--;
        event.target.classList.add('answers-false');
      }
    }
  }

  updateScore () {
    this.scoreLevel = 5;
    this.scoreView.innerHTML = this.game.score;
  }

  gameEnd (isNewGame, score) {
    this.gamePage.classList.add('hidden');
    this.gameEndPage.classList.remove('hidden');
    this.gameEndPage.querySelector('.number-score').innerHTML = score;
    if (isNewGame) {
      this.gameEndPage.querySelector('.game-end-again').classList.remove('hidden');
      this.gameEndPage.querySelector('.game-end-all').classList.add('hidden');
      this.gameEndPage.querySelector('button').classList.remove('hidden');
      this.gameEndPage.querySelector('button').addEventListener('click', () => {
        this.gamePage.classList.remove('hidden');
        this.gameEndPage.classList.add('hidden');
      });
    }
    else {
      this.gameEndPage.querySelector('.game-end-again').classList.add('hidden');
      this.gameEndPage.querySelector('.game-end-all').classList.remove('hidden');
      this.gameEndPage.querySelector('button').classList.add('hidden');
    }
  }

  localization () {
    let birds = this.listBirdsHtml.querySelectorAll('li')
    for (let i = 0; i < birds.length; i++) {
      birds[i].innerHTML = this.game.listAnswer[i].name;
    }
  }

}