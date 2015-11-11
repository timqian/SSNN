import Neuron from '../src/Neuron';
const n1 = new Neuron();

n1.isSensor = true;
n1.inI = 5;

for (var i = 0; i < 1000; i++) {
  console.log(n1._isSpiking);
  console.log(n1._v);

  n1.update();
}
