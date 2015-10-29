import Neuron from '../src/Neuron';

const n1 = new Neuron();
const n2 = new Neuron(-50);
const n3 = new Neuron(-40);

n1.project(n3);
n2.project(n3);

console.log(n3);
console.log(n3._input);
