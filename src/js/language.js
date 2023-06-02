import LOCALIZATION from './localization';

export class Language {

  constructor (game) {
    this.game = game;
    this.language = 'ru';
    window.addEventListener('load', () => this.getLocalStorage());
  }

  getLocalStorage () {
    if(localStorage.getItem('language')) {
      this.language = localStorage.getItem('language');
    }
    else {
      this.language = 'ru';
    }
    this.changeLanguage();
    this.game.localization(this.language);
  }

  setLocalStorage () {
    if (this.language === 'ru')
      this.language = 'en';
    else
      this.language = 'ru';
    localStorage.setItem('language', this.language);
    this.changeLanguage();
    this.game.localization(this.language);
  }

  changeLanguage () {
    let dataSet = document.querySelectorAll('[data-language]');
    for (let i = 0; i < dataSet.length; i++) {
      dataSet[i].innerHTML = LOCALIZATION[dataSet[i].dataset['language']][this.language];
    }
  }

}