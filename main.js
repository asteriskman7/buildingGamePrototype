'use strict';

let app = {
  init: function() {
    console.log('init');
    map.init('canvas_map', 16);
    map.draw();
  }
};

app.init();
