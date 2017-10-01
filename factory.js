'use strict';

class Factory {
  constructor (recipe, sources) {
    this.recipe = recipe;
    this.sources = sources;
    this.time = 0;
    this.state = 'waiting';
    this.resources = {};
    this.resources[this.recipe] = 0;
  }
  update(delta) {
    switch (this.state) {
      case 'waiting':
        if (recipes.checkRequirements(this.recipe, this.sources)) {
          this.state = 'building';
          this.time = recipes.build(this.recipe, this.sources, 1);
        }
        break;
      case 'building':
        this.time -= delta;
        if (this.time <= 0) {
          this.resources[this.recipe] += 1;
          this.state = 'waiting';
        }
        break;
      default:
        throw 'illegal building state' + this.state;
    }
  }
}
