const a = 0.02;
const b = 0.2;
const c = -65;
const d = 2;
const maxWeight = 10; // maximal synaptic strength
const initialSTDP = 0.1;
const decayingRate = 0.95;

export default class Neuron {
  // default params of Excitatory neurons
  constructor(v = -65, u = b * v) {
    this.inI = 0;
    this._v = v;
    this._u = u;
    this._isSpiking = false;
    this._STDP = 0;
    this.isSensor = false;
    this._inputs = new Map(/*[neuron, weight]*/);
  }

  project(neuron, weight = 1) {
    neuron._inputs.set(this, weight);
  }

  // update 1 ms
  update() {
    // for neuron which is not sensor
    if (!this.isSensor) {
      this.inI = 0;
      this._inputs.forEach((weight, neuron, inputs) => {
        if (neuron._isSpiking ) {
          // increase inI from spiking inputss
          this.inI += weight;
          // decrease weights using own STDP
          weight = Math.max(0, weight - this._STDP);
          inputs.set(neuron, weight);
        }
      });
    }

    // based on Izhikevich's neuron model
    this._v = this._v +
      0.5 * (0.04 * this._v * this._v + 5 * this._v + 140 - this._u + this.inI);
    this._v = this._v +
      0.5 * (0.04 * this._v * this._v + 5 * this._v + 140 - this._u + this.inI);
    this._u = this._u + a * (b * this._v - this._u);

    // spike if v >= 30
    if (this._v >= 30) {
      this._v = c;
      this._u = this._u + d;
      this._isSpiking = true;
      this._STDP = initialSTDP;
      // increase weight according to inputs's STDP
      this._inputs.forEach((weight, neuron, inputs) => {
        weight = Math.min(weight + neuron._STDP, maxWeight);
        inputs.set(neuron, weight);
      });
    } else {
      this._isSpiking = false;
      this._STDP *= decayingRate;
    }
  }

}
