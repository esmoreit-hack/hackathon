import map from './../../../dist/map.json';

class Map {

  constructor(unit, scale){
    this.unit = unit || 10000;
    this.grid = [];
    this.map = map;
    this.setGridView(0);
  }

  setGridView(galaxy, constellation){
    galaxy = galaxy || 0;
    constellation = constellation || 0;

    let item = 0;
    this.map.universes.forEach((univers, index) =>{
      if(index !== galaxy) return false;
      univers.galaxies.forEach((_galaxy, _index) =>{
        if(index !== constellation) return false;
        _galaxy[1].galaxy.forEach((_slot, __index) =>{
          _slot[0] = _slot[0] > 0 ? ( _slot[0] + (item * this.unit)) : ( _slot[0] - (item * this.unit));
          _slot[1] = _slot[1] > 0 ? ( _slot[1] + (item * this.unit)) : ( _slot[1] - (item * this.unit));
          _slot[2] = _slot[2] > 0 ? ( _slot[2] + (item * this.unit)) : ( _slot[2] - (item * this.unit));
          this.grid.push([_slot[0], _slot[1], _slot[2]]);
          item++;
        });
      });
    });
  }

  createGridUnit(x, y, z){
    this.grid.push([x,y,z]);
  }

  getGrid(){
    return this.grid;
  }

};

export {
  Map
};
