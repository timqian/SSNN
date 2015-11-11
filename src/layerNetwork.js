import Neuron from './Neuron';
const maxWeight = 10; // maximal synaptic strength

export default class layerNetwork {
  constructor(structure = [1,1], type = 'allToAll') {
    this.sensors = [];
    for (let i = 0; i < structure[0]; i++) {
      let neu = new Neuron();
      neu.isSensor = true;
      this.sensors.push(neu);
    }
    this.inners = [];
    for (var i = 0; i < structure[1]; i++) {
      let neu = new Neuron();
      neu.isSensor = false;
      this.inners.push(neu);
    }
    switch (type) {
      case 'allToAll':
        this.projectAll();
      default:
        this.projectAll();
    }
    console.log(this.sensors);
    console.log(this.inners);
  }

  update() {
    // 先更新后层 neuron
    this.inners.forEach(neu => {neu.update();});
    this.sensors.forEach(neu => {neu.update();});
  }

  setInIs(inIs = []) {
    this._neurons.forEach((neu,i) => {
      neu.inI = inIs[i];
    });
  }

  projectAll() {
    this.sensors.forEach((sensor) => {
      this.inners.forEach((inner) => {
        sensor.project(inner, Math.random() * maxWeight);
      });
    });
  }
}
