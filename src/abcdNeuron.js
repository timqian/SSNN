class Neuron {
  // default params of Excitatory neurons
  constructor(a = 0.02, b = 0.2, c = -65, d = 2, v = -65, u = b * v) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.v = v;
    this.u = u;
    console.log(u);
  }

  update() {
    // step 0.5 ms for numerical stability
    this.v = this.v + 0.5 * (0.04 * this.v ^ 2 + 5 * this.v + 140 - this.u + I);
    this.v = this.v + 0.5 * (0.04 * this.v ^ 2 + 5 * this.v + 140 - this.u + I);
    this.u = this.u + this.a * (this.b * this.v - this.u);

    if (this.v >= 30) {
      this.v = this.c;
      this.u = this.u + this.d;

    }

  }
}

const neu = new Neuron();
