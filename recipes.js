'use strict';

var recipes = {
  list: {},
  checkRequirements(name, sources) {
    let req = this.list[name];
    let max;
    let sourceResources = {};
    sources.forEach(v=>{
      for (let r in v) {
        if (r === 'time') {continue;}
        if (sourceResources[r] === undefined) {
          sourceResources[r] = v[r];
        } else {
          sourceResources[r] += v[r];
        }
      }
    });
    for (let r in req) {
      if (r === 'time') {continue;}
      if (sourceResources[r] === undefined || sourceResources[r] < req[r]) {
        return 0;
      }
      if (max === undefined) {
        max = Math.floor(sourceResources[r] / req[r]);
      } else {
        max = Math.min(max, Math.floor(sourceResources[r] / req[r]));
      }
    }
    return max;
  },
  build(name, sources, count) {
    let req = this.list[name];
    if (this.checkRequirements(name, sources) >= count) {
      for (let resource in req) {
        if (resource === 'time') {continue;}
        let needed = (req[resource] * count);
        sources.some(source => {
          if (source[resource] !== undefined) {
            if (source[resource] <= needed) {
              needed -= source[resource];
              source[resource] = 0;
            } else {
              source[resource] -= needed;
              needed = 0;
            }
          }
          return needed === 0;
        });
      }
      return req.time;
    } else {
      return false;
    }
  }
};

recipes.list.bullet = {time: 1000, brass: 1, gunpowder: 1};
recipes.list.gun = {time: 2000, steel: 1};
