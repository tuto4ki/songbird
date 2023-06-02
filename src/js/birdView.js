import localization from "./localization";

export class BirdView {

  constructor (bird, nameClass, language = "ru") {
    this.bird = bird;
    this.createView(nameClass, language);
  }

  createView (nameClass, language = "ru") {
    this.view = document.createElement('div');
    this.view.classList.add(nameClass);
    this.view.innerHTML = `<div class="show"><div class="show-preview"> 
                        <div class="show-bird">
                          <img src="${this.bird.image}" alt="Bird" class="show-picture"></img>
                            <div>
                              <h3 class="h3">${this.bird.name}</h3>
                              <p class="species">${this.bird.species}</p>
                              <div class="show-player">
                                <div class="current-load hidden">
                                  <div class="player-info">
                                    <div class="player-controls">
                                      <button class="play player-icon"></button>
                                    </div>
                                    <div class="progress">
                                      <div class="duration-player">
                                        <div class="progress-active"></div>
                                      </div>
                                      <div class="duration-timer">
                                        <div class="progress-current"></div>
                                        <div class="progress-duration"></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="song">
                                    <div class="song-icon">
                                      <svg width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M832 352v1088q0 26-19 45t-45 19-45-19l-333-333h-262q-26 0-45-19t-19-45v-384q0-26 19-45t45-19h262l333-333q19-19 45-19t45 19 19 45zm384 544q0 76-42.5 141.5t-112.5 93.5q-10 5-25 5-26 0-45-18.5t-19-45.5q0-21 12-35.5t29-25 34-23 29-36 12-56.5-12-56.5-29-36-34-23-29-25-12-35.5q0-27 19-45.5t45-18.5q15 0 25 5 70 27 112.5 93t42.5 142zm256 0q0 153-85 282.5t-225 188.5q-13 5-25 5-27 0-46-19t-19-45q0-39 39-59 56-29 76-44 74-54 115.5-135.5t41.5-173.5-41.5-173.5-115.5-135.5q-20-15-76-44-39-20-39-59 0-26 19-45t45-19q13 0 26 5 140 59 225 188.5t85 282.5zm256 0q0 230-127 422.5t-338 283.5q-13 5-26 5-26 0-45-19t-19-45q0-36 39-59 7-4 22.5-10.5t22.5-10.5q46-25 82-51 123-91 192-227t69-289-69-289-192-227q-36-26-82-51-7-4-22.5-10.5t-22.5-10.5q-39-23-39-59 0-26 19-45t45-19q13 0 26 5 211 91 338 283.5t127 422.5z" fill="#fff"/></svg>
                                    </div>
                                    <input type="range" class="input-song" min="0" max="1" step=".01" value=".5">
                                  </div>
                                </div>
                                <div class="load">
                                  <button class="load-audio player-icon"></button>
                                  <span class="load-title hidden" data-language="load">${localization.load[language]}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="show-description">${this.bird.description}</div>
                        </div></div>`;
  }
  
  getView () {
    return this.view;
  }

  localization (bird) {
    this.bird = bird;
    this.view.querySelector('.h3').innerHTML = this.bird.name;
    this.view.querySelector('.show-description').innerHTML = this.bird.description;
  }

  loadAudio () {
    this.view.querySelector('.load').querySelector('.load-audio').classList.add('hidden');
    this.view.querySelector('.load').querySelector('.load-title').classList.remove('hidden');
  }

}