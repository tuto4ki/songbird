import './style.css';
import { GalleryView } from './js/galleryView';
import { Game } from './js/game';
import { GameView } from './js/gameView';
import { Language } from './js/language';

const mainPage = document.querySelector('.main-bird');
const gamePage = document.querySelector('.game');
const gameEndPage = document.querySelector('.game-end');
const headerNav = document.querySelectorAll('.header-item .link');
let galleryPage = null;
let gallery = null;

function setActiveClass (event) {
  headerNav.forEach(item => item.classList.remove('link-active'));
  event.target.classList.add('link-active');
}

headerNav[1].addEventListener('click', (event) => {
  
  if (gallery) {
    gallery.closeGallery();
    gallery = null;
    galleryPage.remove();
  }
  setActiveClass(event);
  mainPage.classList.add('hidden');
  gamePage.classList.remove('hidden');
  gameEndPage.classList.add('hidden');
});

headerNav[2].addEventListener('click', (event) => {
  if (gallery)
    return;
  setActiveClass(event);
  game.gameEnd();
  mainPage.classList.add('hidden');
  gamePage.classList.add('hidden');
  gameEndPage.classList.add('hidden');
  gallery = new GalleryView(language.language);
  galleryPage = gallery.getGallery(language.language);
  document.querySelector('.main').append(galleryPage);
  gallery.addAudioGallery();
});

headerNav[3].addEventListener('click', () => {
  language.setLocalStorage();
  if (gallery) {
    gallery.localization(language.language);
  }
});

const gameView = new GameView();
const game = new Game(gameView);
const language = new Language(game);

console.log ('Задание выполнено 270/270. Галерея реализована так, что загружаются аудио по клику на кнопку, чтобы не загружать все звуки сразу.');