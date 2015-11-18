// TODO: 我需要获得 network 其他信息, 从这个 network 得到 weights 等信息
// 利用 sigma.js 看 weight 变化?
import layerNetwork from '../src/layerNetwork';

let network = new layerNetwork([5, 4, 3]);
network.setInIs([10, 10, 10, 10, 10]);
let { spikeTrains } = network.think(400);
console.log( spikeTrains );
