const a = 0.02;
const b = 0.2;
const c = -65;
const d = 2;

export default class Neuron {
  // default params of Excitatory neurons
  constructor(v = -65, u = b * v) {
    this.inI = 0;
    this._v = v;
    this._u = u;
    this._isSpiking = false;
    this.isSensor = false;
    this._input = new Map(/*[neuron, weight]*/);
  }

  project(neuron, weight = 1) {
    neuron._input.set(this, weight);
  }

  // update 1 ms
  update() {
    // calculate inI for neurons not sensor
    if (!this.isSensor) {
      this.inI = 0;
      this._input.forEach((value, key, map) => {
        if (key._isSpiking ) {
          this.inI += value;
        }
      })
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
    } else {
      this._isSpiking = false;
    }
  }

}
