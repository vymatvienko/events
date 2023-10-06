export default class GameController {
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
    return Math.floor(
      Math.random() * (this.gamePlay.boardSize * this.gamePlay.boardSize),
    );
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
    const { target } = cell;

    if (target.classList.contains('goblin')) {
      this.catch += 1;
      target.classList.remove('goblin');
      this.points.textContent = (`Очки: ${this.catch}`);
    } else {
      this.miss += 1;
      this.misses.textContent = (`Промахи: ${this.miss}`);
    }

    if (this.miss === 5) {
      alert(`Игра окончена! Поймано гоблинов: ${this.catch}`);
      this.catch = 0;
      this.miss = 0;
      this.points.textContent = (`Очки: ${this.catch}`);
      this.misses.textContent = (`Промахи: ${this.miss}`);
    }
  }
}
