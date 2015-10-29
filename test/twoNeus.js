import Neuron from '../src/Neuron';

const n1 = new Neuron();
const n2 = new Neuron();
const n3 = new Neuron();

n1.isSensor = true;
n3.isSensor = true;
n1.inI = 10;
n3.inI = 15;
n1.project(n2, 19);
n3.project(n2, 30);

for (let i = 0; i < 1000; i++) {
  // console.log(n1._v);
  console.log(n2._v);
  n1.update();
  n2.update();
  n3.update();
}
