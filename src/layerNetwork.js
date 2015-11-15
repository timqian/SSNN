
// TODO: 问题: 多重数组的的转化是否有更好的办法(相比这种方式: 在 map 的 callback 函数中使用 for)
// [ [ [ 1, 2, ... ], [ 4, 19, ... ] ], [ [ 2, 3, ...], [1, 14, ... ] ] ] 用来记录 spike train,
// 这种数据结构是否有更好的替代, 为了代码可读性, 候选人 可以是 obj

/**
 * random weight, all to all connection network
 */

import Neuron from './Neuron';
import assert from 'assert';
const maxWeight = 10; // maximal synaptic strength

export default class layerNetwork {
  constructor(layerNeuNums = []) {

    // init layers of network according to layerNeuNums
    // [3, 3, 3] => [[neu, neu, neu],[neu, neu, neu],[neu, neu, neu]]
    this._layers = layerNeuNums.map((neuNum, index) => {
      let layer = [];
      for (let i = 0; i < neuNum; i++) {
        let neu = new Neuron();
        neu.isSensor = index ? false : true; // i == 0 时 neu 为 sensor
        layer.push(neu);
      }
      return layer;
    });

    // projecting neurons
    this._layers.reduce((preLayer, curLayer) => {
      preLayer.forEach((preNeu) => {
        curLayer.forEach((curNeu) => {
          preNeu.project(curNeu, Math.random() * maxWeight);
        });
      });
      return curLayer;
    });

    // console.log(this._layers[3]);

    // layerNeuNums   =>   layers                    =>   _spikeTrains
    // [2, 2]         =>   [[neu, neu],[neu, neu]]   =>   [ [ [ 1, 2, ... ], [ 4, 19, ... ] ], [ [ 2, 3, ...], [1, 14, ... ] ] ]
    // `[1, 2, 6, ...]`: recode spiking times of one neuron
    this._spikeTrains = layerNeuNums.map((neuNum) => {
      let layerSpikeTrain = [];
      for (let i = 0; i < neuNum; i++) {
        let neuSpikeTrain = [];
        layerSpikeTrain.push(neuSpikeTrain);
      }
      return layerSpikeTrain;
    });

    // console.log(this._spikeTrains);
  }

  // set input currents for input neurons
  setInIs(inIs = []) {
    assert.equal(inIs.length, this._layers[0].length, 'network input length mismatch')
    this._layers[0].forEach((neu, i) => {
      neu.inI = inIs[i];
    });
  }

  // TODO: decide whether return it or other ways
  // update network for `time` ms, then return the spikeTrains
  think(time) {
    for (let t = 0; t < time; t++) {

      // 从后层开始更新 network, 防止前面更新的影响后面的
      for (let i = this._layers.length - 1; i >= 0; i--) {
        this._layers[i].forEach((neu, neuIndex) => {
          neu.update();
          if (neu._isSpiking) {
            this._spikeTrains[i][neuIndex].push(t);
          }
        });
      }
    }

    return {
      spikeTrains: this._spikeTrains,

    };
  }
}
