import map from './../../../dist/map.json';

class Map {

  constructor(unit, scale){
    this.unit = unit || 10000;
    this.grid = [];
    this.map = map;
    this.createGrid();
  }

  // This could be an optimize version, but doesn't worg :-\
  // createCube( spacing, dimension ){
  //   dimension = dimension || 3;
  //   spacing = spacing || this.unit*2;
  //
  //   let blocks = Math.pow(dimension, dimension),
  //       counters = [0,0,0];
  //   console.log(blocks/dimension);
  //   for (let i = 0; i < blocks; i++){
  //     let pos = [];
  //
  //     if(counters[i%dimension] < dimension) counters[i%dimension] = counters[i%dimension]+1;
  //     for(let k = 0; k < dimension; k++){
  //       pos.push((counters[k]-dimension/2) * spacing);
  //     }
  //     console.log('Create cube', pos);
  //     this.grid.push({
  //       pos: pos,
  //       type: i %3 === 0 ? 'planet': 'empty'
  //     });
  //     console.log(counters, i%dimension);
  //   }
  // }

  createGrid(galaxy,planets){
    var xCount = 3,
        yCount = 3,
        zCount = 3,
        size = this.unit,
        spacing = this.unit*2;

    for (let x=0; x<3; x+=1) {
      for (let y=0; y<3; y+=1) {
        for (let z=0; z<3; z+=1) {
          let _x = ((x-xCount/2) * spacing),
              _y = ((y-zCount/2) * spacing),
              _z = ((z-zCount/2) * spacing);
          this.grid.push({ pos: [_x,_y,_z], type: this.getModel(x,y,z,galaxy,planets)});
        }
      }
    }
  }
  //
  // createGridUnit(x, y, z){
  //   this.grid.push([x,y,z]);
  // }

  getModel(x,y,z,galaxy,planets){
    return Math.floor(Math.random()*100) %2 === 1 ? 'planet': 'empty'
  }

  getGrid(){
    console.log(this.grid);
    return this.grid;
  }

};

export {
  Map
};
