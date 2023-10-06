export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.catch = 0;
    this.miss = 0;

    this.onCellClick = this.onCellClick.bind(this);
    this.button = document.querySelector('[data-id=board]');
    this.button.addEventListener('click', this.onCellClick);
  }

  getCell() {
    return Math.floor(
      Math.random() * (this.gamePlay.boardSize * this.gamePlay.boardSize),
    );
  }

  init() {
    this.gamePlay.drawUi();

    const newsInterval = setInterval(() => {
      let newCell = this.getCell();
      while (newCell === this.gamePlay.activeCell) {
        newCell = this.getCell();
      }
      this.gamePlay.redrawPositions(newCell);
      this.gamePlay.activeCell = newCell;

      if (this.miss === 5) {
        alert('Game over!');
        clearInterval(newsInterval);
      }
    }, 1000);
  }

  onCellClick(cell) {
    const { target } = cell;
    const points = document.querySelector('.points');
    const misses = document.querySelector('.misses');

    if (target.classList.contains('goblin')) {
      this.catch += 1;
      target.classList.remove('goblin');
      points.textContent = (`Очки: ${this.catch}`);
    } else {
      this.miss += 1;
      misses.textContent = (`Промахи: ${this.miss}`);
    }
  }
}
