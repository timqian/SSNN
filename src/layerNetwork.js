import Neuron from './Neuron';
const maxWeight = 10; // maximal synaptic strength


/**
 * random weight, all to all connection network
 */
export default class layerNetwork {
  constructor(...layerNeuNums) {
    // init layers of network according to layerNeuNums
    // [3, 3, 3] => [[neu, neu, neu],[neu, neu, neu],[neu, neu, neu]]
    let layers = layerNeuNums.map((neuNum, index) => {
      let layer = [];
      for (let i = 0; i < neuNum; i++) {
        let neu = new Neuron();
        neu.isSensor = index ? false : true; // i == 0 时 neu 为 sensor
        layer.push(neu);
      }
      return layer;
    });

    // projecting neurons
    layers.reduce((preLayer, curLayer) => {
      preLayer.forEach((preNeu) => {
        curLayer.forEach((curNeu) => {
          preNeu.project(curNeu, Math.random() * maxWeight);
        });
      });
      return curLayer;
    });

    // console.log(layers[3]);

    this._layers = layers;
    this._spikeTrain = []; // [1, 3, 10, ...] recode spiking times
  }

  // set input currents for input neurons
  setInIs(inIs = []) {
    assert.equal(inIs.length, this._layers[0].length, 'network input length mismatch')
    this._layers[0].forEach((neu, i) => {
      neu.inI = inIs[i];
    });
  }

  // TODO: deside spikeTrain data structure and decide whether return it or other ways
  // update network for `time` ms, then return the spikeTrain
  think(time) {

    for (let i = 0; i < time; i++) {

      // 从后层开始更新 network, 防止前面更新的影响后面的
      for (let i = this._layers.length - 1; i >= 0; i--) {
        this._layers[i].forEach((neu) => {
          neu.update();
        });
      }
    }

    return
  }
}
