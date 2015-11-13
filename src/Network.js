export default class Network {
  constructor(neurons = []) {
    this._neurons = neurons;
  }

  update() {
    this._neurons.forEach(neu => {neu.update();});
  }

  setInIs(inIs = []) {
    this._neurons.forEach((neu,i) => {
      neu.inI = inIs[i];
    });
  }
}
