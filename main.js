/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/GamePlay.js
class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.container = null;
    this.boardEl = null;
    this.activeCell = null;
  }
  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }
  drawUi() {
    this.checkBinding();
    this.boardEl = this.container.querySelector('[data-id=board]');
    for (let i = 0; i < this.boardSize * this.boardSize; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell');
      this.boardEl.appendChild(cellEl);
    }
  }
  redrawPositions(newCell) {
    if (this.activeCell !== null) {
      this.boardEl.children[this.activeCell].innerHTML = '';
    }
    const cellEl = this.boardEl.children[newCell];
    const charEl = document.createElement('div');
    charEl.classList.add('goblin');
    cellEl.appendChild(charEl);
  }
  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }
}
;// CONCATENATED MODULE: ./src/js/GameController.js
class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.catch = 0;
    this.miss = 0;
    this.onCellClick = this.onCellClick.bind(this);
    this.button = document.querySelector('[data-id=board]');
    this.button.addEventListener('click', this.onCellClick);
    this.points = document.querySelector('.points');
    this.misses = document.querySelector('.misses');
  }
  getCell() {
    return Math.floor(Math.random() * (this.gamePlay.boardSize * this.gamePlay.boardSize));
  }
  init() {
    this.gamePlay.drawUi();
    setInterval(() => {
      let newCell = this.getCell();
      while (newCell === this.gamePlay.activeCell) {
        newCell = this.getCell();
      }
      this.gamePlay.redrawPositions(newCell);
      this.gamePlay.activeCell = newCell;
    }, 1000);
  }
  onCellClick(cell) {
    const {
      target
    } = cell;
    if (target.classList.contains('goblin')) {
      this.catch += 1;
      target.classList.remove('goblin');
      this.points.textContent = `Очки: ${this.catch}`;
    } else {
      this.miss += 1;
      this.misses.textContent = `Промахи: ${this.miss}`;
    }
    if (this.miss === 5) {
      alert(`Игра окончена! Поймано гоблинов: ${this.catch}`);
      this.catch = 0;
      this.miss = 0;
      this.points.textContent = `Очки: ${this.catch}`;
      this.misses.textContent = `Промахи: ${this.miss}`;
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js


const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector('#game-container'));
const gameCtrl = new GameController(gamePlay);
gameCtrl.init();
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;