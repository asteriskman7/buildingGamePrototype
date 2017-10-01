'use strict';

let app = {
  resources: {},
  init: function() {
    console.log('init');
    map.init('canvas_map', 16);
    map.draw();
  },
  buildItem(name) {
    let req = recipes.checkRequirements(name, this.resources);
    if (req.max > 0) {
      for (let r in req) {
        this.resources[r] -= req.req[r];
      }
      this.resources[name] += 1;
    }
  }
};

app.init();
