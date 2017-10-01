'use strict';

let map = {
  canvasID: undefined,
  canvasE: undefined,
  ctx: undefined,
  pixelW: undefined,
  pixelH: undefined,
  gridW: undefined,
  gridH: undefined,
  gridSize: undefined,
  gridContent: {},
  init: function(canvasID, gridSize) {
    this.canvasID = canvasID;
    this.canvasE = document.getElementById(canvasID);
    this.ctx = this.canvasE.getContext('2d');
    this.pixelW = this.canvasE.width;
    this.pixelH = this.canvasE.height;
    this.gridSize = gridSize;
    this.gridW = Math.floor(this.pixelW / this.gridSize);
    this.gridH = Math.floor(this.pixelH / this.gridSize);

    this.gridContent['5,5'] = {type:'building'};
    for (let i = 0; i < 20; i++) {
      let x = Math.floor(Math.random() * this.gridW);
      let y = Math.floor(Math.random() * this.gridH);
      if (this.gridContent[`${x},${y}`] === undefined) {
        if (Math.random() > 0.5) {
          this.gridContent[`${x},${y}`] = {type: 'building'};
        } else {
          this.gridContent[`${x},${y}`] = {type: 'belt', dir: [...'<>^v'][Math.floor(Math.random() * 4)]};
        }
      }
    }
  },
  draw: function() {
    let c = this.ctx;

    c.save();

    c.clearRect(0, 0, this.pixelW, this.pixelH);

    //draw grid lines
    c.strokeStyle = '#000000';
    c.beginPath();
    for (let i = 1; i < this.gridW; i++) {
      c.moveTo(i * this.gridSize + 0.5, 0);
      c.lineTo(i * this.gridSize + 0.5, this.pixelH);
    }
    for (let i = 1; i < this.gridH; i++) {
      c.moveTo(0, i * this.gridSize + 0.5);
      c.lineTo(this.pixelW, i * this.gridSize + 0.5);
    }
    c.stroke();

    for (let coord in this.gridContent) {
      let [x,y] = coord.split(',').map(v=>v|0);
      let content = this.gridContent[coord];
      switch (content.type) {
        case 'belt':
          c.textAlign = 'center';
          c.textBaseline = 'middle';
          c.font = '12px monospace';
          c.fillStyle = '#000000';
          c.fillText(content.dir, (x + 0.5) * this.gridSize, (y + 0.5) * this.gridSize);
          break;
        case 'building':
          c.textAlign = 'center';
          c.textBaseline = 'middle';
          c.font = '12px monospace';
          c.fillStyle = '#000000';
          c.fillText('B', (x + 0.5) * this.gridSize, (y + 0.5) * this.gridSize);
          break;
        default:
          throw 'illegal grid content type';
      }

    }

    c.restore();
  }
};
