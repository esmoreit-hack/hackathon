import map from './../../../dist/map.json';

class Map {

  constructor(unit, scale){
    this.unit = unit || 10000;
    this.grid = [];
    this.map = map;
    // this.setGridView(0);
    this.createGrid();
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
          _slot[0] = _slot[0] > 0 ? _slot[0] + ( _slot[0] * this.unit + item ) : _slot[0] - ( _slot[0] * this.unit + item );
          _slot[1] = _slot[1] > 0 ? _slot[1] + ( _slot[1] * this.unit + item ) : _slot[1] - ( _slot[1] * this.unit + item );
          _slot[2] = _slot[2] > 0 ? _slot[2] + ( _slot[2] * this.unit + item ) : _slot[2] - ( _slot[2] * this.unit + item );
          this.grid.push([_slot[0], _slot[1], _slot[2]]);
          item++;
        });
      });
    });
  }

  createGrid(){
    var xCount = 3,
        yCount = 3,
        zCount = 3,
        size = this.unit,
        spacing = this.unit;

      for (let x=0; x<3; x+=1) {
        for (let y=0; y<3; y+=1) {
          for (let z=0; z<3; z+=1) {
            this.grid.push([(x-xCount/2) * spacing, (y-yCount/2) * spacing, (z-zCount/2) * spacing]);
          }
        }
      }
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
