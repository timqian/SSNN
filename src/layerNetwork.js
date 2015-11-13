import Neuron from './Neuron';
const maxWeight = 10; // maximal synaptic strength

export default class layerNetwork {
  constructor(...layerNeuNums) {
    // this.layers = [];
    // for (let i = 0; i < layerNeus.length; i++) {
    //   this.layers.push([]);
    //   for (let j = 0; j < layerNeus[i]; j++) {
    //     let neu = new Neuron();
    //     i == 0 ? neu.isSensor = true : neu.isSensor = false;
    //     this.layers[i].push(neu);
    //   }
    // }

    this.layers = layerNeuNums.map((neuNum) => {
      let layer = [];
      for (var i = 0; i < neuNum; i++) {
        let neu = new Neuron();
        neu.isSensor = i ? false : true; // i == 0 时 neu 为 sensor
        layer.push(neu);
      }
      return layer;
    });
    console.log(this.layers);

    switch (type) {
      case 'allToAll':
        this.projectAll();
      default:
        this.projectAll();
    }

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
