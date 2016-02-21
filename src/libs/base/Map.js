import map from './../../../dist/map.json';

class Map {

  constructor(unit, scale){
    this.unit = unit || 10000;
    this.grid = [];
    this.map = map;
    // this.setGridView(0);
    this.createGrid();
  }

  createGrid(){
    var xCount = 3,
        yCount = 3,
        zCount = 3,
        size = this.unit,
        spacing = this.unit*2;

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
